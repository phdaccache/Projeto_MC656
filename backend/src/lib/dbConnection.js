const { Client } = require("pg");

const dbClient = new Client({
    user: 'backend_user',
    host: 'localhost',
    database: 'olimpiada',
    password: 'S3cret',
    port: 5432,
});

dbClient.connect();

// Export the client
module.exports = dbClient;
