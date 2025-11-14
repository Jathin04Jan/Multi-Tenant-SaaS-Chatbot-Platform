# Database Setup Guide

[← Docs Index](./README.md) · [Backend Quick Start](../README.md) · [Project Overview](../../README.md)

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
- **Port**: `5433` (host port, container uses 5432)
- **Database**: `yourbot_db`
- **Username**: `yourbot_user`
- **Password**: `yourbot_password`

**Note:** Port `5433` is used on the host to avoid conflicts with local PostgreSQL installations. The container internally uses port `5432`.

### Connect Using psql

```bash
# From your local machine (if psql is installed)
psql -h localhost -p 5433 -U yourbot_user -d yourbot_db

# Or using Docker (uses container port 5432)
docker exec -it yourbot_postgres psql -U yourbot_user -d yourbot_db
```

### Connection String

```
postgresql://yourbot_user:yourbot_password@localhost:5433/yourbot_db
```

**Note:** Use port `5433` when connecting from your local machine. When connecting from within the Docker network (e.g., from pgAdmin container), use port `5432`.

## Environment Variables

Create a `.env` file in the project root (see `.env.example` for reference):

```env
POSTGRES_USER=yourbot_user
POSTGRES_PASSWORD=yourbot_password
POSTGRES_DB=yourbot_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
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

If port 5433 is already in use, you can change it in `docker-compose.yml`:

```yaml
ports:
  - "5434:5432"  # Use 5434 (or any other port) instead of 5433
```

Remember to update your `DATABASE_URL` in `.env` to match the new port.

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

