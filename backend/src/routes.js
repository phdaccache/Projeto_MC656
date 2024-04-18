const express = require("express");

const routes = express.Router();


const { Client } = require('pg');

routes.get("/list_users", async (req, res) => {
    const client = new Client({
        user: 'backend_user',
        host: 'localhost',
        database: 'olimpiada',
        password: 'S3cret',
        port: 5432,
    });

    client.connect();

    const query = `
        SELECT * FROM users;
    `;

    await client.query(query, async (err, resp) => {
        if (err) {
            console.error(err);
            return res.send("Internal error").status(500);
        }
        console.log(resp.rows);
        await client.end();
        return res.send(resp.rows).status(200);
    });
});

routes.get("/", (req, res) => {
    return res.send("Bem vindo a plataforma de olimpiadas!\n").status(200);
})

module.exports = routes;