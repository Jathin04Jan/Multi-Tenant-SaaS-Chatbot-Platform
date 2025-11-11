# MinIO Setup Guide

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

MinIO is an S3-compatible object storage service for storing documents and files.

## 🚀 Quick Start

### Start MinIO

```bash
# From project root
docker-compose up -d minio
```

### Access MinIO Console

Once started, access the MinIO Console at:
- **URL**: http://localhost:9001
- **Username**: `yourbot_minio_admin`
- **Password**: `yourbot_minio_password`

## 📋 Configuration

### Default Credentials (from docker-compose.yml)

- **Access Key**: `yourbot_minio_admin`
- **Secret Key**: `yourbot_minio_password`
- **API Endpoint**: `http://localhost:9000`
- **Console**: `http://localhost:9001`
- **Default Bucket**: `yourbot-documents`

### Environment Variables

Add to `backend/.env`:

```env
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=yourbot_minio_admin
MINIO_SECRET_KEY=yourbot_minio_password
MINIO_SECURE=false
MINIO_BUCKET_NAME=yourbot-documents
```

## 🔧 Initial Setup

### 1. Create Bucket

After starting MinIO, create a bucket for your documents:

**Via Console:**
1. Go to http://localhost:9001
2. Login with credentials above
3. Click "Create Bucket"
4. Name it `yourbot-documents` (or your configured bucket name)
5. Set access policy as needed

**Via API** (later in backend code):
```python
from minio import Minio
from app.core.config import settings

client = Minio(
    settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ACCESS_KEY,
    secret_key=settings.MINIO_SECRET_KEY,
    secure=settings.MINIO_SECURE
)

if not client.bucket_exists(settings.MINIO_BUCKET_NAME):
    client.make_bucket(settings.MINIO_BUCKET_NAME)
```

## 📦 Docker Services

MinIO runs in a separate container:
- **Container Name**: `yourbot_minio`
- **Network**: `yourbot_network` (same as PostgreSQL)
- **Data Volume**: `minio_data` (persistent storage)

## 🔍 Health Check

MinIO includes a health check:
```bash
docker-compose ps minio
```

## 🛠️ Common Commands

```bash
# Start MinIO
docker-compose up -d minio

# Stop MinIO
docker-compose stop minio

# View logs
docker-compose logs -f minio

# Restart MinIO
docker-compose restart minio

# Remove MinIO (keeps data)
docker-compose down minio

# Remove MinIO and data (WARNING: deletes all files)
docker-compose down -v
```

## 📝 Usage in Backend

MinIO will be used for:
- Document storage (PDFs, Word docs, etc.)
- File uploads from users
- Knowledge base documents
- Bot training data

The backend configuration is ready in `app/core/config.py` with all MinIO settings.

## 🔒 Security Notes

- **Development**: Using default credentials (change in production!)
- **Production**: Generate strong access keys
- **HTTPS**: Set `MINIO_SECURE=true` in production
- **Access Policy**: Configure bucket policies in MinIO console

## 🌐 Network

MinIO is on the same Docker network (`yourbot_network`) as PostgreSQL, so:
- Containers can communicate internally
- Backend can access MinIO via `localhost:9000` or container name
- MinIO Console accessible from host at `localhost:9001`

