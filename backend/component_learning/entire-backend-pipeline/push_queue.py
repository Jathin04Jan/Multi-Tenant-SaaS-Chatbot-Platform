import json
import uuid
from redis import Redis

r = Redis(host="localhost", port=6379, decode_responses=True)

STREAM = "files_queue"

payload = {
    "bot_id": str(uuid.uuid4()),
    "file_id": str(uuid.uuid4()),
    "file_path": "tables.pdf",  # minio object key
}

# Redis Streams store fields as key/value pairs (strings)
msg_id = r.xadd(STREAM, payload)

print("Pushed to stream:", STREAM)
print("Message ID:", msg_id)
print("Payload:", json.dumps(payload, indent=2))