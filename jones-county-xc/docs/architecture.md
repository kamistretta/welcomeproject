# Architecture

## Pages

| Route | Page Component | Purpose |
|---|---|---|
| `/` | HomePage | Hero section with animated rainbow headline and a grid of featured paintings |
| `/gallery` | GalleryPage | Full painting catalog with a style dropdown filter (All, Nature, Pop Art, Trippy, Graphic, Animal Portrait) |
| `/gallery/:id` | PaintingDetailPage | Single painting view showing title, description, medium, size, and price |
| `/commission` | CommissionPage | Commission request form with fields for name, email, phone, style, description, and special requests |
| `/about` | AboutPage | Artist biography, photo, and social media links (@paintingzbykat) |
| `/login` | LoginPage | Session-based admin login form |

## Navigation Flow

```
                         +----------+
                         |  Navbar  |
                         +----+-----+
                              |
          +-------+-------+---+---+----------+--------+
          |       |       |       |          |        |
          v       v       v       v          v        v
       Home   Gallery   About  Commission  Login   Footer
        /    /gallery   /about /commission /login
        |       |
        |       v
        |   Gallery/:id
        |   (detail page)
        v
   Featured paintings
   (link to /gallery/:id)
```

- **Navbar** is persistent across all pages (sticky top). Links: Home, Gallery, About, Commission, Login. On mobile, collapses into a hamburger menu.
- **Home** displays featured paintings as PaintingCard components. Clicking a card links to `/gallery/:id`.
- **Gallery** shows all paintings with a style filter dropdown. Clicking a card links to `/gallery/:id`.
- **PaintingDetailPage** shows full details for one painting. Back navigation returns to the gallery.
- **Commission** is a standalone form. Submitting displays a confirmation message (2-3 business day response).
- **Login** sets session auth state. Logged-in users see their name in the Navbar.
- **Footer** is persistent at the bottom with branding and an Instagram link.

## Component Tree

```
App.jsx
  +-- Navbar (sticky, responsive, shows auth state)
  +-- <Routes>
  |     +-- HomePage
  |     |     +-- PaintingCard (featured grid)
  |     +-- GalleryPage
  |     |     +-- Select (style filter)
  |     |     +-- PaintingCard (full catalog)
  |     +-- PaintingDetailPage
  |     +-- CommissionPage
  |     +-- AboutPage
  |     +-- LoginPage
  +-- Footer (branding + Instagram link)
```

### Shared Components

| Component | Description |
|---|---|
| PaintingCard | Gallery card with hover scale effect. Displays image, title, style badge, and price. Links to detail page. |
| LoadingSpinner | Animated dual-ring spinner with configurable message text. |
| ErrorMessage | Error display with a retry button that triggers a callback. |
| Button | CVA-based button with variants: default, destructive, outline, secondary, ghost, link, coral. |
| Select | Radix UI-backed dropdown styled with neon theme colors. |

## API Design

### Public Endpoints

| Method | Path | Request | Response |
|---|---|---|---|
| GET | `/api/paintings` | Query: `?style=` (optional) | Array of painting objects |
| GET | `/api/paintings/featured` | -- | Array of featured painting objects |
| GET | `/api/paintings/:id` | Param: `id` | Single painting object |
| POST | `/api/commissions` | Body: `{name, email, phone?, style, description, special_requests?}` | Created commission object |

### Admin Endpoints

| Method | Path | Request | Response |
|---|---|---|---|
| POST | `/api/paintings` | Body: `{title, description?, style, medium?, image_url, size?, price?, featured?}` | Created painting object |
| DELETE | `/api/paintings/:id` | Param: `id` | Success message |
| GET | `/api/commissions` | -- | Array of commission objects |
| PUT | `/api/commissions/:id` | Body: `{status}` | Updated commission object |
| POST | `/api/commissions/:id/images` | Body: `{image_url}` | Created reference image object |

### Utility Endpoints

| Method | Path | Response |
|---|---|---|
| GET | `/` | `"Paintingz By Kat API"` |
| GET | `/health` | `{"status": "ok"}` |

## Data Flow

1. React components call `/api/*` endpoints using TanStack React Query
2. In development, Vite proxies `/api/*` requests to `katsreallycoolwebproject.online`
3. In production, the frontend is served as static files from the same server
4. The Gin backend handles requests and uses sqlc-generated functions to query MySQL
5. JSON responses are returned and cached by React Query

## Deployment Architecture

```
GitHub (push to master)
        |
        v
GitHub Actions Runner
        |
        +-- npm ci && npm run build (frontend)
        +-- GOOS=linux go build (backend)
        |
        v (SSH + SCP)
AWS Lightsail
        |
        +-- /var/www/html/        (frontend static files, served by web server)
        +-- /home/ubuntu/backend/ (Go binary, managed by systemd)
        +-- MySQL                 (database)
```
