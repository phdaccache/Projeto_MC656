DROP TABLE IF EXISTS SchoolUsers;
DROP TABLE IF EXISTS OlympiadUsers;
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

CREATE TABLE OlympiadUsers (
    olympiad VARCHAR,
    school VARCHAR,
    email VARCHAR,
    interested BOOLEAN,

    PRIMARY KEY (olympiad, school, email),
    FOREIGN KEY (olympiad, school)
        REFERENCES Olympiad (name, school),
    FOREIGN KEY (email)
        REFERENCES Users (email)
);

-- Default user to manage the schools
INSERT INTO Users (name, email)
            VALUES ('Manager', 'schoolmanager@gmail.com');

-- Default school
INSERT INTO School (name, manager)
            VALUES ('DefaultSchool', 'schoolmanager@gmail.com');

-- Default olympiad
INSERT INTO Olympiad (name, school, date_start, date_end, description)
            VALUES ('DefaultOlympiad', 'DefaultSchool', '2024-01-01', '2024-01-02', 'DefaultOlympiadDescription');
