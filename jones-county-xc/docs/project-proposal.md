# Project Proposal: Paintingz By Kat

## Overview

**Target Audience:** Art collectors, casual art fans, and potential commission clients looking for custom paintings in styles ranging from nature scenes to pop art and trippy/psychedelic works.

**Problem:** Artists need a dedicated platform to showcase their work and manage commission requests. Generic portfolio builders lack the personality and custom features an artist needs -- style-based filtering, commission intake with reference image support, and a visual identity that matches the art itself.

**Value Proposition:** My app helps art enthusiasts and potential buyers to discover and commission custom artwork by providing a visually striking, filterable gallery and a structured commission intake system that reflects the artist's unique brand.

**Live domain:** katsreallycoolwebproject.online

---

## Feature Scope

### Must-Have (MVP)
1. Public gallery with paintings displayed as cards
2. Style-based filtering (Nature, Pop Art, Trippy, Graphic, Animal Portrait)
3. Individual painting detail pages with medium, size, and price
4. Featured paintings section on the homepage
5. Commission request form with style selection and description
6. About page with artist biography
7. Responsive mobile layout
8. Admin login for managing content

### Deferred
- Image upload to S3 (currently using URL references)
- Backend-enforced authentication middleware on admin routes
- Admin dashboard UI for managing paintings and reviewing commissions
- Payment integration for direct purchases
- Email notifications on new commission submissions
- Password reset flow

---

## Goals

1. Present the artist's paintings in a visually striking, filterable gallery
2. Allow visitors to view detailed information about individual paintings (medium, size, price)
3. Accept commission requests through a structured intake form
4. Provide admin tools for managing paintings and commission status
5. Reflect the artist's aesthetic through a bold, neon-on-dark visual design

---

## Architecture

```
Frontend (React SPA)          Backend (Go REST API)          Database (MySQL)
+-----------------+           +------------------+           +----------------+
| Vite + React 19 |  /api/*   | Gin HTTP Server  |  sqlc     | paintings      |
| Tailwind CSS    | --------> | CORS enabled     | --------> | commissions    |
| React Router    |  JSON     | REST endpoints   |  queries  | reference_imgs |
| TanStack Query  |           |                  |           |                |
+-----------------+           +------------------+           +----------------+
```

**Deployment:** AWS Lightsail with GitHub Actions CI/CD. Frontend static files served from `/var/www/html/`, backend runs as a systemd service.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool and dev server |
| React Router DOM 7 | Client-side routing |
| TanStack React Query 5 | Server state management and caching |
| Tailwind CSS 4 | Utility-first styling |
| Radix UI | Accessible select primitives |
| Lucide React | Icon library |
| class-variance-authority | Component variant styling |

### Backend
| Technology | Purpose |
|---|---|
| Go 1.25 | Server language |
| Gin | HTTP web framework |
| sqlc | Type-safe SQL code generation |
| go-sql-driver/mysql | MySQL driver |

### Infrastructure
| Technology | Purpose |
|---|---|
| AWS Lightsail | Hosting |
| GitHub Actions | CI/CD pipeline |
| MySQL | Relational database |
| systemd | Backend process management |

---

## Database Design

### paintings
| Column | Type | Description |
|---|---|---|
| id | INT (PK, AUTO_INCREMENT) | Unique identifier |
| title | VARCHAR(150) NOT NULL | Painting title |
| description | TEXT | Detailed description |
| style | VARCHAR(50) NOT NULL | Art style (Nature, Pop Art, Trippy, Graphic, Animal Portrait) |
| medium | VARCHAR(100) | Materials used (e.g. "Acrylic on Canvas") |
| image_url | VARCHAR(500) NOT NULL | URL to painting image |
| size | VARCHAR(50) | Dimensions (e.g. "24x36") |
| price | DECIMAL(10,2) | Price in USD |
| featured | BOOLEAN DEFAULT FALSE | Whether to show on homepage |
| created_at | TIMESTAMP | Auto-generated creation time |

### commission_requests
| Column | Type | Description |
|---|---|---|
| id | INT (PK, AUTO_INCREMENT) | Unique identifier |
| name | VARCHAR(100) NOT NULL | Client name |
| email | VARCHAR(150) NOT NULL | Client email |
| phone | VARCHAR(20) | Client phone (optional) |
| style | VARCHAR(50) NOT NULL | Requested art style |
| description | TEXT NOT NULL | Description of the requested piece |
| special_requests | TEXT | Additional notes or requirements |
| status | VARCHAR(20) DEFAULT 'new' | Workflow status (new, in-progress, completed) |
| created_at | TIMESTAMP | Auto-generated creation time |

### reference_images
| Column | Type | Description |
|---|---|---|
| id | INT (PK, AUTO_INCREMENT) | Unique identifier |
| commission_id | INT (FK) NOT NULL | Links to commission_requests.id |
| image_url | VARCHAR(500) NOT NULL | URL to reference image |
| created_at | TIMESTAMP | Auto-generated creation time |

---

## API Endpoints

### Public Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/api/paintings` | List all paintings (supports `?style=` filter) |
| GET | `/api/paintings/featured` | List featured paintings for homepage |
| GET | `/api/paintings/:id` | Get a single painting by ID |
| POST | `/api/commissions` | Submit a new commission request |

### Admin Endpoints
| Method | Path | Description |
|---|---|---|
| POST | `/api/paintings` | Create a new painting entry |
| DELETE | `/api/paintings/:id` | Remove a painting |
| GET | `/api/commissions` | List all commission requests |
| PUT | `/api/commissions/:id` | Update commission status |
| POST | `/api/commissions/:id/images` | Attach a reference image |

### Utility Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/` | API info / health message |
| GET | `/health` | Health check |

---

## Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Hero section with animated headline + grid of featured paintings |
| `/gallery` | GalleryPage | Full painting catalog with style dropdown filter |
| `/gallery/:id` | PaintingDetailPage | Single painting view with title, description, medium, size, and price |
| `/commission` | CommissionPage | Intake form for commission requests with confirmation feedback |
| `/about` | AboutPage | Artist biography and social media links |
| `/login` | LoginPage | Session-based admin login |

---

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

- **Navbar** is persistent across all pages with links to Home, Gallery, About, Commission, and Login
- **Home** displays featured paintings; clicking a card navigates to `/gallery/:id`
- **Gallery** lists all paintings with style filter; clicking a card navigates to `/gallery/:id`
- **Commission** is a standalone form; submitting shows a confirmation message
- **Login** sets session auth state; logged-in users see their name in the Navbar
- **Footer** is persistent with branding and Instagram link

---

## Component Architecture

```
App.jsx
  +-- Navbar (sticky, responsive with mobile hamburger menu)
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
  +-- Footer (branding + social link)
```

### Shared Components
- **PaintingCard** -- Gallery card with hover scale effect; displays image, title, style badge, and price
- **LoadingSpinner** -- Animated dual-ring spinner with configurable message
- **ErrorMessage** -- Error display with retry callback
- **Button** -- CVA-based button with 7 variants (default, destructive, outline, secondary, ghost, link, coral)
- **Select** -- Radix UI-backed dropdown with custom neon styling

---

## Visual Design

### Theme: Neon Psychedelic Dark

The design mirrors the artist's trippy, vibrant art style with a dark purple-black background and electric neon accents.

### Color Palette
- **Ink** (backgrounds): Deep purple-blacks (`#0F0820` through `#F3E5F5`)
- **Coral** (primary accent): Pink/magenta range for buttons and highlights
- **Neon Cyan**: `#00FFFF` -- links, glows, borders
- **Neon Lime**: `#CCFF00` -- secondary highlights
- **Neon Orange**: `#FF6600` -- tertiary accent
- **Neon Pink**: `#FF10F0` -- text glow, emphasis
- **Neon Green**: `#39FF14` -- status indicators

### Typography
- **Headings**: Bungee Shade (bold display font with built-in shadow)
- **Body**: Inter (clean sans-serif for readability)

### Effects
- `text-rainbow` -- Animated gradient text for hero headlines
- `text-glow-pink/cyan/lime` -- Neon text shadow effects
- `box-glow-pink/cyan` -- Neon box shadow effects
- `bg-gradient-animated` -- Slowly shifting background gradient

---

## Deployment Pipeline

```
Push to master
      |
      v
GitHub Actions Workflow
      |
      +-- Checkout code
      +-- Setup Node.js 20
      +-- npm ci && npm run build (frontend)
      +-- SSH into AWS Lightsail
      +-- Deploy frontend -> /var/www/html/
      +-- Deploy backend  -> /home/ubuntu/backend/
      +-- go build -o server main.go
      +-- sudo systemctl restart jones-county-xc
```

---

## Key Features

1. **Filterable Gallery** -- Browse all paintings; filter by style (Nature, Pop Art, Trippy, Graphic, Animal Portrait)
2. **Featured Paintings** -- Curated selection displayed on the homepage hero section
3. **Painting Detail Pages** -- Full metadata view including medium, dimensions, and pricing
4. **Commission Intake** -- Structured form with style selection, description, and special requests fields; confirmation message (2-3 business day response time)
5. **Reference Image Support** -- Database-backed ability to attach reference images to commissions
6. **Responsive Layout** -- Mobile-first design with hamburger navigation and responsive grids
7. **Accessible UI** -- ARIA labels, semantic HTML, keyboard navigation, Radix UI primitives
8. **Optimistic Loading** -- TanStack Query provides caching, background refetching, and loading/error states
9. **Session Auth** -- Client-side session storage authentication for admin access
10. **Automated Deployment** -- Push-to-deploy via GitHub Actions to AWS Lightsail

---

## AI Review Decisions

### Suggestion: Add backend authentication middleware on admin API routes
- **Decision:** Deferred
- **Reason:** The admin endpoints (POST/DELETE paintings, GET commissions) currently have no server-side auth guard. This is important for production but the client-side session auth is sufficient for the MVP. Backend auth will be added in a future iteration.

### Suggestion: Add input validation on the commission form API endpoint
- **Decision:** Accepted
- **Reason:** The POST `/api/commissions` endpoint should validate required fields (name, email, style, description) server-side, not just client-side. Without this, invalid data could be written to the database.

### Suggestion: Add pagination to GET /api/paintings
- **Decision:** Deferred
- **Reason:** The gallery is unlikely to exceed 50-100 paintings in the near term. Pagination adds complexity that is not needed for the current scale.

### Suggestion: Add a search/text filter to the gallery
- **Decision:** Rejected
- **Reason:** The style dropdown filter already provides the primary discovery mechanism. A text search adds scope without clear user need at this stage.

### Suggestion: Add image upload support instead of URL references
- **Decision:** Deferred
- **Reason:** S3 integration adds significant infrastructure complexity. URL-based image references work for the MVP since the artist can host images externally.

### Suggestion: Add email notifications when a commission is submitted
- **Decision:** Deferred
- **Reason:** Useful for the artist but requires configuring an email service (SES, SendGrid, etc.). The artist can check commissions via the admin API for now.

---

## Future Considerations

- Image upload support (S3 or equivalent) for paintings and reference images
- Backend authentication with JWT or session middleware on protected routes
- Admin dashboard page for managing paintings and reviewing commissions
- Payment integration for direct painting purchases
- Email notifications when new commissions are submitted
