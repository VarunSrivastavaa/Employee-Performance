# AI-Based Employee Performance Analytics & Recommendation System

## Overview
This is a full-stack MERN application designed to analyze employee performance data and provide AI-powered recommendations using OpenRouter's API (Meta Llama-3).

### Features
- **Authentication**: JWT-based secure login and signup with hashed passwords.
- **Employee Management**: Add, view, search (by department), and delete employee records.
- **AI Recommendations**:
  - **Single Employee**: Provides promotion suggestions (high score), improvement feedback (low score), or training suggestions.
  - **Multiple Employees**: Ranks selected employees based on performance and experience and provides promotion recommendations.
- **Rich Aesthetics**: Responsive, glassmorphism-inspired dark mode UI.

## Project Structure
```
.
├── backend
│   ├── controllers
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes
│   │   ├── ai.js
│   │   ├── auth.js
│   │   └── employees.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend
    ├── src
    │   ├── api.js
    │   ├── App.jsx
    │   ├── components
    │   │   └── Navbar.jsx
    │   ├── pages
    │   │   ├── AddEmployee.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Login.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Running Locally
1. **Backend**:
   - `cd backend`
   - Set `MONGODB_URI` and `OPENROUTER_API_KEY` in `backend/.env`.
   - `npm install`
   - `npm run dev`

2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Deployment on Render
1. Create a MongoDB Atlas cluster and get the connection string.
2. Push your code to GitHub.
3. In Render, create a **Web Service** for the backend. Set the Root Directory to `backend`, Build Command to `npm install`, and Start Command to `npm start`. Add Env Vars for `MONGODB_URI`, `JWT_SECRET`, and `OPENROUTER_API_KEY`.
4. In Render, create a **Static Site** for the frontend. Set the Root Directory to `frontend`, Build Command to `npm run build`, Publish directory to `dist`.
5. Update `baseURL` in `frontend/src/api.js` to point to the live Render backend URL before deploying the frontend.

## Documentation for PDF Submission
As per the assignment requirements, you need to compile a PDF document containing:
- The codebase (or GitHub link).
- Code output (screenshots of the frontend working).
- Postman/Thunder Client screenshots for all HTTP endpoints.
- MongoDB Atlas screenshots showing the stored items.
- Render deployment success screenshots and Live URLs.
