CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    nationality varchar(50) NOT NULL,
    preferred_foot varchar(10) NOT NULL,
    date_of_birth varchar(10) NOT NULL,
    created_at date NOT NULL
);