from tasks import process, process2
from api_task import process_minio_file


if __name__ == '__main__':

    while True:
        command = input("type START 1 or 2 to start the process, 'process minio' to fetch file, and END to kill everything : ")
        if command.lower() == "start 1":
            result = process.delay(1, 2)

        elif command.lower() == "start 2":
            result = process2.delay(1, 2)
            print(result)
        elif command.lower() == "process minio":
            # File path: object key within the bucket
            file_path = "1.+Installing+Kubernetes+using+Kubeadm.txt"
            # Bucket name (defaults to 'yourbot-documents' if not specified)
            bucket_name = "yourbot-documents"
            
            # Pass both object_key and bucket_name
            result = process_minio_file.delay(file_path, bucket_name=bucket_name)
            print(f"Task submitted: {result}")
            print(f"Fetching file: {file_path} from bucket: {bucket_name}")
        elif command.lower() == "end":
            break