const UserOlympiadSports = require("../models/UserOlympiadSports");
const Olympiad = require("../models/Olympiad");
const OlympiadSports = require("../models/OlympiadSports");
const OlympiadUsers = require("../models/OlympiadUsers");

class UserOlympiadSportsController {
  static async index(req, res) {
    const interestedUsers = await UserOlympiadSports.getInterestedUsers(
      req.params
    );
    return res.status(200).json(interestedUsers);
  }

  static async store(req, res) {
    const userHasPreference = await UserOlympiadSports.getPreference(req.body);
    if (userHasPreference.length > 0) {
      return res
        .status(400)
        .json({ ok: "Usuário já decidiu sua preferência." });
    }

    const isNewToOlympiad = await OlympiadUsers.hasSignedUp(req.body);
    if (isNewToOlympiad.length <= 0) {
      const olympiadParticipant = await Olympiad.addParticipant({
        name: req.body.olympiad,
      });
      const olympiadUser = await OlympiadUsers.showInterest(req.body);
    }
    const sportParticipant = await OlympiadSports.addParticipant(req.body);
    const insertionResult = await UserOlympiadSports.addPreference(req.body);

    return res.status(200).json({ ok: "Preferência criada." });
  }

  static async update(req, res) {
    const { olympiad, school, sport, email } = req.params;
    const { preference } = req.body;

    const userHasPreference = await UserOlympiadSports.getPreference(
      req.params
    );
    if (userHasPreference.length <= 0) {
      return res
        .status(400)
        .json({ ok: "Usuário ainda não decidiu sua preferência." });
    }

    const updateResult = await UserOlympiadSports.setPreference({
      olympiad,
      school,
      sport,
      email,
      preference,
    });
    return res.status(200).json({ ok: "Preferência atualizada." });
  }
}

module.exports = UserOlympiadSportsController;
