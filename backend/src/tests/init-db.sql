DROP TABLE IF EXISTS SchoolUsers;
DROP TABLE IF EXISTS Olympiad;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    name varchar,
    birth_date date,
    email varchar,
    gender varchar,
    phone_number varchar,

    PRIMARY KEY (email)
);

CREATE TABLE School (
    name VARCHAR,
    manager VARCHAR,

    PRIMARY KEY (name),
    FOREIGN KEY (manager)
        REFERENCES users (email)
);

CREATE TABLE Olympiad (
    name VARCHAR,
    school VARCHAR,
    date_start DATE,
    date_end DATE,
    description VARCHAR,

    PRIMARY KEY (name, school),
    FOREIGN KEY (school)
        REFERENCES School (name)
);

CREATE TABLE SchoolUsers (
    school VARCHAR,
    email VARCHAR,
    permission VARCHAR,

    PRIMARY KEY (school, email),
    FOREIGN KEY (school)
        REFERENCES School (name),
    FOREIGN KEY (email)
        REFERENCES Users (email)
);

-- Default user to manage the schools
INSERT INTO Users (name, email)
            VALUES ('Manager', 'schoolmanager@gmail.com');

-- Default school
INSERT INTO School (name, manager)
            VALUES ('DefaultSchool', 'schoolmanager@gmail.com');
