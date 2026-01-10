import uuid
from ingestion_celery import ingest_document_task

if __name__ == '__main__':
    pdf_path = "tables.pdf"
    txt_path = "1.+Installing+Kubernetes+using+Kubeadm.txt"
    bucket_name = "yourbot-documents"
    collection_name = "default_testing-2"
    embedding_model_name = "embeddinggemma:latest"
    qdrant_host = "localhost"
    qdrant_port = 6333
    qdrant_api_key = None
    prefer_grpc = True
    minio_endpoint = "localhost:9000"
    minio_access_key = "yourbot_minio_admin"
    minio_secret_key = "yourbot_minio_password"
    minio_bucket_name = "yourbot-documents"
    minio_secure = False

    while True:
        command = input("enter pdf or txt to test out celery tasks (or 'exit' to quit): ")
        if command.lower() == "pdf":
            file_id = str(uuid.uuid4())
            result = ingest_document_task.delay(
                object_key=pdf_path, 
                bucket_name=bucket_name, 
                file_id=file_id, 
                collection_name=collection_name, 
                embedding_model_name=embedding_model_name, 
                qdrant_host=qdrant_host, 
                qdrant_port=qdrant_port, 
                qdrant_api_key=qdrant_api_key, 
                prefer_grpc=prefer_grpc, 
                minio_endpoint=minio_endpoint, 
                minio_access_key=minio_access_key, 
                minio_secret_key=minio_secret_key, 
                minio_bucket_name=minio_bucket_name, 
                minio_secure=minio_secure
            )
            print(f"Task submitted to Celery: {result.id}")
            print(f"File ID: {file_id}")
            print("Waiting for task to complete...")
            # Wait for result (timeout: 5 minutes)
            success = result.get(timeout=300)
            print(f"Task completed: {success}")
        elif command.lower() == "txt":
            file_id = str(uuid.uuid4())
            result = ingest_document_task.delay(
                object_key=txt_path, 
                bucket_name=bucket_name, 
                file_id=file_id, 
                collection_name=collection_name, 
                embedding_model_name=embedding_model_name, 
                qdrant_host=qdrant_host, 
                qdrant_port=qdrant_port, 
                qdrant_api_key=qdrant_api_key, 
                prefer_grpc=prefer_grpc, 
                minio_endpoint=minio_endpoint, 
                minio_access_key=minio_access_key, 
                minio_secret_key=minio_secret_key, 
                minio_bucket_name=minio_bucket_name, 
                minio_secure=minio_secure
            )
            print(f"Task submitted to Celery: {result.id}")
            print(f"File ID: {file_id}")
            print("Waiting for task to complete...")
            # Wait for result (timeout: 5 minutes)
            success = result.get(timeout=300)
            print(f"Task completed: {success}")
        elif command.lower() == "exit":
            break
        else:
            print("invalid command")
