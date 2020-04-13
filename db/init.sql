CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR(80),
    email VARCHAR(50), 
    password VARCHAR,
    is_admin BOOLEAN, 
    company_id VARCHAR
);