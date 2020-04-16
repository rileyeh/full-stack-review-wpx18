INSERT INTO tickets (title, description, complete, employee)
VALUES (${title}, ${description}, 'false', ${employee});

SELECT t.ticket_id, t.title, t.description, t.complete, u.name FROM tickets t
JOIN users u ON t.employee = u.user_id
WHERE u.company_id = ${company_id};