# Two Separate Celery Apps Setup

This project uses **two completely separate Celery applications**:

## App 1: `tasks.py` - General Tasks
- **App Name**: `celery-learning-1`
- **Tasks**: `process`, `process2`
- **Worker Command**: `celery -A tasks worker --loglevel=info`

## App 2: `api_task.py` - MinIO Tasks  
- **App Name**: `celery-learning-2`
- **Tasks**: `process_minio_file`
- **Worker Command**: `celery -A api_task worker --loglevel=info`

## Running Workers

### Terminal 1 - General Tasks Worker:
```bash
cd backend/component_learning/celery-learning
celery -A tasks worker --loglevel=info
```

### Terminal 2 - MinIO Tasks Worker:
```bash
cd backend/component_learning/celery-learning
celery -A api_task worker --loglevel=info
```

## Characteristics of Separate Apps

- ✅ **Complete Isolation**: Each app is independent
- ✅ **Separate Namespaces**: `celery-learning-1` vs `celery-learning-2`
- ✅ **Independent Configuration**: Each app has its own settings
- ✅ **Separate Workers Required**: Must run one worker per app
- ✅ **No Task Cross-Calls**: Tasks from one app can't call tasks from the other
- ✅ **Independent Monitoring**: Monitor each app separately

## Usage

Run `main.py` to trigger tasks:
```bash
python main.py
```

Then use:
- `START 1` - Triggers `process` task (goes to App 1 worker)
- `START 2` - Triggers `process2` task (goes to App 1 worker)
- `process minio` - Triggers `process_minio_file` task (goes to App 2 worker)
