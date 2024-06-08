const User = require("../models/User");

class UserController {
  static async index(req, res) {
    const userList = await User.listUsers();
    return res.status(200).json({ userList });
  }

  static #validateUserData(userData) {
    const { email, phone_number: phoneNumber } = userData;

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return { ok: "Invalid email" };
    }

    const phoneNumberRegex = /^\d{5}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return { ok: "Invalid phone number" };
    }

    return { ok: "Valid data" };
  }

  static async store(req, res) {
    const validation = UserController.#validateUserData(req.body);
    if (validation.ok !== "Valid data") {
      return res.status(400).json(validation);
    }

    const userExists = await User.findUser(req.body);
    if (userExists.length > 0) {
      return res.status(400).json({ ok: "User already exists" });
    }

    const insertionResult = await User.createUser(req.body);
    return res.status(200).json({ ok: "User created" });
  }
}

module.exports = UserController;
