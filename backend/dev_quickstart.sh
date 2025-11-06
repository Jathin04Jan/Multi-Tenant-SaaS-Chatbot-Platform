#!/bin/bash
# Quick development setup script

echo "🚀 YourBot Backend - Development Quick Start"
echo ""

# Check if PostgreSQL is running
if ! docker-compose ps postgres 2>/dev/null | grep -q "Up"; then
    echo "📦 Starting PostgreSQL..."
    cd ..
    docker-compose up -d postgres
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 3
    cd backend
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if [ ! -f ".deps_installed" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
    touch .deps_installed
fi

# Reset database (optional - uncomment if you want auto-reset)
# echo "🔄 Resetting database..."
# python reset_db.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server:"
echo "  python run.py"
echo ""
echo "To reset database:"
echo "  python reset_db.py"
echo ""

