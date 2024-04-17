const express = require("express");

const server = express();


const { Client } = require('pg');

const client = new Client({
    user: 'backend_user',
    host: 'localhost',
    database: 'olimpiada',
    password: 'S3cret',
    port: 5432,
});

client.connect();

server.listen(3000);