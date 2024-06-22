const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

class UserController {
  static async index(req, res) {
    const userList = await User.listUsers();
    return res.status(200).json({ userList });
  }

  static #validateUserData(userData) {
    const {
      name,
      birth_date: birthDate,
      email,
      phone_number: phoneNumber,
      password,
    } = userData;

    const nameWords = name.split(" ");
    if (nameWords.length < 2) {
      return { ok: "Invalid name" };
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return { ok: "Invalid email" };
    }

    const phoneNumberRegex = /^\d{5}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return { ok: "Invalid phone number" };
    }

    const today = new Date();
    if (birthDate > formatDate(today)) {
      return { ok: "Invalid birth date" };
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return { ok: "Invalid password" };
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

  static async login(req, res) {
    const { email, password } = req.body;

    const findPassword = await User.findPassword(req.body);

    if (findPassword.length == 0) {
      return res.status(400).json({ ok: "User doesnt exist" });
    }

    const dbPassword = findPassword[0].password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userEmail: email }, "your-secret-key", {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  }
}

module.exports = UserController;
