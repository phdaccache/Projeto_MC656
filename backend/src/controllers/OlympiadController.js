const Olympiad = require("../models/Olympiad");

class OlympiadController {
  static async index(req, res) {
    const olympiadList = await Olympiad.listOlympiads();
    return res.status(200).json({ olympiadList });
  }

  static async store(req, res) {
    const olympiadExists = await Olympiad.findOlympiad(req.body);
    if (olympiadExists.length > 0) {
      return res.status(400).json({ ok: "Olimpíada já cadastrada." });
    }

    const insertionResult = await Olympiad.createOlympiad(req.body);
    return res.status(200).json({ ok: "Olimpíada criada" });
  }
}

module.exports = OlympiadController;
