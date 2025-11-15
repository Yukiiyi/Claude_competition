#!/bin/bash

# CMU Course Selection Chatbot Startup Script

echo "=================================================="
echo "CMU Course Selection Chatbot"
echo "=================================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install flask flask-cors anthropic python-dotenv
else
    source venv/bin/activate
fi

# Check if frontend dependencies are installed
if [ ! -d "FindClass/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd FindClass
    npm install
    cd ..
fi

echo ""
echo "Starting servers..."
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================================="
echo ""

# Start backend in background
python app.py &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd FindClass
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
