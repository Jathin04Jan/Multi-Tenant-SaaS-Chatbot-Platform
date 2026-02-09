import json
import os
import time
import uuid
from redis import Redis

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
REDIS_DB = int(os.getenv("REDIS_DB", "0"))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD") or None

STREAM = os.getenv("STREAM_NAME", "files_queue")

DEFAULT_BUCKET = os.getenv("DEFAULT_BUCKET_NAME", "yourbot-documents")
DEFAULT_COLLECTION = os.getenv("DEFAULT_COLLECTION_NAME", "default_testing-2")

r = Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
    password=REDIS_PASSWORD,
    decode_responses=True,
    socket_connect_timeout=5,
    socket_timeout=5,
    retry_on_timeout=True,
    health_check_interval=30,
)

payload = {
    # identity
    "tenant_id": str("yourbot-documents"),
    "file_id": str(uuid.uuid4()),
    "file_path": "tables.pdf",  # MinIO object key
    #"bot_id": str(uuid.uuid4()),
    "job_id": str("8db842a0-0980-46c0-87ed-b79f538128d8"),

    # routing (recommended to include explicitly)
    #"bucket_name": DEFAULT_BUCKET,
    #"collection_name": DEFAULT_COLLECTION,

    # observability
    "event_type": "document_uploaded",
    "ts": str(int(time.time())),
}

# Ensure everything is a string (Redis Streams expects string values)
payload = {k: ("" if v is None else str(v)) for k, v in payload.items()}

msg_id = r.xadd(
    STREAM,
    payload,
    maxlen=5000,          # cap stream growth
    approximate=True
)

print("Pushed to stream:", STREAM)
print("Message ID:", msg_id)
print("Payload:", json.dumps(payload, indent=2))


'''
reviews

payload has to change
adding proper support to env files
add database connection 
'''