UPDATE tickets
SET complete = ${complete}
WHERE ticket_id = ${id};

SELECT * FROM tickets
WHERE employee = ${user_id};