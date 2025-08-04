# 🤖 Personal Assistant

A simple full-stack Flask application serving a static HTML/JS front-end for managing Todos and a Shopping List.

## Features
- **Todos** with dynamic labels (create, filter, delete)
- **Shopping List** with quantity and categories
- **REST API** endpoints (`/todos`, `/shopping`)
- **Static file serving** for HTML, CSS, and JS assets

## Tech Stack
- **Backend:** Python Flask, flask-cors
- **Frontend:** HTML, Bootstrap 4, jQuery

## Getting Started

### Prerequisites
- Python 3.7+
- pip

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-assistant.git
   cd personal-assistant
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the App
```bash
cd server
python app.py
```
Then open your browser to `http://127.0.0.1:5001/`.

### Creationg python virtualenv
```bash
python3 -m venv myenv
```

## Project Structure
```plaintext
project-root/
├── server/app.py          # Flask application
├── assets/static/         # Front-end static files
├── requirements.txt       # Python dependencies
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## Contributing
Feel free to open issues or submit pull requests for new features or bug fixes.

## License
MIT © Your Name