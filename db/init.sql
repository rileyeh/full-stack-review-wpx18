CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR(80),
    email VARCHAR(50), 
    password VARCHAR,
    is_admin BOOLEAN, 
    company_id VARCHAR
);

CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY, 
    title VARCHAR(50),
    description VARCHAR(500), 
    complete BOOLEAN, 
    employee INT REFERENCES users(user_id)
); 

INSERT INTO users (name, email, password, is_admin, company_id)
VALUES ('admin', 'admin', '123', true, '50fd7240-1a16-4697-91b9-1e175b9addce'),
('emily', 'emily', '123', false, '50fd7240-1a16-4697-91b9-1e175b9addce');

INSERT INTO tickets (title, description, complete, employee)
VALUES ('kitten in a tree', 'there''s a kitten stuck in a tree at the morris residence 123 Main St, Phoenix, AZ', false, 2);