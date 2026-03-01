# Paintingz By Kat

A full-stack artist portfolio and commission platform. Browse paintings across multiple styles, view details and pricing, and submit custom commission requests.

**Live site:** [katsreallycoolwebproject.online](https://katsreallycoolwebproject.online)

## Features

- Filterable gallery (Nature, Pop Art, Trippy, Graphic, Animal Portrait)
- Individual painting pages with medium, size, and price
- Featured paintings on the homepage
- Commission request form with style selection and special requests
- About page with artist bio and social links
- Mobile-responsive with neon psychedelic dark theme

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router, TanStack Query |
| Backend | Go, Gin, sqlc |
| Database | MySQL |
| Hosting | AWS Lightsail, GitHub Actions CI/CD |

## Project Structure

```
jones-county-xc/
├── frontend/    # React SPA
├── backend/     # Go REST API
└── docs/        # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 20+
- Go 1.21+
- MySQL

### Frontend

```bash
cd jones-county-xc/frontend
npm install
npm run dev
```

The app runs at http://localhost:5173. API calls are proxied to the production backend.

### Backend

```bash
cd jones-county-xc/backend
go run main.go
```

The API runs at http://localhost:8080. Requires a MySQL database named `jones_county_xc` with the schema from `backend/sql/schema.sql`.

### Database Setup

```bash
mysql -u root -p -e "CREATE DATABASE jones_county_xc;"
mysql -u root -p jones_county_xc < jones-county-xc/backend/sql/schema.sql
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/paintings` | List paintings (optional `?style=` filter) |
| GET | `/api/paintings/featured` | Featured paintings |
| GET | `/api/paintings/:id` | Single painting |
| POST | `/api/commissions` | Submit a commission request |
| GET | `/health` | Health check |

## Deployment

Pushing to `master` triggers GitHub Actions to build and deploy to AWS Lightsail automatically.

## Documentation

See the [`docs/`](docs/) folder for detailed documentation:
- [Project Proposal](docs/project-proposal.md)
- [Architecture](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
