const School = require("../models/School");
const User = require("../models/User");
const SchoolUsers = require("../models/SchoolUsers");

class SchoolUsersController {
  static async index(req, res) {
    const { userEmail: email } = req;

    const userSchoolList = await SchoolUsers.findUserSchool({ email });
    return res.status(200).json({ userSchoolList });
  }

  static async store(req, res) {
    const { school, user } = req.body;
    const userExists = await User.findUser({ email: user });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const schoolExists = await School.findSchool({ name: school });
    if (schoolExists.length <= 0) {
      return res.status(400).json({ ok: "Escola não exsite." });
    }

    const userSchoolExists = await SchoolUsers.findUserSchool({ email: user });
    if (userSchoolExists.length > 0) {
      return res.status(400).json({ ok: "Usuário já está em uma escola." });
    }

    const insertionResult = await SchoolUsers.createUserSchool(req.body);
    return res.status(200).json({ ok: "Escola do usuário atualizada." });
  }

  static async delete(req, res) {
    const { id: user } = req.params;

    const userExists = await User.findUser({ email: user });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const userSchoolExists = await SchoolUsers.findUserSchool({ email: user });
    if (userSchoolExists.length <= 0) {
      return res.status(400).json({ ok: "Não é possível deletar escola desse usuário." });
    }

    const deletionResult = await SchoolUsers.removeUserSchool(req.body);
    return res.status(200).json({ ok: "Escola do usuário deletada." });
  }
}

module.exports = SchoolUsersController;
