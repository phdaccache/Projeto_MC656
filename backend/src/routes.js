const express = require("express");
const OlympiadController = require('./controllers/OlympiadController');

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({ok : "Bem vindo a plataforma de olimpiadas!\n"}).status(200);
})

/*
======================= OLIMPÍADAS =======================
*/
routes.get('/list_olympiad', OlympiadController.index);
routes.post('/insert_olympiad', OlympiadController.store);


module.exports = routes;

