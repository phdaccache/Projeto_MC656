const User = require("../models/User");
const Olympiad = require("../models/Olympiad");
const OlympiadUsers = require("../models/OlympiadUsers");

class OlympiadUsersController {
  static async store(req, res) {
    const { olympiad, school, email } = req.body;

    const userExists = await User.findUser({ email });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "User doesn't exist" });
    }

    const olympiadExists = await Olympiad.findOlympiad({
      name: olympiad,
      school,
    });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olympiad doesn't exist" });
    }

    const userOlympiadExists = await OlympiadUsers.hasSignedUp(req.body);
    if (userOlympiadExists.length > 0) {
      return res.status(400).json({ ok: "User already signed up" });
    }

    const olympiadInterest = await Olympiad.addParticipant({ name: olympiad });
    const insertionResult = await OlympiadUsers.showInterest(req.body);
    return res.status(200).json({ ok: "User signed up" });
  }

  static async update(req, res) {
    const { olympiad, school, email } = req.body;

    const userExists = await User.findUser({ email });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "User doesn't exist" });
    }

    const olympiadExists = await Olympiad.findOlympiad({
      name: olympiad,
      school,
    });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olympiad doesn't exist" });
    }

    const userOlympiadExists = await OlympiadUsers.hasSignedUp(req.body);
    if (userOlympiadExists.length <= 0) {
      return res.status(400).json({ ok: "User hasn't signed up" });
    }

    const updateResult = await OlympiadUsers.updateInterest(req.body);
    return res.status(200).json({ ok: "User interest updated" });
  }
}

module.exports = OlympiadUsersController;
