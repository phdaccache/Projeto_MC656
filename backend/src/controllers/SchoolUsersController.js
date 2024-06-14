const School = require("../models/School");
const User = require("../models/User");
const SchoolUsers = require("../models/SchoolUsers");

class SchoolUsersController {
  static async store(req, res) {
    const { school, user } = req.body;
    const userExists = await User.findUser({ email: user });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "User doesn't exist" });
    }

    const schoolExists = await School.findSchool({ name: school });
    if (schoolExists.length <= 0) {
      return res.status(400).json({ ok: "School doesn't exist" });
    }

    const userSchoolExists = await SchoolUsers.findUserSchool({ email: user });
    if (userSchoolExists.length > 0) {
      return res.status(400).json({ ok: "User already in a school" });
    }

    const insertionResult = await SchoolUsers.createUserSchool(req.body);
    return res.status(200).json({ ok: "User School updated" });
  }

  static async delete(req, res) {
    const { id: user } = req.params;

    const userExists = await User.findUser({ email: user });
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "User doesn't exist" });
    }

    const userSchoolExists = await SchoolUsers.findUserSchool({ email: user });
    if (userSchoolExists.length <= 0) {
      return res.status(400).json({ ok: "Can't delete school from this user" });
    }

    const deletionResult = await SchoolUsers.removeUserSchool(req.body);
    return res.status(200).json({ ok: "User School deleted" });
  }
}

module.exports = SchoolUsersController;
