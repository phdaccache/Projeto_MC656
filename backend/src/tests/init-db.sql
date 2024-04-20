DROP TABLE IF EXISTS users;

CREATE TABLE users (
    name varchar,
    birth_date date,
    email varchar,
    school varchar,
    gender varchar,
    phone_number varchar    
);

DROP TABLE IF EXISTS olympiad;

CREATE TABLE olympiad (
    name VARCHAR,
    date_start DATE,
    date_end DATE,
    school VARCHAR,
    description VARCHAR
);
