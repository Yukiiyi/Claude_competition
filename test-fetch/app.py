"""
CMU Course Selection Chatbot Backend
Simple Flask API that uses Claude with uploaded course catalog PDF
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import dotenv
dotenv.load_dotenv()
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize Claude client
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Global variable to store file_id
CATALOG_FILE_ID = None

def upload_catalog():
    """Upload course catalog PDF once on startup"""
    global CATALOG_FILE_ID
    
    if CATALOG_FILE_ID:
        print(f"Using existing file_id: {CATALOG_FILE_ID}")
        return
    
    print("Uploading course catalog PDF...")
    try:
        pdf_response = client.beta.files.upload(
            file=("catalog.pdf", open("catalog.pdf", "rb"), "application/pdf"),
        )
        CATALOG_FILE_ID = pdf_response.id
        print(f"✓ PDF uploaded successfully! File ID: {CATALOG_FILE_ID}")
    except Exception as e:
        print(f"✗ Error uploading PDF: {e}")
        raise

# Upload catalog when server starts
upload_catalog()

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "catalog_loaded": CATALOG_FILE_ID is not None
    })

@app.route('/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint
    
    Request body:
    {
        "message": "What are the prereqs for 15-213?"
    }
    
    Response:
    {
        "response": "Claude's answer...",
        "success": true
    }
    """
    try:
        # Get user message
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({
                "error": "No message provided",
                "success": False
            }), 400
        
        # Call Claude API with catalog
        response = client.beta.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=2000,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": user_message
                        },
                        {
                            "type": "document",
                            "source": {
                                "type": "file",
                                "file_id": CATALOG_FILE_ID
                            }
                        }
                    ]
                }
            ],
            system="""You are a helpful CMU course selection advisor. 
Use the course catalog to answer questions about courses, prerequisites, 
schedules, units, and help students plan their semester. 
Be specific and cite course codes when relevant.""",
            betas=["files-api-2025-04-14"],
        )
        
        # Extract text response
        assistant_message = response.content[0].text
        
        return jsonify({
            "response": assistant_message,
            "success": True
        })
        
    except Exception as e:
        print(f"Error in /chat: {e}")
        return jsonify({
            "error": str(e),
            "success": False
        }), 500

@app.route('/courses/search', methods=['GET'])
def search_courses():
    """
    Optional: Search for specific courses
    Query params: q=<search term>
    """
    query = request.args.get('q', '')
    
    if not query:
        return jsonify({
            "error": "No search query provided",
            "success": False
        }), 400
    
    try:
        response = client.beta.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=1500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"List all courses related to: {query}. Include course codes, titles, and brief descriptions."
                        },
                        {
                            "type": "document",
                            "source": {
                                "type": "file",
                                "file_id": CATALOG_FILE_ID
                            }
                        }
                    ]
                }
            ],
            system="You are a CMU course catalog assistant. List courses concisely with code, title, and one-line description.",
            betas=["files-api-2025-04-14"],
        )
        
        return jsonify({
            "results": response.content[0].text,
            "success": True
        })
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("CMU Course Selection Chatbot Backend")
    print("="*50)
    print(f"Catalog File ID: {CATALOG_FILE_ID}")
    print("Starting server on http://localhost:5000")
    print("="*50 + "\n")
    
    app.run(debug=True, port=5000)