# ingestion_celery.py
"""
Clean + production-minded Celery ingestion worker.

What this file gives you:
- Celery task with proper retries (bind=True + self.retry)
- Heavy clients (Ollama/Qdrant/MinIO) reused via lazy singletons (per worker process)
- MinIO download streamed to disk (no huge bytes-in-memory)
- Single MinIO download per ingestion (text + tables reuse same temp file)
- Consistent return shape ({ok: bool, ...})
- Optional Redis Stream ACK support (msg_id + stream + group)

Deployment notes:
- Configure everything via env vars.
- For production, consider:
  - separate Redis DB for Celery broker vs Streams
  - Celery autoscale / concurrency
  - Qdrant auth/API key if using cloud
"""

# ingestion_celery.py
from __future__ import annotations

import logging
import os
import tempfile
import uuid
from dataclasses import dataclass
from datetime import datetime
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import pdfplumber
from celery import Celery
from langchain_community.document_loaders import PyPDFium2Loader, TextLoader
from langchain_core.documents import Document
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from minio import Minio
from minio.error import S3Error
from qdrant_client import QdrantClient
from qdrant_client.http import models
from redis import Redis

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from database_operations import update_job_stage, mark_job_succeeded, mark_job_failed, append_job_log
from db.enums import IngestionJobStage


# -----------------------------------------------------------------------------
# Logging
# -----------------------------------------------------------------------------

logger = logging.getLogger("ingestion")
if not logger.handlers:
    logging.basicConfig(
        level=os.getenv("LOG_LEVEL", "INFO"),
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )

# -----------------------------------------------------------------------------
# Config
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class Settings:
    # Celery / Redis
    celery_broker_url: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    celery_result_backend: Optional[str] = os.getenv("CELERY_RESULT_BACKEND", "") or None

    # Redis (Streams ack)
    redis_host: str = os.getenv("REDIS_HOST", "localhost")
    redis_port: int = int(os.getenv("REDIS_PORT", "6379"))
    redis_db: int = int(os.getenv("REDIS_DB", "0"))
    redis_password: Optional[str] = os.getenv("REDIS_PASSWORD") or None

    # Qdrant
    qdrant_host: str = os.getenv("QDRANT_HOST", "localhost")
    qdrant_port: int = int(os.getenv("QDRANT_PORT", "6333"))
    qdrant_api_key: Optional[str] = os.getenv("QDRANT_API_KEY") or None
    qdrant_prefer_grpc: bool = os.getenv("QDRANT_PREFER_GRPC", "true").lower() == "true"

    # Embeddings (Ollama)
    embedding_model_name: str = os.getenv("EMBEDDING_MODEL_NAME", "embeddinggemma:latest")

    # MinIO
    minio_endpoint: str = os.getenv("MINIO_ENDPOINT", "localhost:9000")
    minio_access_key: str = os.getenv("MINIO_ACCESS_KEY", "yourbot_minio_admin")
    minio_secret_key: str = os.getenv("MINIO_SECRET_KEY", "yourbot_minio_password")
    minio_bucket_name: str = os.getenv("MINIO_BUCKET_NAME", "yourbot-documents")
    minio_secure: bool = os.getenv("MINIO_SECURE", "false").lower() == "true"

    # Chunking
    chunk_size: int = int(os.getenv("CHUNK_SIZE", "1000"))
    chunk_overlap: int = int(os.getenv("CHUNK_OVERLAP", "200"))

    # Qdrant upsert batching
    qdrant_batch_size: int = int(os.getenv("QDRANT_BATCH_SIZE", "100"))

    # Collection behavior
    recreate_incompatible_collection: bool = (
        os.getenv("RECREATE_INCOMPATIBLE_COLLECTION", "false").lower() == "true"
    )

    # Safety limits (optional)
    max_file_mb: int = int(os.getenv("MAX_FILE_MB", "200"))  # protect workers
    max_pdf_pages_for_tables: int = int(os.getenv("MAX_PDF_PAGES_FOR_TABLES", "300"))

SETTINGS = Settings()

# -----------------------------------------------------------------------------
# Celery app
# -----------------------------------------------------------------------------

celery_app = Celery(
    "ingestion-worker",
    broker=SETTINGS.celery_broker_url,
    backend=SETTINGS.celery_result_backend,
)

celery_app.conf.update(
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    worker_prefetch_multiplier=1,
    broker_transport_options={"visibility_timeout": 60 * 60},
)

# -----------------------------------------------------------------------------
# Singletons (per worker process)
# -----------------------------------------------------------------------------

@lru_cache(maxsize=1)
def redis_client() -> Redis:
    return Redis(
        host=SETTINGS.redis_host,
        port=SETTINGS.redis_port,
        db=SETTINGS.redis_db,
        password=SETTINGS.redis_password,
        decode_responses=True,
        socket_connect_timeout=5,
        socket_timeout=5,
        retry_on_timeout=True,
        health_check_interval=30,
    )

@lru_cache(maxsize=1)
def qdrant_client() -> QdrantClient:
    kwargs: Dict[str, Any] = {
        "host": SETTINGS.qdrant_host,
        "port": SETTINGS.qdrant_port,
        "prefer_grpc": SETTINGS.qdrant_prefer_grpc,
    }
    if SETTINGS.qdrant_api_key:
        kwargs["api_key"] = SETTINGS.qdrant_api_key
    return QdrantClient(**kwargs)

@lru_cache(maxsize=1)
def embeddings_client() -> OllamaEmbeddings:
    return OllamaEmbeddings(model=SETTINGS.embedding_model_name)

@lru_cache(maxsize=1)
def minio_client() -> Minio:
    return Minio(
        SETTINGS.minio_endpoint,
        access_key=SETTINGS.minio_access_key,
        secret_key=SETTINGS.minio_secret_key,
        secure=SETTINGS.minio_secure,
    )

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------

def _retry(op, *, tries: int = 3, base_sleep: float = 0.5):
    last = None
    for i in range(tries):
        try:
            return op()
        except Exception as e:
            last = e
            sleep_s = min(5.0, base_sleep * (2 ** i))
            logger.warning("Retryable error: %s (attempt %d/%d) sleeping %.2fs", e, i + 1, tries, sleep_s)
            import time
            time.sleep(sleep_s)
    raise last  # type: ignore[misc]

# -----------------------------------------------------------------------------
# Core worker
# -----------------------------------------------------------------------------

class IngestionWorker:
    def __init__(self) -> None:
        self.embeddings = embeddings_client()
        self.qdrant = qdrant_client()
        self.minio = minio_client()
        self.default_bucket = SETTINGS.minio_bucket_name

    @staticmethod
    def _validate_non_empty(name: str, value: Any) -> None:
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"{name} must be a non-empty string, got: {value!r}")

    def _normalize_metadata(self, docs: List[Document], *, document_id: str) -> None:
        for doc in docs:
            doc.metadata = doc.metadata or {}
            source = doc.metadata.get("source", "")
            file_name = doc.metadata.get("file_name") or (os.path.basename(source) if source else "unknown")
            file_type = doc.metadata.get("file_type") or (Path(file_name).suffix.lower()[1:] if Path(file_name).suffix else "unknown")

            # uniform structure
            for k in ("producer","creator","creationdate","title","author","subject","keywords","moddate"):
                doc.metadata.setdefault(k, "")
            doc.metadata.setdefault("source", source or "")
            doc.metadata.setdefault("file_name", file_name)
            doc.metadata.setdefault("file_type", file_type)
            doc.metadata.setdefault("is_table", False)

            if file_type == "pdf":
                doc.metadata.setdefault("total_pages", 0)
                doc.metadata.setdefault("page", 0)
            else:
                doc.metadata.setdefault("total_pages", None)
                doc.metadata.setdefault("page", None)

            doc.metadata["document_id"] = document_id

            if file_type == "txt":
                fp = doc.metadata.get("source")
                if fp and os.path.exists(fp) and os.path.isfile(fp):
                    try:
                        st = os.stat(fp)
                        doc.metadata.setdefault("creationdate", datetime.fromtimestamp(st.st_ctime).isoformat() + "+00:00")
                        doc.metadata.setdefault("moddate", datetime.fromtimestamp(st.st_mtime).isoformat() + "+00:00")
                    except OSError:
                        pass

    @staticmethod
    def _make_tempfile_path(*, suffix: str) -> str:
        fd, path = tempfile.mkstemp(suffix=suffix)
        os.close(fd)
        return path

    def _download_minio_to_tempfile(self, *, bucket: str, object_key: str) -> Tuple[str, str]:
        self._validate_non_empty("bucket", bucket)
        self._validate_non_empty("object_key", object_key)

        suffix = Path(object_key).suffix.lower()
        if suffix not in (".pdf", ".txt"):
            raise ValueError(f"Unsupported file type: {suffix}. Only .pdf, .txt supported.")

        tmp_path = self._make_tempfile_path(suffix=suffix)

        resp = None
        try:
            resp = self.minio.get_object(bucket, object_key)

            max_bytes = SETTINGS.max_file_mb * 1024 * 1024
            written = 0

            with open(tmp_path, "wb") as f:
                for chunk in resp.stream(32 * 1024):
                    written += len(chunk)
                    if written > max_bytes:
                        raise ValueError(f"File too large (> {SETTINGS.max_file_mb} MB): {object_key}")
                    f.write(chunk)

            return tmp_path, suffix

        except S3Error as e:
            if getattr(e, "code", "") == "NoSuchKey":
                raise FileNotFoundError(f"Object not found: bucket={bucket}, key={object_key}") from e
            raise

        except Exception:
            try:
                if os.path.exists(tmp_path):
                    os.unlink(tmp_path)
            except OSError:
                pass
            raise

        finally:
            if resp is not None:
                try:
                    resp.close()
                    resp.release_conn()
                except Exception:
                    pass

    def _load_text_from_local_file(self, *, local_path: str, object_key: str, bucket_name: str) -> List[Document]:
        ext = Path(local_path).suffix.lower()

        if ext == ".pdf":
            docs = PyPDFium2Loader(local_path).load()
        elif ext == ".txt":
            try:
                docs = TextLoader(local_path, encoding="utf-8").load()
            except UnicodeDecodeError:
                docs = TextLoader(local_path, encoding="latin-1").load()
        else:
            raise ValueError(f"Unsupported file type: {ext}")

        for d in docs:
            d.metadata = d.metadata or {}
            d.metadata["source"] = object_key
            d.metadata["file_name"] = Path(object_key).name
            d.metadata["minio_bucket"] = bucket_name
            d.metadata["minio_object_key"] = object_key
        return docs

    @staticmethod
    def _chunk_table_rows(headers: List[str], rows: List[List[Any]], base_metadata: Dict[str, Any],
                         window_size: int = 10, overlap: int = 2) -> List[Document]:
        docs: List[Document] = []
        n = len(rows)
        if n == 0:
            return docs

        start = 0
        while start < n:
            end = min(start + window_size, n)
            window_rows = rows[start:end]

            header_line = " | ".join(headers)
            separator_line = " | ".join("---" for _ in headers)
            md_lines = [header_line, separator_line]

            for r in window_rows:
                row_cells = ["" if c is None else str(c).strip() for c in r[: len(headers)]]
                if len(row_cells) < len(headers):
                    row_cells += [""] * (len(headers) - len(row_cells))
                md_lines.append(" | ".join(row_cells))

            content = "\n".join(md_lines)
            meta = {**base_metadata, "row_start": start, "row_end": end - 1, "is_table": True}
            docs.append(Document(page_content=content, metadata=meta))

            if end == n:
                break
            start = max(end - overlap, 0)

        return docs

    def _extract_tables_from_local_pdf(self, *, pdf_path: str, object_key: str, bucket_name: str) -> List[Document]:
        if Path(pdf_path).suffix.lower() != ".pdf":
            return []

        out: List[Document] = []
        file_name = Path(object_key).name

        with pdfplumber.open(pdf_path) as pdf:
            pages = pdf.pages[: SETTINGS.max_pdf_pages_for_tables]
            for page_index, page in enumerate(pages):
                try:
                    tables = page.extract_tables() or []
                except Exception:
                    continue

                for table_index, table in enumerate(tables):
                    if not table or len(table) < 2:
                        continue

                    headers = ["" if h is None else str(h).strip() for h in table[0]]
                    rows = table[1:]

                    out.extend(
                        self._chunk_table_rows(
                            headers=headers,
                            rows=rows,
                            base_metadata={
                                "file_name": file_name,
                                "file_type": "pdf",
                                "source": object_key,
                                "page": page_index,
                                "table_index": table_index,
                                "extraction_mode": "table_parser",
                                "minio_bucket": bucket_name,
                                "minio_object_key": object_key,
                            },
                        )
                    )
        return out

    def chunk_documents(self, docs: List[Document]) -> List[Document]:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=SETTINGS.chunk_size,
            chunk_overlap=SETTINGS.chunk_overlap,
            separators=["\n\n", "\n", ". ", " "],
        )
        return splitter.split_documents(docs)

    def embed_chunks(self, chunks: List[Document]) -> Tuple[List[Document], List[List[float]]]:
        if not chunks:
            raise ValueError("chunks is empty")

        texts = [c.page_content for c in chunks]
        vectors = self.embeddings.embed_documents(texts)

        if len(vectors) != len(chunks):
            raise RuntimeError(f"Vector count mismatch: {len(vectors)} != {len(chunks)}")

        valid_chunks: List[Document] = []
        valid_vectors: List[List[float]] = []
        for c, v in zip(chunks, vectors):
            if v:
                valid_chunks.append(c)
                valid_vectors.append(v)

        return valid_chunks, valid_vectors

    def to_qdrant_points(self, chunks: List[Document], vectors: List[List[float]], *, document_id: str) -> List[models.PointStruct]:
        points: List[models.PointStruct] = []

        for idx, (chunk, vec) in enumerate(zip(chunks, vectors)):
            meta = dict(chunk.metadata or {})
            meta["chunk_index"] = idx

            if meta.get("page") is not None:
                try:
                    meta["page"] = int(meta["page"]) + 1
                except Exception:
                    meta["page"] = None

            points.append(
                models.PointStruct(
                    id=str(uuid.uuid4()),
                    vector={"text": vec},
                    payload={
                        "page_content": chunk.page_content,
                        "file_id": document_id,
                        "metadata": meta,
                    },
                )
            )
        return points

    def ensure_collection(self, *, collection_name: str, vector_size: int, distance: str = "Cosine") -> None:
        want_distance = getattr(models.Distance, distance.upper())

        cols = self.qdrant.get_collections()
        exists = any(c.name == collection_name for c in cols.collections)

        if exists:
            info = self.qdrant.get_collection(collection_name)
            vectors_cfg = info.config.params.vectors
            compatible = (
                isinstance(vectors_cfg, dict)
                and "text" in vectors_cfg
                and vectors_cfg["text"].size == vector_size
                and vectors_cfg["text"].distance == want_distance
            )
            if compatible:
                return

            if not SETTINGS.recreate_incompatible_collection:
                raise RuntimeError(
                    f"Collection '{collection_name}' exists but incompatible. "
                    f"Set RECREATE_INCOMPATIBLE_COLLECTION=true to allow deletion + recreation."
                )
            logger.warning("Recreating incompatible collection '%s'...", collection_name)
            self.qdrant.delete_collection(collection_name)

        # Create collection (handle concurrent creators gracefully)
        try:
            self.qdrant.create_collection(
                collection_name=collection_name,
                vectors_config={"text": models.VectorParams(size=vector_size, distance=want_distance)},
            )
        except Exception as e:
            # If it was created by another worker meanwhile, just continue
            msg = str(e).lower()
            if "already exists" in msg or "exists" in msg:
                logger.info("Collection '%s' already exists (race), continuing.", collection_name)
                return
            raise

    def upsert_points(self, *, collection_name: str, points: List[models.PointStruct]) -> None:
        bs = SETTINGS.qdrant_batch_size
        for start in range(0, len(points), bs):
            batch = points[start : start + bs]
            _retry(lambda: self.qdrant.upsert(collection_name=collection_name, points=batch), tries=3)

    def ingestion_pipeline(self, *, job_id: str, object_key: str, bucket_name: str, document_id: str, collection_name: str) -> Dict[str, Any]:
        self._validate_non_empty("object_key", object_key)
        self._validate_non_empty("bucket_name", bucket_name)
        self._validate_non_empty("document_id", document_id)
        self._validate_non_empty("collection_name", collection_name)
        self._validate_non_empty("job_id", job_id)

        tmp_path: Optional[str] = None
        suffix: Optional[str] = None

        try:
            #updating job stage to download
            update_job_stage(job_id=job_id, stage=IngestionJobStage.DOWNLOAD)
            append_job_log(job_id=job_id, level="info", message="Downloading file from MinIO and carrying out the ingestion pipeline", extra={"object_key": object_key, "bucket_name": bucket_name})
            
            tmp_path, suffix = self._download_minio_to_tempfile(bucket=bucket_name, object_key=object_key)

            update_job_stage(job_id=job_id, stage=IngestionJobStage.PARSE)

            docs = self._load_text_from_local_file(local_path=tmp_path, object_key=object_key, bucket_name=bucket_name)
            if not docs:
                return {"ok": False, "error": "no_documents_loaded"}

            self._normalize_metadata(docs, document_id=document_id)
            text_chunks = self.chunk_documents(docs)

            table_chunks: List[Document] = []
            if suffix == ".pdf":
                table_chunks = self._extract_tables_from_local_pdf(pdf_path=tmp_path, object_key=object_key, bucket_name=bucket_name)
                if table_chunks:
                    self._normalize_metadata(table_chunks, document_id=document_id)

            update_job_stage(job_id=job_id, stage=IngestionJobStage.CHUNK)

            chunks = text_chunks + table_chunks
            if not chunks:
                return {"ok": False, "error": "no_chunks_generated"}

            update_job_stage(job_id=job_id, stage=IngestionJobStage.EMBED)

            embedded_chunks, vectors = self.embed_chunks(chunks)
            if not vectors:
                return {"ok": False, "error": "no_vectors_generated"}

            points = self.to_qdrant_points(embedded_chunks, vectors, document_id=document_id)
            if not points:
                return {"ok": False, "error": "no_points_generated"}

            update_job_stage(job_id=job_id, stage=IngestionJobStage.INDEX)
            vector_size = len(points[0].vector["text"])
            self.ensure_collection(collection_name=collection_name, vector_size=vector_size)
            self.upsert_points(collection_name=collection_name, points=points)

            return {"ok": True, "points": len(points), "vector_size": vector_size}

        finally:
            if tmp_path:
                try:
                    os.unlink(tmp_path)
                except OSError:
                    pass

@lru_cache(maxsize=1)
def worker_singleton() -> IngestionWorker:
    return IngestionWorker()

@celery_app.task(name="ingestion.process_file", bind=True, max_retries=3)
def ingest_document_task(
    self,
    *,
    job_id: str,
    object_key: str,
    bucket_name: str,
    document_id: str,
    collection_name: str,
    stream_name: Optional[str] = None,
    stream_group: Optional[str] = None,
    stream_msg_id: Optional[str] = None,
) -> Dict[str, Any]:
    try:
        logger.info(
            "Task start | doc=%s | key=%s | bucket=%s | collection=%s | msg=%s",
            document_id, object_key, bucket_name, collection_name, stream_msg_id
        )

        append_job_log(job_id=job_id, level="info", message="Celery task started", extra={"msg_id": stream_msg_id})
        

        result = worker_singleton().ingestion_pipeline(
            job_id=job_id,
            object_key=object_key,
            bucket_name=bucket_name,
            document_id=document_id,
            collection_name=collection_name,
        )

        if not result.get("ok"):
            raise RuntimeError(f"Ingestion failed: {result}")

        if stream_name and stream_group and stream_msg_id:
            try:
                redis_client().xack(stream_name, stream_group, stream_msg_id)
                result["stream_acked"] = True
            except Exception as e:
                raise RuntimeError(f"Failed to XACK stream msg_id={stream_msg_id}: {e}") from e

        #updated the database to succeeded
        mark_job_succeeded(job_id=job_id, extra_log={"vector_size": result.get("vector_size")})
        append_job_log(job_id=job_id, level="info", message="Celery task completed", extra={"msg_id": stream_msg_id})

        logger.info("Task success | doc=%s | points=%s", document_id, result.get("points"))
        return result

    except Exception as e:
        logger.exception("Task error | doc=%s | msg=%s | err=%s", document_id, stream_msg_id, e)

        if self.request.retries >= self.max_retries:
            #updated the database to failed
            mark_job_failed(job_id=job_id, error=str(e), stage=IngestionJobStage.DOWNLOAD)
            append_job_log(job_id=job_id, level="error", message="Celery task failed", extra={"msg_id": stream_msg_id})
            logger.error("Max retries exhausted for doc=%s", document_id)
            raise

        countdown = min(60, 5 * (2 ** self.request.retries))
        raise self.retry(exc=e, countdown=countdown)

