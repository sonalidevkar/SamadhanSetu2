# SIH 2026 - Societal Innovation Collaboration Portal

A complete backend solution for the SIH 2026 project. The platform collects societal problems, analyzes them via AI, detects duplicates, matches with required expertise (universities and industries), and allows assigning teams to track the lifecycle up to impact measurement.

## Architecture

This project is divided into two main services:
1. **Node.js Express Backend**: The main REST API, handles MongoDB, Authentication, problem lifecycles, team assignments, and GIS queries.
2. **Python FastAPI AI Microservice**: Performs AI text classification and semantic similarity using `sentence-transformers`.

## Folder Structure

```text
.
├── backend/           # Node.js Express Backend
│   ├── server/        # Source code for the backend
│   │   ├── config/    # Environment and DB config
│   │   ├── controllers/# Route handler logic
│   │   ├── middleware/# Auth, Role, Error, Upload middleware
│   │   ├── models/    # Mongoose schema definitions
│   │   ├── routes/    # Express routers
│   │   ├── services/  # Business logic (GIS, AI triggering, Matching)
│   │   └── utils/     # Helpers
│   ├── package.json   # Node.js dependencies
│   └── .env           # Environment variables
├── ai-service/        # Python FastAPI application
│   ├── models/        # Pydantic models
│   ├── services/      # ML algorithms (Classification, Similarity)
│   ├── main.py        # FastAPI entry point
│   └── requirements.txt
└── uploads/           # Uploaded media (images, videos, docs)
```

## Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- Python 3.9+
- MongoDB instance (local or Atlas)

### 2. Node.js Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and fill in the MONGO_URI
npm run dev # OR node server/server.js
```
The server will run on `http://localhost:5000`

### 3. Python AI Microservice Setup
```bash
cd ai-service
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The service will run on `http://localhost:8000`

### 4. Running Both Services (Overall)
To run the full application locally, you need to start **both** services simultaneously in separate terminal windows:
1. **Terminal 1 (Node.js Backend):** Navigate to `backend/` and run `npm run dev`.
2. **Terminal 2 (Python AI Service):** Navigate to `ai-service/`, activate the virtual environment (`venv\Scripts\activate` on Windows), and run `uvicorn main:app --reload --port 8000`.

Once both are running, the Node.js API can successfully communicate with the AI Microservice.

## API Documentation & Flow

### 1. Authentication (`/api/auth`)
- `POST /register`: Create a new user (Citizen, Admin, etc.)
- `POST /login`: Get JWT token

### 2. Problem Submission (`/api/problems`)
- `POST /`: Submit problem (supports `multipart/form-data` for files)
  - This automatically triggers the Python AI Microservice.
- `GET /nearby?lng=...&lat=...&radius=...`: Find problems via GIS.

### 3. AI & Duplicate Flow (Internal)
When a problem is submitted:
1. Node sends description to Python (`/analyze`).
2. Python classifies category, severity, expertise.
3. Node queries GIS for nearby problems.
4. Node sends candidate problems to Python (`/duplicate-check`).
5. Final duplicate score is calculated.

### 4. Matching (`/api/universities`, `/api/industry`)
- `GET /api/universities/match/:problemId`: Recommend universities based on AI expertise array.
- `GET /api/industry/match/:problemId`: Recommend industries based on AI expertise array.

### 5. Teams & Projects (`/api/teams`, `/api/projects`)
- `GET /api/teams/recommend/:problemId`: Recommend capable teams.
- `POST /api/teams/assign`: Admin assigns team. Automatically creates a Project.
- `POST /api/projects/:id/milestones`: Update/track milestones.

### 6. Dashboard (`/api/dashboard`)
- `GET /overview`, `/categories`, `/districts`

## End-to-End Testing

To test this locally:
1. Create a `Citizen` user and an `Admin` user.
2. Login as `Citizen`, take the JWT.
3. Call `POST /api/problems` with JSON or form-data containing `title`, `description`, `longitude`, `latitude`.
4. Observe the DB: `category`, `severity`, `requiredExpertise`, and `duplicateScore` will be automatically populated.
5. Login as `Admin`.
6. Call `GET /api/teams/recommend/:problemId`
7. Call `POST /api/teams/assign` with `problemId` and `teamId`.
8. Track the created project via `/api/projects`.

Enjoy building the Societal Innovation Portal!
