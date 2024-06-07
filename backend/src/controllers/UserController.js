const DbClient = require("../lib/dbConnection");

class UserController {
  static async index(req, res) {
    const client = new DbClient();

    const query = `
        SELECT * FROM users;
        `;

    await client.query(query, async (err, resp) => {
      if (err) {
        return res.status(500).json({ ok: "Internal error" });
      }
      const user_list = resp.rows;
      return res.status(200).json({ user_list });
    });
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

  static async #checkIfUserExists(client, userData) {
    const { email } = userData;

    const queryMessage = `
        SELECT * FROM users WHERE email = '${email}';
        `;

    const userLookup = await client.query(queryMessage);

    if (userLookup.rows.length > 0) {
      return { ok: "User already exists" };
    }

    return { ok: "User does not exist" };
  }

  static async #insertUser(client, userData) {
    const {
      name,
      birth_date: birthDate,
      email,
      school,
      gender,
      phone_number: phoneNumber,
    } = userData;

    const queryMessage = `
        INSERT INTO users (name, birth_date, email, school, gender, phone_number)
        VALUES ('${name}', '${birthDate}', '${email}', '${school}', '${gender}', '${phoneNumber}');
        `;

    const userInsertion = await client.query(queryMessage);

    return { ok: "User created" };
  }

  static async store(req, res) {
    const client = new DbClient();

    const validation = UserController.#validateUserData(req.body);
    if (validation.ok !== "Valid data") {
      return res.status(400).json(validation);
    }

    const userExists = await UserController.#checkIfUserExists(
      client,
      req.body
    );
    if (userExists.ok !== "User does not exist") {
      return res.status(400).json(userExists);
    }

    const insertionResult = await UserController.#insertUser(client, req.body);
    return res.status(200).json(insertionResult);
  }
}

module.exports = UserController;
