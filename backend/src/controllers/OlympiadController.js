const Olympiad = require("../models/Olympiad");

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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

    const today = new Date();

    const { date_end } = req.body;
    if (date_end < formatDate(today)) {
      return res.status(400).json({
        ok: "Data de término da olimpíada não pode ser antes de hoje.",
      });
    }
    today.setFullYear(today.getFullYear() + 1);
    if (date_end > formatDate(today)) {
      return res.status(400).json({
        ok: "Data de término da olimpíada não pode ser mais de um ano a partir de hoje.",
      });
    }

    const insertionResult = await Olympiad.createOlympiad(req.body);
    return res.status(200).json({ ok: "Olimpíada criada" });
  }
}

module.exports = OlympiadController;
