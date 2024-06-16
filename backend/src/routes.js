const express = require("express");
const OlympiadController = require("./controllers/OlympiadController");
const UserController = require("./controllers/UserController");
const SchoolController = require("./controllers/SchoolController");
const SchoolUsersController = require("./controllers/SchoolUsersController");
const OlympiadUsersController = require("./controllers/OlympiadUsersController");
const SportsController = require("./controllers/SportsController");
const OlympiadSportsController = require("./controllers/OlympiadSportsController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res
    .json({ ok: "Bem vindo a plataforma de olimpiadas!\n" })
    .status(200);
});

/*
======================= OLIMPÍADAS =======================
*/
routes.get("/olympiad", OlympiadController.index);
routes.post("/olympiad", OlympiadController.store);

/*
======================= USUÁRIOS =======================
*/
routes.get("/list_user", UserController.index);
routes.post("/insert_user", UserController.store);

/*
======================= SCHOOLS =======================
*/
routes.post("/school", SchoolController.store);
routes.delete("/school/:id", SchoolController.delete);

/*
======================= SCHOOL USERS =======================
*/
routes.post("/schoolusers", SchoolUsersController.store);
routes.delete("/schoolusers/:id/", SchoolUsersController.delete);

/*
======================= OLYMPIAD USERS =======================
*/
routes.post("/olympiadusers", OlympiadUsersController.store);
routes.put("/olympiadusers", OlympiadUsersController.update);

/*
======================= SPORTS =======================
*/
routes.post("/sports", SportsController.store);
routes.put("/sports", SportsController.update);

/*
======================= OLYMPIAD SPORTS =======================
*/
routes.post("/olympiadsports", OlympiadSportsController.store);
routes.put(
  "/olympiadsports/:olympiad/:school/:sport",
  OlympiadSportsController.put
);
routes.delete(
  "/olympiadsports/:olympiad/:school/:sport",
  OlympiadSportsController.delete
);

module.exports = routes;
