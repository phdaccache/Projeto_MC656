DROP TABLE IF EXISTS users;

CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);

DROP TABLE IF EXISTS olympiad;

CREATE TABLE olympiad (
    name VARCHAR,
    date_start DATE,
    date_end DATE,
    school VARCHAR,
    description VARCHAR
);