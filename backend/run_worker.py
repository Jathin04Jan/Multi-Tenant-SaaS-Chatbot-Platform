#!/usr/bin/env python3
"""
Ingestion Worker Entry Point

Run this script as a separate process to process ingestion jobs from the queue.

Usage:
    python run_worker.py

The worker will:
1. Continuously poll the ingestion_jobs table for queued jobs
2. Claim jobs safely using FOR UPDATE SKIP LOCKED
3. Process jobs through stages: download -> parse -> store
4. Extract text from documents and save to MinIO
5. Update document metadata with extraction information
"""

import logging
import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from app.services.ingestion_worker import IngestionWorker

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger(__name__)


def main():
    """Main entry point for the ingestion worker."""
    logger.info("Starting ingestion worker...")
    
    # Create worker instance
    worker = IngestionWorker(poll_interval=2.0)
    
    # Run worker forever
    try:
        worker.run_forever()
    except KeyboardInterrupt:
        logger.info("Worker stopped by user")
        worker.stop()
    except Exception as e:
        logger.error(f"Worker crashed: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()

