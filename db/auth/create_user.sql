INSERT INTO users (name, email, password, is_admin, company_id)
VALUES (${name}, ${email}, ${hash}, ${admin}, ${id})
RETURNING *;