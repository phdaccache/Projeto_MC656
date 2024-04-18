const { Client } = require("pg");

const dbClient = new Client({
    user: 'backend_user',
    host: 'localhost',
    database: 'olimpiada',
    password: 'S3cret',
    port: 5432,
});

dbClient.connect();

const errorHandler = (err, res) => {
    if (err) {
        console.error(err);
        // @TODO dbClient.end() (async)            
        return;
    }
}

const createTables = async () => {
    const usersTable = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        email varchar,
        firstName varchar,
        lastName varchar,
        age int
    );
    `;
    await dbClient.query(usersTable, errorHandler);
    console.log("Table users created");
    // Create other tables here ...
}

// Create tables
createTables();

// Export the client
module.exports = dbClient;
