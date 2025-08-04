# server/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

# Directories
SERVER_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.abspath(os.path.join(SERVER_DIR, '..', 'assets', 'static'))

# Initialize Flask with static folder
app = Flask(
    __name__,
    static_folder=STATIC_DIR,    # assets/static
    static_url_path=''           # so “/foo” serves assets/static/foo
)

CORS(app)

# In-memory stores
todos = []
shopping = []

# Todos API
@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def set_todos():
    global todos
    data = request.get_json() or {}
    todos = data.get('todos', [])
    return '', 204

# Shopping API
@app.route('/shopping', methods=['GET'])
def get_shopping():
    return jsonify(shopping)

@app.route('/shopping', methods=['POST'])
def set_shopping():
    global shopping
    data = request.get_json() or {}
    shopping = data.get('shopping', [])
    return '', 204

# Serve index.html at root
@app.route('/')
def root():
    return send_from_directory(STATIC_DIR, 'index.html')

# Serve all other static files (HTML, CSS, JS, assets)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(STATIC_DIR, filename)

if __name__ == '__main__':
    # Run the server on port 5001
    app.run(debug=True, host='0.0.0.0', port=5001)