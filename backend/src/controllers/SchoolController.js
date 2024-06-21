const School = require("../models/School");
const User = require("../models/User");

class SchoolController {
  static #validateSchoolData(schoolData) {
    const { name, manager } = schoolData;
    if (!name || !manager) {
      return { ok: "Invalid data" };
    }
    const nameWords = name.split(" ");
    if (nameWords.length < 2) {
      return { ok: "Invalid data" };
    }
    return { ok: "Valid data" };
  }

  static async store(req, res) {
    const validation = SchoolController.#validateSchoolData(req.body);
    if (validation.ok !== "Valid data") {
      return res.status(400).json(validation);
    }

    const { manager } = req.body;
    const managerExists = await User.findUser({ email: manager });
    if (managerExists.length <= 0) {
      return res.status(400).json({ ok: "Manager doesn't exist" });
    }

    const insertionResult = await School.createSchool(req.body);
    return res.status(200).json({ ok: "School created" });
  }

  static async delete(req, res) {
    const { id: name } = req.params;

    const school = await School.findSchool({ name });
    if (!school) {
      return res.status(400).json({ ok: "School not found" });
    }

    const deletionResult = await School.deleteSchool({ name });
    return res.status(200).json({ ok: "School deleted" });
  }
}

module.exports = SchoolController;
