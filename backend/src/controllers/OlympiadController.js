const Olympiad = require("../models/Olympiad");
const SchoolUsers = require("../models/SchoolUsers");
const DateChecks = require("../lib/DateChecks");

class OlympiadController {
  static async index(req, res) {
    const school = await SchoolUsers.findUserSchool({
      email: req.userEmail,
    });

    const olympiadList = await Olympiad.listOlympiadsBySchool(school);
    return res.status(200).json({ olympiadList });
  }

  static async store(req, res) {
    const olympiadExists = await Olympiad.findOlympiad(req.body);
    if (olympiadExists.length > 0) {
      return res.status(400).json({ ok: "Olimpíada já cadastrada." });
    }

    const { date_end } = req.body;

    if (DateChecks.isBeforeToday(date_end)) {
      return res.status(400).json({
        ok: "Data de término da olimpíada não pode ser antes de hoje.",
      });
    }

    if (DateChecks.isMoreThan1Year(date_end)) {
      return res.status(400).json({
        ok: "Data de término da olimpíada não pode ser mais de um ano a partir de hoje.",
      });
    }

    const insertionResult = await Olympiad.createOlympiad(req.body);
    return res.status(200).json({ ok: "Olimpíada criada" });
  }
}

module.exports = OlympiadController;
