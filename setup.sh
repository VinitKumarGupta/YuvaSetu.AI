#!/bin/bash

# YuvaSetu.AI Complete Setup Script

echo "🚀 Setting up YuvaSetu.AI - PM Internship Scheme Recommendation Engine"
echo "======================================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ from https://python.org/"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend dependencies installed"
echo ""

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend dependencies installed"
echo ""

# Install spaCy model
echo "🧠 Installing spaCy English model..."
python3 install_spacy.py

echo "✅ spaCy model setup completed"
echo ""

cd ..

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the backend: npm run backend"
echo "2. Start the frontend: npm run dev"
echo "3. Or start both: npm run start:full"
echo ""
echo "🌐 Access Points:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"
echo ""
echo "📚 Documentation: See README.md for detailed instructions"
echo ""
echo "🚀 Ready to revolutionize internship recommendations!"