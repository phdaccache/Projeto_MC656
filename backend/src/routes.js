const express = require("express");
const OlympiadController = require('./controllers/OlympiadController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({ok : "Bem vindo a plataforma de olimpiadas!\n"}).status(200);
})

/*
======================= OLIMPÍADAS =======================
*/
routes.get('/list_olympiad', OlympiadController.index);
routes.post('/insert_olympiad', OlympiadController.store);

/*
======================= USUÁRIOS =======================
*/
routes.get("/list_user", UserController.index);
routes.post("/insert_user", UserController.store);


module.exports = routes;

