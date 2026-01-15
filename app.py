from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='.')
CORS(app)

# Mock responses for testing
def generate_response(prompt, max_length=150, temperature=0.7):
    """Generate response using mock data for testing"""
    return "You're doing an amazing job. Keep being yourself - the world needs your light!"

def generate_selfie_compliment():
    """Generate a unique selfie compliment"""
    return "Your smile is contagious and your spirit is radiant. You bring joy to everyone around you!"

def generate_chat_reply(message, history=None):
    """Generate a dynamic response"""
    if "hello" in message.lower() or "hi" in message.lower():
        return "Hello! I'm here to listen and support you. What's on your mind today?"
    elif "sad" in message.lower() or "blue" in message.lower():
        return "I hear you. It's okay to feel down sometimes. Remember, this feeling will pass. Would you like to talk about it?"
    elif "thank" in message.lower():
        return "You're so welcome! It brings me joy to help. How else can I support you?"
    else:
        return "That sounds important to you. Tell me more about what you're experiencing. I'm here to listen."


@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)


@app.route('/api/selfie-compliment', methods=['POST'])
def selfie_compliment():
    """Generate a compliment for a selfie"""
    compliment = generate_selfie_compliment()
    return jsonify({"compliment": compliment})


@app.route('/api/support-chat', methods=['POST'])
def support_chat():
    """Chat endpoint for AI support"""
    data = request.get_json(silent=True) or {}
    message = (data.get('message') or '').strip()
    history = data.get('history') or []

    if not message:
        return jsonify({"error": "Message cannot be empty."}), 400

    reply = generate_chat_reply(message, history)
    return jsonify({"reply": reply})


if __name__ == '__main__':
    app.run(debug=False, port=5000)
