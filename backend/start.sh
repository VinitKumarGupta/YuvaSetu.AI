#!/bin/bash

# YuvaSetu.AI Backend Startup Script

echo "🚀 Starting YuvaSetu.AI Recommendation Engine"
echo "=============================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3."
    exit 1
fi

# Install dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Install spaCy model
echo "🧠 Installing spaCy English model..."
python3 install_spacy.py

# Start the server
echo "🌐 Starting FastAPI server..."
echo "Server will be available at: http://localhost:8000"
echo "API documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 main.py