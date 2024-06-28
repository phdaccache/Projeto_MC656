const User = require("../models/User");
const Olympiad = require("../models/Olympiad");
const OlympiadUsers = require("../models/OlympiadUsers");

class OlympiadUsersController {
  static async index(req, res) {
    const { id } = req.params;

    const olympiad = await Olympiad.findOlympiadById({ id });

    const { name, school } = olympiad[0];

    const olympiadUsers = await OlympiadUsers.getInterestedOlympiadUsers({
      olympiad: name,
      school,
    });
    return res.status(200).json(olympiadUsers);
  }

  static async store(req, res) {
    const { olympiad, school, email } = req.body;

    const userExists = await User.findUser({ email });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const olympiadExists = await Olympiad.findOlympiad({
      name: olympiad,
      school,
    });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olimpíada não existe." });
    }

    const userOlympiadExists = await OlympiadUsers.hasSignedUp(req.body);
    if (userOlympiadExists.length > 0) {
      return res.status(400).json({ ok: "Usuário já cadastrado." });
    }

    const olympiadInterest = await Olympiad.addParticipant({ name: olympiad });
    const insertionResult = await OlympiadUsers.showInterest(req.body);
    return res.status(200).json({ ok: "Usuário cadastrado." });
  }

  static async update(req, res) {
    const { olympiad, school, email } = req.body;

    const userExists = await User.findUser({ email });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const olympiadExists = await Olympiad.findOlympiad({
      name: olympiad,
      school,
    });
    if (olympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Olimpíada não existe." });
    }

    const userOlympiadExists = await OlympiadUsers.hasSignedUp(req.body);
    if (userOlympiadExists.length <= 0) {
      return res.status(400).json({ ok: "Usuáio não cadastrado." });
    }

    const updateResult = await OlympiadUsers.updateInterest(req.body);
    return res.status(200).json({ ok: "Interesse do usuário atualizado." });
  }
}

module.exports = OlympiadUsersController;
