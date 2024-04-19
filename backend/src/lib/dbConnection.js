const { Pool } = require("pg");

const dbClient = new Pool({
    user: 'backend_user',
    host: 'localhost',
    database: 'olimpiada',
    password: 'S3cret',
    port: 5432,
});

// Error handler
dbClient.on("error", (err, client) => {
    console.error("Error:", err);
});

const createTables = async () => {
    const client = await dbClient.connect();

    const queryUsersTable = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (
            email varchar,
            firstName varchar,
            lastName varchar,
            age int
        );
    `;
    await client.query(queryUsersTable);
    // console.log("Table users created");

    // Dados das olimpíadas
    const queryOlympiadsTable = `
        DROP TABLE IF EXISTS OLYMPIAD;
        CREATE TABLE OLYMPIAD (
            name VARCHAR,
            date_start DATE,
            date_end DATE,
            school VARCHAR,
            description VARCHAR
        );
    `;
    await client.query(queryOlympiadsTable);
    // console.log("Table olympiads created");

    // Create other tables here ...
    await client.release(true);
}

// Create tables
createTables();

// Export the client
module.exports = dbClient;
