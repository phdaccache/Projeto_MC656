const School = require("../models/School");
const User = require("../models/User");

class SchoolController {
  static #validateSchoolData(schoolData) {
    const { name, manager } = schoolData;
    if (!name || !manager) {
      return { ok: "Dado inválido." };
    }
    const nameWords = name.split(" ");
    if (nameWords.length < 2) {
      return {
        ok: "Nome da escola inválido. O nome deve ser composto por pelo menos 2 palavras.",
      };
    }
    return { ok: "Dado válido." };
  }

  static async store(req, res) {
    const validation = SchoolController.#validateSchoolData(req.body);
    if (validation.ok !== "Dado válido.") {
      return res.status(400).json(validation);
    }

    const { manager } = req.body;
    const managerExists = await User.findUser({ email: manager });
    if (managerExists.length <= 0) {
      return res.status(400).json({ ok: "Gerente não existe." });
    }

    const insertionResult = await School.createSchool(req.body);
    return res.status(200).json({ ok: "Escola criada." });
  }

  static async delete(req, res) {
    const { id: name } = req.params;

    const school = await School.findSchool({ name });
    if (!school) {
      return res.status(400).json({ ok: "Escola não encontrada." });
    }

    const deletionResult = await School.deleteSchool({ name });
    return res.status(200).json({ ok: "Escola deletada." });
  }
}

module.exports = SchoolController;
