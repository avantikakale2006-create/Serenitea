# Serenitea - Stress Management & Prediction Web App

Serenitea is a comprehensive web application designed to help users track, assess, and manage their stress levels. It features a modern, premium UI with interactive wavy backgrounds and a robust backend for secure data handling.

## 🚀 Key Features

- **User Authentication**: Secure signup and login with JWT-based sessions.
- **Stress Assessment**: Interactive questionnaire based on standard stress assessment protocols.
- **Progress Tracking**: Historical view of past assessments to monitor stress trends over time.
- **Data Visualization**: Dynamic charts (via Recharts) for an overview of stress levels.
- **Premium UI**: A serene, high-end "Zen" interface with multi-layered wavy backgrounds and glassmorphism.

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: Vanilla CSS (Rich Zen aesthetics with smooth animations)
- **State/API**: Axios for backend communication
- **Visualization**: Recharts
- **Icons**: Lucide-React

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **ORM**: SQLAlchemy
- **Database**: SQLite (local dev)
- **Security**: JWT authentication with Passlib (bcrypt)

---

## 🏃 Getting Started

### ⚡ The Easy Way (One-Click Start)

If you are on Windows, simply double-click the `start_app.bat` file in the root directory. This will:
1. Start the FastAPI backend in one window.
2. Start the React frontend in another window (automatically activating the local environment).

---

### 🛠️ Manual Setup

#### 1. Prerequisites

- [Python](https://www.python.org/) (v3.10+)
- *Note: Node.js is provided locally within the project.*

#### 2. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-multipart python-jose[cryptography]
   ```
4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

#### 3. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. **Activate the local Node environment** (Required):
   ```bash
   # On Windows:
   node-env\Scripts\activate
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
Serenitea/
├── backend/            # FastAPI application
│   ├── venv/           # Python virtual environment
│   └── ...             # API code
├── frontend/           # React frontend
│   ├── node-env/       # Local portable Node.js environment
│   ├── src/            # Application code
│   └── ...             # Config files
├── start_app.bat       # Shortcut to start both servers
└── README.md           # This file
```

## 📝 License

This project is open-source. Feel free to contribute or adapt it for your needs.
