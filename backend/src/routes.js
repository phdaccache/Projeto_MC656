const express = require("express");
const UserController = require("./controllers/UserController");

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({ok : "Bem vindo a plataforma de olimpiadas!\n"}).status(200);
})

/*
======================= USUÁRIOS =======================
*/
routes.get("/list_user", UserController.index);
routes.post("/insert_user", UserController.store);

module.exports = routes;

