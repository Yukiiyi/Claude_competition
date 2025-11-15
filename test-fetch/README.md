# CMU Course Selection Chatbot

A quick prototype for a course selection helper chatbot with a React frontend and Flask backend using Claude AI.

## Features

- Interactive chatbot that answers questions about CMU courses
- Uses Claude AI with the course catalog PDF for accurate information
- Real-time responses about course prerequisites, schedules, units, and more
- Visual timetable display (sample data)

## Architecture

- **Frontend**: React (Vite) - Located in `FindClass/`
- **Backend**: Flask API - `app.py`
- **AI**: Claude Sonnet 4.5 with Files API
- **Data**: CMU Course Catalog PDF

## Setup & Running

### Prerequisites
- Python 3.12+
- Node.js v22+
- Anthropic API key

### Backend Setup
1. Create virtual environment and install dependencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors anthropic python-dotenv
```

2. Set your API key in `.env`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

3. Start the Flask server:
```bash
source venv/bin/activate
python app.py
```

Backend will run on http://localhost:5000

### Frontend Setup
1. Install dependencies:
```bash
cd FindClass
npm install
```

2. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Usage

1. Make sure both servers are running
2. Open http://localhost:5173 in your browser
3. Ask questions about CMU courses in the chat interface

### Example Questions:
- "What are the prerequisites for 15-213?"
- "Tell me about Introduction to Computer Systems"
- "What computer science courses are available?"
- "How many units is 15-213?"

## API Endpoints

### `POST /chat`
Main chatbot endpoint
```json
{
  "message": "What are the prereqs for 15-213?"
}
```

Response:
```json
{
  "response": "Claude's answer...",
  "success": true
}
```

### `GET /health`
Health check endpoint
```json
{
  "status": "healthy",
  "catalog_loaded": true
}
```

## Files Modified

- [FindClass/src/components/ChatArea.jsx](FindClass/src/components/ChatArea.jsx) - Connected to Flask backend API
- [FindClass/src/App.jsx](FindClass/src/App.jsx) - Removed local course adding logic
- [FindClass/package.json](FindClass/package.json) - Switched to standard Vite

## Notes

- The timetable currently shows sample data
- Backend uploads the catalog PDF once on startup for efficient reuse
- CORS is enabled for local development
