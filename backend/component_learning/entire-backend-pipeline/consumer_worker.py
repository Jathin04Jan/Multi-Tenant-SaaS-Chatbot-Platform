from __future__ import annotations

import json
import logging
import os
import signal
import socket
import time
from dataclasses import dataclass
from typing import Any, Dict, Optional, Tuple, List

from redis import Redis
from redis.exceptions import RedisError



from ingestion_celery import ingest_document_task
from database_operations import mark_job_processing, append_job_log


logger = logging.getLogger("stream-consumer")
if not logger.handlers:
    logging.basicConfig(
        level=os.getenv("LOG_LEVEL", "INFO"),
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )

@dataclass(frozen=True)
class Settings:
    redis_host: str = os.getenv("REDIS_HOST", "localhost")
    redis_port: int = int(os.getenv("REDIS_PORT", "6379"))
    redis_db: int = int(os.getenv("REDIS_DB", "0"))
    redis_password: Optional[str] = os.getenv("REDIS_PASSWORD") or None

    # Streams
    stream_name: str = os.getenv("STREAM_NAME", "files_queue")
    group_name: str = os.getenv("STREAM_GROUP", "ingestion_group")
    consumer_name: str = os.getenv("STREAM_CONSUMER", "")
    block_ms: int = int(os.getenv("STREAM_BLOCK_MS", "5000"))
    read_count: int = int(os.getenv("STREAM_READ_COUNT", "5"))

    # Pending reclaim
    pending_idle_ms: int = int(os.getenv("PENDING_IDLE_MS", "60000"))
    pending_claim_count: int = int(os.getenv("PENDING_CLAIM_COUNT", "10"))
    pending_reclaim_interval_s: int = int(os.getenv("PENDING_RECLAIM_INTERVAL_S", "30"))

    # Poison handling / DLQ
    max_delivery_attempts: int = int(os.getenv("MAX_DELIVERY_ATTEMPTS", "5"))
    dlq_stream_name: str = os.getenv("DLQ_STREAM_NAME", "files_queue_dlq")

    # Defaults for ingestion
    default_bucket_name: str = os.getenv("DEFAULT_BUCKET_NAME", "yourbot-documents")
    default_collection_name: str = os.getenv("DEFAULT_COLLECTION_NAME", "default_testing-2")

    # Group creation behavior
    group_start_id: str = os.getenv("STREAM_GROUP_START_ID", "$")  # "$" prod, "0" dev backfill


SETTINGS = Settings(
    consumer_name=os.getenv("STREAM_CONSUMER") or f"{socket.gethostname()}-{os.getpid()}"
)

_redis_client: Optional[Redis] = None

def get_redis() -> Redis:
    """
    Redis client with sane timeouts for blocking reads.
    socket_timeout must be > block time to avoid "Timeout reading from socket".
    """
    global _redis_client

    if _redis_client is None:
        _redis_client = Redis(
            host=SETTINGS.redis_host,
            port=SETTINGS.redis_port,
            db=SETTINGS.redis_db,
            password=SETTINGS.redis_password,
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=(SETTINGS.block_ms / 1000) + 5,
            retry_on_timeout=True,
            health_check_interval=30,
        )

    try:
        _redis_client.ping()
    except Exception:
        logger.warning("Redis ping failed, recreating connection...")
        try:
            _redis_client.close()
        except Exception:
            pass
        _redis_client = None
        return get_redis()

    return _redis_client

def ensure_group(r: Redis) -> None:
    try:
        r.xgroup_create(
            SETTINGS.stream_name,
            SETTINGS.group_name,
            id=SETTINGS.group_start_id,
            mkstream=True,
        )
        logger.info(
            "Created group '%s' on stream '%s' at id=%s",
            SETTINGS.group_name,
            SETTINGS.stream_name,
            SETTINGS.group_start_id,
        )
    except RedisError as e:
        if "BUSYGROUP" in str(e):
            logger.info(
                "Group '%s' already exists on stream '%s'",
                SETTINGS.group_name,
                SETTINGS.stream_name,
            )
        else:
            raise

def safe_int(v: Any, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default

def parse_required_fields(fields: Dict[str, Any]) -> Tuple[Optional[str], Optional[str], Optional[str], Optional[str], Optional[str]]:
    job_id = fields.get("job_id")
    object_key = fields.get("object_key") or fields.get("file_path")
    document_id = fields.get("document_id") or fields.get("file_id")
    tenant_id = fields.get("tenant_id")
    bot_id = fields.get("bot_id")  # kept for backward compatibility

    if job_id is not None and not isinstance(job_id, str):
        raise ValueError(f"job_id must be string, got {type(job_id)}")
    if object_key is not None and not isinstance(object_key, str):
        raise ValueError(f"object_key must be string, got {type(object_key)}")
    if document_id is not None and not isinstance(document_id, str):
        raise ValueError(f"document_id must be string, got {type(document_id)}")
    if tenant_id is not None and not isinstance(tenant_id, str):
        raise ValueError(f"tenant_id must be string, got {type(tenant_id)}")
    if bot_id is not None and not isinstance(bot_id, str):
        raise ValueError(f"bot_id must be string, got {type(bot_id)}")

    return object_key, document_id, tenant_id, bot_id, job_id

def push_to_dlq(r: Redis, msg_id: str, fields: Dict[str, Any], reason: str) -> None:
    payload = {
        "original_stream": SETTINGS.stream_name,
        "original_group": SETTINGS.group_name,
        "msg_id": msg_id,
        "reason": reason,
        "fields": json.dumps(fields, ensure_ascii=False),
        "ts": str(int(time.time())),
    }
    r.xadd(SETTINGS.dlq_stream_name, payload)
    logger.error("Sent msg=%s to DLQ='%s' reason=%s", msg_id, SETTINGS.dlq_stream_name, reason)

def _parse_pending_entry(ent: Any) -> Tuple[Optional[str], int, int]:
    msg_id: Optional[str] = None
    idle: Any = None
    deliveries: Any = None

    if isinstance(ent, dict):
        msg_id = ent.get("message_id")
        idle = ent.get("idle")
        deliveries = ent.get("times_delivered")
    elif hasattr(ent, "message_id"):
        msg_id = getattr(ent, "message_id", None)
        idle = getattr(ent, "idle", None)
        deliveries = getattr(ent, "times_delivered", None)
    elif isinstance(ent, (tuple, list)) and len(ent) >= 4:
        msg_id = ent[0]
        idle = ent[2]
        deliveries = ent[3]

    return msg_id, safe_int(idle, 0), safe_int(deliveries, 0)

def reclaim_pending(r: Redis) -> None:
    try:
        summary = r.xpending(SETTINGS.stream_name, SETTINGS.group_name)
        if not summary or safe_int(summary.get("count", 0), 0) == 0:
            return

        entries = r.xpending_range(
            SETTINGS.stream_name,
            SETTINGS.group_name,
            min="-",
            max="+",
            count=SETTINGS.pending_claim_count,
        )

        claim_ids: List[str] = []
        poison_ids: List[str] = []

        for ent in entries:
            msg_id, idle_ms, times = _parse_pending_entry(ent)
            if not msg_id:
                continue

            if times >= SETTINGS.max_delivery_attempts:
                poison_ids.append(msg_id)
            elif idle_ms >= SETTINGS.pending_idle_ms:
                claim_ids.append(msg_id)

        for pid in poison_ids:
            try:
                res = r.xrange(SETTINGS.stream_name, min=pid, max=pid)
                fields = res[0][1] if res else {}
                push_to_dlq(r, pid, fields, reason="max_delivery_attempts_exceeded")
                r.xack(SETTINGS.stream_name, SETTINGS.group_name, pid)
                logger.warning("Poison msg DLQ'd + ACK'd msg=%s", pid)
            except Exception as e:
                logger.exception("Failed DLQ/XACK for poison msg=%s err=%s (stays pending)", pid, e)

        if not claim_ids:
            return

        claimed = r.xclaim(
            SETTINGS.stream_name,
            SETTINGS.group_name,
            SETTINGS.consumer_name,
            min_idle_time=SETTINGS.pending_idle_ms,
            message_ids=claim_ids,
        )
        if claimed:
            logger.warning("Reclaimed %d pending messages", len(claimed))

    except Exception as e:
        logger.exception("Pending reclaim error: %s", e)

def queue_ingestion_task(*, msg_id: str, fields: Dict[str, Any]) -> None:
    object_key, document_id, tenant_id, _bot_id, job_id = parse_required_fields(fields)

    if not object_key or not document_id:
        raise ValueError(f"Invalid payload: needs object_key+document_id (got {object_key=} {document_id=})")
    
    if not tenant_id:
        raise ValueError(f"Invalid payload: tenant_id is required (got {tenant_id=})")
    
    if not job_id:
        raise ValueError(f"Invalid payload: job_id is required (got {job_id=})")

    # Use tenant_id for both bucket name and collection name
    bucket_name = tenant_id
    collection_name = tenant_id

    # DB: queued -> processing, stage=DOWNLOAD, started_at set
    mark_job_processing(job_id=job_id)
    append_job_log(job_id=job_id, level="info", message="Picked by consumer; queuing celery task", extra={"msg_id": msg_id})
    
    async_result = ingest_document_task.delay(
        job_id=job_id,
        object_key=object_key,
        bucket_name=bucket_name,
        document_id=document_id,
        collection_name=collection_name,
        stream_name=SETTINGS.stream_name,
        stream_group=SETTINGS.group_name,
        stream_msg_id=msg_id,
    )

    logger.info(
        "Queued Celery task | msg=%s | task_id=%s | doc=%s | key=%s | tenant=%s | bucket=%s | collection=%s",
        msg_id, async_result.id, document_id, object_key, tenant_id, bucket_name, collection_name, job_id
    )

_shutdown = False

def _handle_signal(signum, frame) -> None:
    global _shutdown
    logger.info("Received signal %s, shutting down gracefully...", signum)
    _shutdown = True

def _process_batch(r: Redis, resp) -> None:
    for _stream, messages in resp:
        for msg_id, fields in messages:
            if not isinstance(fields, dict):
                try:
                    push_to_dlq(r, msg_id, {}, reason=f"invalid_fields_format:{type(fields)}")
                    r.xack(SETTINGS.stream_name, SETTINGS.group_name, msg_id)
                except Exception as e2:
                    logger.exception("Failed DLQ/XACK for malformed msg=%s err=%s", msg_id, e2)
                continue

            try:
                queue_ingestion_task(msg_id=msg_id, fields=fields)
                # DO NOT XACK here; Celery XACKs only after successful ingestion
            except ValueError as e:
                logger.error("Validation error | msg=%s | err=%s | fields=%s", msg_id, e, fields)
                try:
                    push_to_dlq(r, msg_id, fields, reason=f"validation_error:{e}")
                    r.xack(SETTINGS.stream_name, SETTINGS.group_name, msg_id)
                except Exception as e2:
                    logger.exception("Failed DLQ/XACK for invalid msg=%s err=%s", msg_id, e2)
            except Exception as e:
                logger.error("Enqueue error (will retry) | msg=%s | err=%s", msg_id, e)

def consume_loop() -> None:
    signal.signal(signal.SIGINT, _handle_signal)
    signal.signal(signal.SIGTERM, _handle_signal)

    r = get_redis()
    ensure_group(r)

    logger.info(
        "Listening | stream=%s | group=%s | consumer=%s",
        SETTINGS.stream_name, SETTINGS.group_name, SETTINGS.consumer_name
    )

    backoff_s = 1
    last_reclaim_at = 0.0

    while not _shutdown:
        try:
            now = time.time()
            if now - last_reclaim_at >= SETTINGS.pending_reclaim_interval_s:
                reclaim_pending(r)
                last_reclaim_at = now

            resp = r.xreadgroup(
                groupname=SETTINGS.group_name,
                consumername=SETTINGS.consumer_name,
                streams={SETTINGS.stream_name: ">"},
                count=SETTINGS.read_count,
                block=SETTINGS.block_ms,
            )

            if not resp:
                backoff_s = 1
                continue

            _process_batch(r, resp)
            backoff_s = 1

        except RedisError as e:
            logger.exception("Redis error: %s", e)
            global _redis_client
            if _redis_client:
                try:
                    _redis_client.close()
                except Exception:
                    pass
                _redis_client = None

            time.sleep(backoff_s)
            backoff_s = min(backoff_s * 2, 30)
            r = get_redis()

        except Exception as e:
            logger.exception("Unexpected error: %s", e)
            time.sleep(1)

    logger.info("Shutdown complete. Bye.")

def main() -> None:
    consume_loop()

if __name__ == "__main__":
    main()