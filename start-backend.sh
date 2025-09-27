#!/bin/bash

# Navigate to backend directory
cd backend

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Start the Flask application
echo "Starting YuvaSetu.AI Recommendation API..."
python app.py