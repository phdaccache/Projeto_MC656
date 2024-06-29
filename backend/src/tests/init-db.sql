DROP TABLE IF EXISTS UserOlympiadSports;
DROP TABLE IF EXISTS SchoolUsers;
DROP TABLE IF EXISTS OlympiadUsers;
DROP TABLE IF EXISTS OlympiadSports;
DROP TABLE IF EXISTS Olympiad;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Sports;

CREATE TABLE Users (
    name varchar,
    birth_date date,
    email varchar,
    password varchar,
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
    participants INT,
    id SERIAL,

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

CREATE TABLE Sports (
    name VARCHAR,
    min_players INT,
    max_players INT,
    duration INTERVAL,
    ruleset VARCHAR,
    extra_info VARCHAR,

    PRIMARY KEY (name)
);

CREATE TABLE OlympiadSports (
    olympiad VARCHAR,
    school VARCHAR,
    sport VARCHAR,
    date_start DATE,
    participants INT,

    PRIMARY KEY (olympiad, school, sport),
    FOREIGN KEY (olympiad, school)
        REFERENCES Olympiad (name, school),
    FOREIGN KEY (sport)
        REFERENCES Sports (name)
);

CREATE TABLE UserOlympiadSports (
    olympiad VARCHAR,
    school VARCHAR,
    sport VARCHAR,
    email VARCHAR,
    preference BOOLEAN,

    PRIMARY KEY (olympiad, school, sport, email),
    FOREIGN KEY (olympiad, school, sport)
        REFERENCES OlympiadSports (olympiad, school, sport),
    FOREIGN KEY (email)
        REFERENCES Users (email)
);

-- Default user to manage the schools
INSERT INTO Users (name, email)
            VALUES ('Manager', 'schoolmanager@gmail.com');

INSERT INTO Users (name, email)
            VALUES ('Student', 'student@gmail.com');

INSERT INTO Users (name, email)
            VALUES ('Student', 'testuser@testing.com');

-- Default school
INSERT INTO School (name, manager)
            VALUES ('DefaultSchool', 'schoolmanager@gmail.com');

INSERT INTO SchoolUsers (school, email, permission)
            VALUES ('DefaultSchool', 'testuser@testing.com', 'Student');

-- Default olympiad
INSERT INTO Olympiad (name, school, date_start, date_end, description, participants)
            VALUES ('DefaultOlympiad', 'DefaultSchool', '2024-01-01', '2024-01-02', 'DefaultOlympiadDescription', 0);

-- Default sports
INSERT INTO Sports (name, min_players, max_players, duration, ruleset, extra_info)
            VALUES
            ('Corrida de 100m', 4, 10, '15M', 'Regras da IAAF', 'Evento de atletismo'),
            ('Tênis de Mesa', 2, 8, '1H30M', 'Regras da ITTF', 'Esporte de raquete indoor'),
            ('Natação 100m livre', 2, 6, '20M', 'Regras da FINA', 'Evento de natação em piscina'),
            ('Esgrima', 2, 8, '1H', 'Regras da FIE', 'Esporte de combate com espadas');

INSERT INTO Sports (name, min_players, max_players, duration, ruleset, extra_info)
            VALUES ('Athletics', 1, 1, '30M', 'DefaultRuleset', 'DefaultExtraInfo');

INSERT INTO Sports (name, min_players, max_players, duration, ruleset, extra_info)
            VALUES ('Default Sport', 1, 1, '60M', 'DefaultRuleset', 'DefaultExtraInfo');

-- Default olympiad sport
INSERT INTO OlympiadSports (olympiad, school, sport, date_start, participants)
            VALUES ('DefaultOlympiad', 'DefaultSchool', 'Default Sport', '2024-01-01', 0);
