-- name: GetAllAthletes :many
SELECT * FROM athletes ORDER BY name;

-- name: GetAthleteByID :one
SELECT * FROM athletes WHERE id = ?;

-- name: GetAllMeets :many
SELECT * FROM meets ORDER BY date;

-- name: GetResultsByMeetID :many
SELECT r.*, a.name as athlete_name
FROM results r
JOIN athletes a ON r.athlete_id = a.id
WHERE r.meet_id = ?
ORDER BY r.place;

-- name: CreateResult :execresult
INSERT INTO results (athlete_id, meet_id, time, place)
VALUES (?, ?, ?, ?);

-- name: GetTopTenFastestTimes :many
SELECT r.time, r.place, a.name as athlete_name, m.name as meet_name, m.date as meet_date
FROM results r
JOIN athletes a ON r.athlete_id = a.id
JOIN meets m ON r.meet_id = m.id
ORDER BY r.time ASC
LIMIT 10;
