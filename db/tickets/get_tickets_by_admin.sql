SELECT t.ticket_id, t.title, t.description, t.copmlete, u.name FROM tickets t
JOIN users u ON t.employee = u.user_id
WHERE u.company_id = $1;