const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const OlympiadController = require("./controllers/OlympiadController");
const UserController = require("./controllers/UserController");
const SchoolController = require("./controllers/SchoolController");
const SchoolUsersController = require("./controllers/SchoolUsersController");
const OlympiadUsersController = require("./controllers/OlympiadUsersController");
const SportsController = require("./controllers/SportsController");
const OlympiadSportsController = require("./controllers/OlympiadSportsController");
const UserOlympiadSportsController = require("./controllers/UserOlympiadSportsController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res
    .json({ ok: "Bem vindo a plataforma de olimpiadas!\n" })
    .status(200);
});

/*
======================= OLIMPÍADAS =======================
*/
routes.get("/olympiad", authMiddleware, OlympiadController.index);
routes.post("/olympiad", OlympiadController.store);

/*
======================= USUÁRIOS =======================
*/
routes.get("/list_user", authMiddleware, UserController.index);
routes.post("/insert_user", UserController.store);
routes.post("/login", UserController.login);

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
routes.get("/olympiadsports/:id", OlympiadSportsController.index);
routes.post("/olympiadsports", OlympiadSportsController.store);
routes.put(
  "/olympiadsports/:olympiad/:school/:sport",
  OlympiadSportsController.put
);
routes.delete(
  "/olympiadsports/:olympiad/:school/:sport",
  OlympiadSportsController.delete
);

/*
======================= USER PREFERENCE FOR OLYMPIAD SPORTS =======================
*/
routes.post("/userolympiadsports", UserOlympiadSportsController.store);
routes.put(
  "/userolympiadsports/:olympiad/:school/:sport/:email",
  UserOlympiadSportsController.update
);

module.exports = routes;
