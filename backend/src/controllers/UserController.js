const User = require("../models/User");
const School = require("../models/School");
const SchoolUsers = require("../models/SchoolUsers");
const DateChecks = require("../lib/DateChecks");

class UserController {
  static async index(req, res) {
    const { userEmail: email } = req;

    const userList = await User.listUser({ email });
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
      return { ok: "Nome inválido." };
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return { ok: "Email inválido." };
    }

    const phoneNumberRegex = /^\d{5}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return { ok: "Número de telefone inválido." };
    }

    if (!DateChecks.isBeforeToday(birthDate)) {
      return { ok: "Data de nascimento inválida." };
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return { ok: "Senha inválida." };
    }

    return { ok: "Dado válido." };
  }

  static async store(req, res) {
    const validation = UserController.#validateUserData(req.body);
    if (validation.ok !== "Dado válido.") {
      return res.status(400).json(validation);
    }

    const userExists = await User.findUser(req.body);
    if (userExists.length > 0) {
      return res.status(400).json({ ok: "Usuário já existe." });
    }

    const insertionResult = await User.createUser(req.body);
    return res.status(200).json({ ok: "Usuário criado." });
  }

  static async update(req, res) {
    const { email } = req.params;
    const { userEmail } = req;
    const userData = req.body;

    if (email !== userEmail) {
      return res.status(400).json({ ok: "Conta inválida." });
    }

    const userExists = await User.findUser(req.params);
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const validation = UserController.#validateUserData(req.body);
    if (validation.ok !== "Dado válido.") {
      return res.status(400).json(validation);
    }

    const updateResult = await User.updateUser({ email, ...userData });
    return res.status(200).json({ ok: "Usuário atualizado." });
  }

  static async delete(req, res) {
    const { email } = req.params;
    const { userEmail } = req;

    if (email !== userEmail) {
      return res.status(400).json({ ok: "Conta inválida." });
    }

    const userExists = await User.findUser(req.params);
    if (userExists.length <= 0) {
      return res.status(400).json({ ok: "Usuário não existe." });
    }

    const managerSchools = await School.getManagerSchools({ email });
    if (managerSchools.length > 0) {
      return res
        .status(400)
        .json({ ok: "Entre em contato com um administrador para deletar sua conta." });
    }

    const schoolRemovalResult = await SchoolUsers.removeUserSchool({
      user: req.params.email,
    });

    const deletionResult = await User.deleteUser(req.params);
    return res.status(200).json({ ok: "Usuário deletado." });
  }
}

module.exports = UserController;
