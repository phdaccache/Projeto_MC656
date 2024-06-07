const DbClient = require("../lib/dbConnection");

class OlympiadController {
  static async index(req, res) {
    const client = new DbClient();

    const query = `
            SELECT * FROM OLYMPIAD LIMIT 10;
        `;

    try {
      const result = await client.query(query);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: "Internal error" });
    }
  }

  static async #checkIfOlympiadExists(client, olympiadData) {
    const { name } = olympiadData;

    const queryMessage = `
        SELECT * FROM olympiad WHERE name = '${name}';
        `;

    const olympiadLookup = await client.query(queryMessage);

    if (olympiadLookup.rows.length > 0) {
      return { ok: "Olimpíada já cadastrada." };
    }

    return { ok: "Olimpíada não foi cadastrada." };
  }

  static async #insertOlympiad(client, olympiadData) {
    const {
      name,
      date_start: dateStart,
      date_end: dateEnd,
      school,
      description,
    } = olympiadData;

    const queryMessage = `
        INSERT INTO olympiad (name, date_start, date_end, school, description)
        VALUES ('${name}', '${dateStart}', '${dateEnd}', '${school}', '${description}');
        `;

    const olympiadInsertion = await client.query(queryMessage);

    return { ok: "Olimpíada criada" };
  }

  static async store(req, res) {
    const client = new DbClient();

    const olympiadExists = await OlympiadController.#checkIfOlympiadExists(
      client,
      req.body
    );
    if (olympiadExists.ok === "Olimpíada já cadastrada.") {
      return res.status(400).json(olympiadExists);
    }

    const insertionResult = await OlympiadController.#insertOlympiad(
      client,
      req.body
    );
    return res.status(200).json(insertionResult);
  }
}

module.exports = OlympiadController;
