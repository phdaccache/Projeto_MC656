const express = require("express");

const routes = express.Router();

const dbClient = require("./lib/dbConnection");

routes.get("/list_users", async (req, res) => {    
    const query = `
        SELECT * FROM users;
    `;    
    const client = await dbClient.connect();
    await client.query(query, async (err, resp) => {
        if (err) {
            console.error(err);
            return res.send("Internal error").status(500);
        }
        console.log(resp.rows);                       
        return res.send(resp.rows).status(200);
    });    
    await client.release(true);
});

routes.get("/", (req, res) => {
    return res.send("Bem vindo a plataforma de olimpiadas!\n").status(200);
})

module.exports = routes;