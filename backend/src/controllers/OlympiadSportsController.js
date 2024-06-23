const School = require("../models/School");
const Sports = require("../models/Sports");
const SchoolUsers = require("../models/SchoolUsers");
const Olympiad = require("../models/Olympiad");
const OlympiadSports = require("../models/OlympiadSports");

// TODO: only managers can create sports in olympiads
class OlympiadSportsController {
  static async index(req, res) {
    const { userEmail } = req;
    const { id } = req.params;

    const userSchool = await SchoolUsers.findUserSchool({ email: userEmail });
    const olympiad = await Olympiad.findOlympiadById({ id });
    const olympiadSchool = olympiad[0].school;

    console.log(userSchool[0].school);
    console.log(olympiadSchool);

    if (userSchool[0].school !== olympiadSchool) {
      return res
        .status(400)
        .json({ ok: "You don't have permission to access this resource" });
    }

    const olympiadSports = await OlympiadSports.getOlympiadSports(olympiad[0]);
    return res.status(200).json(olympiadSports);
  }

  static async store(req, res) {
    const { olympiad, school, sport } = req.body;

    const schoolExists = await School.findSchool({ name: school });
    if (schoolExists.length <= 0) {
      return res.status(400).json({ ok: "Escola não existe." });
    }

    const olympiadExists = await Olympiad.findOlympiad({ name: olympiad });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olimpíada não existe." });
    }

    const sportExists = await Sports.findSport({ name: sport });
    if (sportExists.length <= 0) {
      return res.status(400).json({ ok: "Esporte não existe." });
    }

    const olympiadSportExists = await OlympiadSports.findOlympiadSport(
      req.body
    );
    if (olympiadSportExists.length > 0) {
      return res
        .status(400)
        .json({ ok: "Esporte já cadastrado na olimpíada." });
    }

    const insertionResult = await OlympiadSports.createNewOlympiadSport(
      req.body
    );
    return res
      .status(200)
      .json({ ok: "Esporte criado no evento da olimpíada" });
  }

  static async put(req, res) {
    const { olympiad, school, sport } = req.params;
    const { date_start } = req.body;

    const schoolExists = await School.findSchool({ name: school });
    if (schoolExists.length <= 0) {
      return res.status(400).json({ ok: "Escola não existe." });
    }

    const olympiadExists = await Olympiad.findOlympiad({ name: olympiad });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olimpíada não existe." });
    }

    const sportExists = await Sports.findSport({ name: sport });
    if (sportExists.length <= 0) {
      return res.status(400).json({ ok: "Esporte não existe." });
    }

    const olympiadSportExists = await OlympiadSports.findOlympiadSport(
      req.params
    );
    if (olympiadSportExists.length <= 0) {
      return res
        .status(400)
        .json({ ok: "Esporte não cadastrado na olimpíada." });
    }

    const updateResult = await OlympiadSports.updateOlympiadSport({
      olympiad,
      school,
      sport,
      date_start,
    });
    return res.status(200).json({ ok: "Informações atualizadas." });
  }

  static async delete(req, res) {
    const { olympiad, school, sport } = req.params;

    const schoolExists = await School.findSchool({ name: school });
    if (schoolExists.length <= 0) {
      return res.status(400).json({ ok: "Escola não existe." });
    }

    const olympiadExists = await Olympiad.findOlympiad({ name: olympiad });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olimpíada não existe." });
    }

    const sportExists = await Sports.findSport({ name: sport });
    if (sportExists.length <= 0) {
      return res.status(400).json({ ok: "Esporte não existe." });
    }

    const olympiadSportExists = await OlympiadSports.findOlympiadSport(
      req.params
    );
    if (olympiadSportExists.length <= 0) {
      return res
        .status(400)
        .json({ ok: "Esporte não cadastrado na olimpíada." });
    }

    const deletionResult = await OlympiadSports.deleteOlympiadSport(req.params);
    return res.status(200).json({ ok: "Esporte deletado da olimpíada." });
  }
}

module.exports = OlympiadSportsController;
