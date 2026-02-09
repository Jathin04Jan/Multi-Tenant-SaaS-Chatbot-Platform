from minio import Minio
from minio.error import S3Error
from io import BytesIO
from time import sleep
from typing import List
from celery import Celery

# Second separate Celery app for MinIO tasks
app = Celery('celery-learning-2', broker='redis://localhost:6379')    

# MinIO Configuration (from docker-compose.yml)
MINIO_ENDPOINT = "localhost:9000"
MINIO_ACCESS_KEY = "yourbot_minio_admin"
MINIO_SECRET_KEY = "yourbot_minio_password"
MINIO_BUCKET_NAME = "yourbot-documents"  # Default bucket name
MINIO_SECURE = False  # Set to True for HTTPS


def list_files_in_bucket(bucket_name: str = MINIO_BUCKET_NAME, prefix: str = "") -> List[str]:
    """
    List all files (object keys) in a MinIO bucket.
    
    Args:
        bucket_name: The bucket name to list files from
        prefix: Optional prefix to filter files (e.g., "documents/" to list only files in that folder)
    
    Returns:
        List of object keys (file paths) in the bucket
    
    Example:
        list_files_in_bucket()  # Lists all files
        list_files_in_bucket(prefix="documents/")  # Lists only files in documents/ folder
    """
    try:
        # Initialize MinIO client
        client = Minio(
            MINIO_ENDPOINT,
            access_key=MINIO_ACCESS_KEY,
            secret_key=MINIO_SECRET_KEY,
            secure=MINIO_SECURE
        )
        
        # Check if bucket exists
        if not client.bucket_exists(bucket_name):
            raise RuntimeError(f"Bucket '{bucket_name}' does not exist in MinIO")
        
        # List objects
        objects = client.list_objects(bucket_name, prefix=prefix, recursive=True)
        
        file_paths = []
        print(f"\n{'='*80}")
        print(f"Files in bucket '{bucket_name}'" + (f" (prefix: '{prefix}')" if prefix else ""))
        print(f"{'='*80}")
        
        for obj in objects:
            file_paths.append(obj.object_name)
            size_kb = (obj.size or 0) / 1024
            print(f"  📄 {obj.object_name} ({size_kb:.2f} KB)")
        
        print(f"{'='*80}")
        print(f"Total files found: {len(file_paths)}\n")
        
        return file_paths
        
    except S3Error as e:
        raise RuntimeError(f"MinIO error listing files: {e}")
    except Exception as e:
        raise RuntimeError(f"Error listing files from MinIO: {e}")


def fetch_and_print_txt_file(object_key: str, bucket_name: str = MINIO_BUCKET_NAME) -> None:
    """
    Fetch a TXT file from MinIO and print its contents.
    
    Args:
        object_key: The path/key of the file in MinIO (e.g., "documents/file.txt")
        bucket_name: The bucket name (defaults to MINIO_BUCKET_NAME)
    
    Raises:
        RuntimeError: If file cannot be fetched or read
    """
    try:
        # Initialize MinIO client
        client = Minio(
            MINIO_ENDPOINT,
            access_key=MINIO_ACCESS_KEY,
            secret_key=MINIO_SECRET_KEY,
            secure=MINIO_SECURE
        )
        
        # Check if bucket exists
        if not client.bucket_exists(bucket_name):
            raise RuntimeError(f"Bucket '{bucket_name}' does not exist in MinIO")

        print("processing file in minio......")
        sleep(5)
        
        # Fetch the file
        print(f"Fetching file: {object_key} from bucket: {bucket_name}")
        response = client.get_object(bucket_name, object_key)
        
        try:
            # Read the file content
            data = response.read()
            
            # Decode bytes to string (assuming UTF-8 encoding for TXT files)
            content = data.decode('utf-8')
            
            # Print the file contents
            print("\n" + "="*80)
            print(f"Contents of '{object_key}':")
            print("="*80)
            print(content)
            print("="*80 + "\n")
            
        finally:
            # Always close the response
            response.close()
            response.release_conn()
            
    except S3Error as e:
        if e.code == "NoSuchKey":
            raise RuntimeError(f"File '{object_key}' not found in bucket '{bucket_name}'")
        else:
            raise RuntimeError(f"MinIO error: {e}")
    except UnicodeDecodeError as e:
        raise RuntimeError(f"Failed to decode file as UTF-8 text: {e}")
    except Exception as e:
        raise RuntimeError(f"Error fetching file from MinIO: {e}")


@app.task
def process_minio_file(object_key: str, bucket_name: str = MINIO_BUCKET_NAME) -> str:
    """
    Celery task to fetch and print a TXT file from MinIO.
    
    Args:
        object_key: The path/key of the file in MinIO
        bucket_name: The bucket name (optional)
    
    Returns:
        Success message
    """
    fetch_and_print_txt_file(object_key, bucket_name)
    return f"Successfully processed file: {object_key}"


if __name__ == '__main__':
    # Method 1: List all files to find the path
    print("Listing all files in MinIO bucket...")
    files = list_files_in_bucket()
    
    # Method 2: List files with a specific prefix (folder)
    # files = list_files_in_bucket(prefix="documents/")
    
    # Method 3: If you know the file name, use it directly
    # Uncomment and replace with your actual file path:
    # file_path = "test.txt"  # or "documents/example.txt"
    # fetch_and_print_txt_file(file_path)
    
    # Example: Fetch the first .txt file found
    txt_files = [f for f in files if f.endswith('.txt')]
    if txt_files:
        print(f"\nFound {len(txt_files)} TXT file(s). Fetching first one: {txt_files[0]}\n")
        fetch_and_print_txt_file(txt_files[0])
    else:
        print("\nNo .txt files found in the bucket.")