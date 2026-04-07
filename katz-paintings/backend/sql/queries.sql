-- name: GetAllPaintings :many
SELECT * FROM paintings ORDER BY created_at DESC;

-- name: GetPaintingsByStyle :many
SELECT * FROM paintings WHERE style = ? ORDER BY created_at DESC;

-- name: GetFeaturedPaintings :many
SELECT * FROM paintings WHERE featured = TRUE ORDER BY created_at DESC;

-- name: GetPaintingByID :one
SELECT * FROM paintings WHERE id = ?;

-- name: CreatePainting :execresult
INSERT INTO paintings (title, description, style, medium, image_url, size, price, featured)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdatePainting :exec
UPDATE paintings SET title = ?, description = ?, style = ?, medium = ?, size = ? WHERE id = ?;

-- name: DeletePainting :exec
DELETE FROM paintings WHERE id = ?;

-- name: CreateCommission :execresult
INSERT INTO commission_requests (name, email, phone, style, description, special_requests)
VALUES (?, ?, ?, ?, ?, ?);

-- name: GetAllCommissions :many
SELECT * FROM commission_requests ORDER BY created_at DESC;

-- name: UpdateCommissionStatus :exec
UPDATE commission_requests SET status = ? WHERE id = ?;

-- name: CreateReferenceImage :execresult
INSERT INTO reference_images (commission_id, image_url)
VALUES (?, ?);

-- name: GetReferenceImagesByCommission :many
SELECT * FROM reference_images WHERE commission_id = ? ORDER BY created_at;
