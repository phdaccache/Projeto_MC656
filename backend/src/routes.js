const express = require("express");
const OlympiadController = require('./controllers/OlympiadController');

const routes = express.Router();

// Alterar para controller
const dbClient = require("./lib/dbConnection");
routes.get("/list_users", async (req, res) => {
    const client = await dbClient.connect();
    const query = `
        SELECT * FROM users;
    `;
    await client.query(query, async (err, resp) => {
        if (err) {
            console.error(err);
            await client.release(true);
            return res.send("Internal error").status(500);
        }
        console.log(resp.rows);
        await client.release(true);
        return res.send(resp.rows).status(200);
    });
});

routes.get("/", (req, res) => {
    return res.send("Bem vindo a plataforma de olimpiadas!\n").status(200);
});


/*
======================= OLIMPÍADAS =======================
*/
routes.get('/list_olympiad', OlympiadController.index);
routes.post('/insert_olympiad/:name/:date_start/:date_end/:school/:description', OlympiadController.store);

module.exports = routes;
