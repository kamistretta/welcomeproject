# Paintingz By Kat

## What This Project Does

An artist portfolio and commission management platform for Kat. Visitors browse a gallery of paintings filtered by style, view individual painting details, and submit commission requests. An admin can manage paintings and commissions via the API.

**Live site:** katsreallycoolwebproject.online

## Folder Structure

```
katz-paintings/
├── frontend/          # React SPA (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── pages/          # Route-level page components
│   │   ├── components/     # Shared UI components
│   │   │   └── ui/         # Primitives (Button, Select)
│   │   ├── context/        # AuthContext for session auth
│   │   ├── lib/            # Utilities (cn helper)
│   │   ├── index.css       # Tailwind theme + custom utilities
│   │   ├── App.jsx         # Router and layout
│   │   └── main.jsx        # Entry point
│   └── package.json
├── backend/
│   ├── main.go             # Gin server with all route handlers
│   ├── sql/
│   │   ├── schema.sql      # MySQL table definitions
│   │   └── queries.sql     # SQL queries for sqlc
│   ├── db/
│   │   ├── models.go       # Generated Go structs
│   │   └── queries.sql.go  # Generated query functions
│   ├── sqlc.yaml           # sqlc configuration
│   └── go.mod
├── docs/                   # Project documentation
├── CLAUDE.md               # This file
└── README.md
```

## Running Locally

### Frontend
```bash
cd katz-paintings/frontend
npm install
npm run dev
# Runs at http://localhost:5173
# API calls proxy to katsreallycoolwebproject.online (see vite.config.js)
```

### Backend
```bash
cd katz-paintings/backend
go run main.go
# Runs at http://localhost:8080
# Requires MySQL with database jones_county_xc
# Connection: xc_app:xc_password@tcp(localhost:3306)/jones_county_xc
```

## Architectural Decisions

- **sqlc for database access:** All SQL queries are written in `sql/queries.sql` and code-generated into type-safe Go functions. Run `sqlc generate` after modifying queries.
- **Vite proxy for API calls:** The frontend dev server proxies `/api/*` to the production backend. No CORS issues during development.
- **Tailwind custom theme:** Colors (ink, coral, neon-*) and fonts (Bungee Shade, Inter) are defined in `index.css` using `@theme` blocks. The design is intentionally dark and vibrant to match the artist's style.
- **TanStack React Query:** Server state (paintings, commissions) is managed with React Query for caching, loading states, and error handling.
- **Session storage auth:** Login state is stored in `sessionStorage` via `AuthContext`. This is client-side only; the backend does not enforce auth on admin routes yet.
- **GitHub Actions deployment:** Pushing to `master` triggers automated build and deploy to AWS Lightsail. Frontend goes to `/var/www/html/`, backend runs as a systemd service.

## Key Commands

- `npm run build` -- Build frontend for production (output in `dist/`)
- `sqlc generate` -- Regenerate Go code from SQL queries (run from `backend/`)
- `go build -o server main.go` -- Build backend binary (run from `backend/`)
