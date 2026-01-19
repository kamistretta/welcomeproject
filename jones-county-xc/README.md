# Jones County XC

A web application with a React frontend and Go backend.

## Project Structure

```
jones-county-xc/
├── frontend/    # React app (Vite + Tailwind CSS)
├── backend/     # Go HTTP server
└── docs/        # Documentation
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:5173

### Backend

```bash
cd backend
go run main.go
```

The API will be available at http://localhost:8080

## API Endpoints

- `GET /` - API info
- `GET /api/health` - Health check
