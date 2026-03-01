# Project Proposal: Paintingz By Kat

## Overview

**Paintingz By Kat** is a full-stack artist portfolio and commission management platform. The site showcases paintings across multiple styles and allows visitors to browse the gallery, view individual works, and submit commission requests. An admin login provides authenticated access for managing paintings and commissions.

**Live domain:** katsreallycoolwebproject.online

---

## Problem Statement

Artists need a dedicated platform to showcase their work and manage commission requests. Generic portfolio builders lack the personality and custom features an artist needs — style-based filtering, commission intake with reference image support, and a visual identity that matches the art itself. This project provides a bespoke solution built around the artist's brand.

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

## Future Considerations

- Image upload support (S3 or equivalent) for paintings and reference images
- Backend authentication with JWT or session middleware on protected routes
- Admin dashboard page for managing paintings and reviewing commissions
- Payment integration for direct painting purchases
- Email notifications when new commissions are submitted
