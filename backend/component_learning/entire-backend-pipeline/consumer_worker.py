import time
from redis import Redis
from some_celery_task import ingest_document_task

r = Redis(host="localhost", port=6379, decode_responses=True)

STREAM = "files_queue"
GROUP = "ingestion_group"
CONSUMER = "ingestion_service_1"

def ensure_group():
    try:
        # MKSTREAM creates stream if it doesn't exist
        r.xgroup_create(STREAM, GROUP, id="$", mkstream=True)
        print(f"Created group '{GROUP}' on stream '{STREAM}'")
    except Exception as e:
        # BUSYGROUP means it already exists
        if "BUSYGROUP" in str(e):
            print(f"Group '{GROUP}' already exists")
        else:
            raise

def process_message(msg_id: str, fields: dict):
    # Replace these prints with real DB updates later
    print(f"[{msg_id}] DB status -> processing (simulated)")
    print(f"[{msg_id}] Payload:", fields)

    REQUIRED = {"bot_id", "file_id", "file_path"}

    missing = REQUIRED - set(fields.keys())
    if missing:
        print(f"[{msg_id}] Invalid payload, missing {missing}. ACKing to drop.")
        r.xack(STREAM, GROUP, msg_id)
        return

    # Simulate ingestion work
    # Later: call your ingestion_pipeline(fields["file_path"], fields["file_id"], fields["bot_id"], etc.)
    res = ingest_document_task.delay(
        object_key=fields["file_path"],
        bucket_name="yourbot-documents",
        file_id=fields["file_id"])
    print(f"[{msg_id}] Celery task queued: {res.id}")

    # Simulate success
    print(f"[{msg_id}] DB status -> completed (simulated)")
    return True

def main():
    ensure_group()
    print("Listening... (Ctrl+C to stop)")

    while True:
        resp = r.xreadgroup(
            groupname=GROUP,
            consumername=CONSUMER,
            streams={STREAM: ">"},
            count=1,
            block=5000,  # 5s
        )

        if not resp:
            continue

        for stream_name, messages in resp:
            for msg_id, fields in messages:
                try:
                    ok = process_message(msg_id, fields)
                    if ok:
                        r.xack(STREAM, GROUP, msg_id)
                        print(f"[{msg_id}] ACKED ✅")
                    else:
                        print(f"[{msg_id}] Not acked (simulated failure)")
                except Exception as e:
                    print(f"[{msg_id}] Failed: {e} (NOT ACKED)")

if __name__ == "__main__":
    main()