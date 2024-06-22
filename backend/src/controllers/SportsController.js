const Sports = require("../models/Sports");

class SportsController {
  static async store(req, res) {
    const sportExists = await Sports.findSport(req.body);
    if (sportExists.length > 0) {
      return res.status(400).json({ ok: "Sport already exists" });
    }

    const insertionResult = await Sports.createSport(req.body);
    return res.status(200).json({ ok: "Sport created" });
  }

  static async update(req, res) {
    const sportExists = await Sports.findSport(req.body);
    if (sportExists.length <= 0) {
      return res.status(400).json({ ok: "Sport does not exist" });
    }

    const updateResult = await Sports.updateSport(req.body);
    return res.status(200).json({ ok: "Sport updated" });
  }
}

module.exports = SportsController;
