DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    name varchar,
    birth_date date,
    email varchar,
    school varchar,
    gender varchar,
    phone_number varchar,

    PRIMARY KEY (email)
);

-- Default user to manage the schools
INSERT INTO users (name, email)
            VALUES ('Manager', 'schoolmanager@gmail.com');

DROP TABLE IF EXISTS olympiad;

CREATE TABLE olympiad (
    name VARCHAR,
    date_start DATE,
    date_end DATE,
    school VARCHAR,
    description VARCHAR
);

CREATE TABLE School (
    name VARCHAR,
    manager VARCHAR,

    PRIMARY KEY (name),
    FOREIGN KEY (manager)
        REFERENCES users (email)
);
