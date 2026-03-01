# Database Schema

**Database:** MySQL
**Name:** `jones_county_xc`
**Code generation:** sqlc (config in `backend/sqlc.yaml`)

## Tables

### paintings

Stores all artwork in the gallery.

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| title | VARCHAR(150) | NOT NULL | Painting title |
| description | TEXT | | Detailed description of the piece |
| style | VARCHAR(50) | NOT NULL | Art style category |
| medium | VARCHAR(100) | | Materials used (e.g. "Acrylic on Canvas") |
| image_url | VARCHAR(500) | NOT NULL | URL to the painting image |
| size | VARCHAR(50) | | Dimensions (e.g. "24x36") |
| price | DECIMAL(10,2) | | Price in USD |
| featured | BOOLEAN | DEFAULT FALSE | Whether to display on the homepage |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the record was created |

**Style values:** Nature, Pop Art, Trippy, Graphic, Animal Portrait

### commission_requests

Stores commission submissions from potential clients.

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| name | VARCHAR(100) | NOT NULL | Client's name |
| email | VARCHAR(150) | NOT NULL | Client's email address |
| phone | VARCHAR(20) | | Client's phone number (optional) |
| style | VARCHAR(50) | NOT NULL | Requested art style |
| description | TEXT | NOT NULL | Description of the requested piece |
| special_requests | TEXT | | Additional notes or requirements |
| status | VARCHAR(20) | DEFAULT 'new' | Workflow status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the request was submitted |

**Status values:** new, in-progress, completed

### reference_images

Stores reference images attached to commission requests.

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| commission_id | INT | NOT NULL, FOREIGN KEY | References commission_requests.id |
| image_url | VARCHAR(500) | NOT NULL | URL to the reference image |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the image was attached |

## Relationships

```
paintings (standalone)

commission_requests  1 --- * reference_images
                     (commission_id FK)
```

- A **commission_request** can have zero or many **reference_images**
- A **reference_image** belongs to exactly one **commission_request**
- **paintings** is independent with no foreign key relationships

## SQL Files

| File | Purpose |
|---|---|
| `backend/sql/schema.sql` | CREATE TABLE statements |
| `backend/sql/queries.sql` | Named queries used by sqlc |
| `backend/db/models.go` | Generated Go structs (Painting, CommissionRequest, ReferenceImage) |
| `backend/db/queries.sql.go` | Generated Go functions for each query |

## Regenerating Code

After modifying `schema.sql` or `queries.sql`:

```bash
cd jones-county-xc/backend
sqlc generate
```

This regenerates `db/models.go` and `db/queries.sql.go`.
