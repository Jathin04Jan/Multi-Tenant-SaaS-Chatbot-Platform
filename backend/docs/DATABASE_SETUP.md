# Database Setup Guide

## Quick Start

### Start PostgreSQL Database

```bash
# Start the PostgreSQL container
docker-compose up -d postgres

# Check if it's running
docker-compose ps

# View logs
docker-compose logs postgres
```

### Stop PostgreSQL Database

```bash
# Stop the container (data persists in volume)
docker-compose stop postgres

# Stop and remove container (data still persists)
docker-compose down

# Stop and remove container + volume (WARNING: deletes all data)
docker-compose down -v
```

## Database Connection

### Connection Details

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `yourbot_db`
- **Username**: `yourbot_user`
- **Password**: `yourbot_password`

### Connect Using psql

```bash
# From your local machine (if psql is installed)
psql -h localhost -U yourbot_user -d yourbot_db

# Or using Docker
docker exec -it yourbot_postgres psql -U yourbot_user -d yourbot_db
```

### Connection String

```
postgresql://yourbot_user:yourbot_password@localhost:5432/yourbot_db
```

## Environment Variables

Create a `.env` file in the project root (see `.env.example` for reference):

```env
POSTGRES_USER=yourbot_user
POSTGRES_PASSWORD=yourbot_password
POSTGRES_DB=yourbot_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## Data Persistence

The database data is stored in a Docker volume named `postgres_data`. This means:
- Data persists even if you stop/remove the container
- Data is stored on your local machine
- To completely remove data, use `docker-compose down -v`

## Health Check

The container includes a health check that verifies PostgreSQL is ready to accept connections. Check the health status:

```bash
docker-compose ps
```

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, you can change it in `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # Use 5433 instead of 5432
```

### Reset Database

To completely reset the database:

```bash
docker-compose down -v
docker-compose up -d postgres
```

### View Database Logs

```bash
docker-compose logs -f postgres
```

