const { Pool } = require("pg");

const dbClient = new Pool({
    user: 'backend_user',
    host: '127.0.0.1',
    database: 'olimpiada',
    password: 'S3cret',
    port: 5432,
});

// Error handler
dbClient.on("error", (err, client) => {
    console.error("Error:", err);
});

const createTables = async () => {
    const queryUsersTable = `
        DROP TABLE IF EXISTS USERS;
        CREATE TABLE USERS (
            name VARCHAR,
            birth_date DATE,
            email VARCHAR,
            school VARCHAR,
            gender VARCHAR,
            phone_number VARCHAR
        );
    `;
    const client = await dbClient.connect();
    await client.query(queryUsersTable);
    // console.log("Table users created");
    // Create other tables here ...
    await client.release(true);
}

// Create tables
createTables();

// Export the client
module.exports = dbClient;
