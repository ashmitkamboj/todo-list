# To-Do Dashboard

A full-stack task management dashboard built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- User authentication and authorization (JWT based)
- Dashboard layout with sidebar navigation
- Task filtering (Today, History, Completed)
- Responsive mobile-first design
- Secure REST API

## Tech Stack
- **Frontend**: React (Vite), Axios, custom CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Security**: bcryptjs, jsonwebtoken

## Project Structure

```text
todo-list/
├── backend/          # Express API server
│   ├── config/       # Database connection setup
│   ├── controllers/  # Route handlers (auth, todos)
│   ├── middleware/   # JWT verification
│   ├── models/       # Mongoose schemas (User, Todo)
│   ├── routes/       # Express router definitions
│   └── server.js     # Server entry point
└── frontend/         # React application
    ├── public/       # Static assets (favicon, etc.)
    └── src/          
        ├── components/ # React components (Header, Sidebar, Login, TodoForm, TodoItem)
        ├── services/   # Axios API calls
        ├── App.jsx     # Main layout & state management
        ├── index.css   # Global styles & theme configuration
        └── main.jsx    # React DOM rendering
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (local or Atlas)

### Local Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-list
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Environment Variables Setup:
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_string_here
```

Create a `.env` file in the `frontend/` directory (optional, defaults to localhost:3000):
```env
VITE_API_URL=http://localhost:3000/api
```

### Running the App

You will need two separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open your browser to the URL provided by Vite (usually `http://localhost:5173`).
