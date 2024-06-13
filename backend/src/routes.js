const express = require("express");
const OlympiadController = require("./controllers/OlympiadController");
const UserController = require("./controllers/UserController");
const SchoolController = require("./controllers/SchoolController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res
    .json({ ok: "Bem vindo a plataforma de olimpiadas!\n" })
    .status(200);
});

/*
======================= OLIMPÍADAS =======================
*/
routes.get("/list_olympiad", OlympiadController.index);
routes.post("/insert_olympiad", OlympiadController.store);

/*
======================= USUÁRIOS =======================
*/
routes.get("/list_user", UserController.index);
routes.post("/insert_user", UserController.store);

/*
======================= SCHOOLS =======================
*/
routes.post("/school", SchoolController.store);

module.exports = routes;
