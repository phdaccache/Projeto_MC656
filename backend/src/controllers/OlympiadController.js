const DbClient = require("../lib/dbConnection");

class OlympiadController {
    static async index(req, res) {
        const client = new DbClient();

        const query = `
            SELECT * FROM OLYMPIAD LIMIT 10;
        `

        try {
            const result = await client.query(query);
            return res.status(200).json(result.rows);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ok : "Internal error"});
        }
    }

    static async store(req, res) {
        const client = new DbClient();

        const {name, date_start, date_end, school, description} = req.body;

        // Verificar se a olimpíada já existe
        const userExists = await client.query(`
            SELECT * FROM OLYMPIAD WHERE name = '${name}';
        `);
        if (userExists.rowCount > 0) {
            return res.status(400).json({ok : "Olimpíada já cadastrada."});
        }

        // Inserir a olimpíada
        const query = `
            INSERT INTO OLYMPIAD (name, date_start, date_end, school, description)
            VALUES ('${name}', '${date_start}', '${date_end}', '${school}', '${description}');
        `;

        try {
            await client.query(query);
            return res.status(200).json({ok: true});
        } catch (error) {
            return res.status(500).json({ok : "Internal error"});
        }
    }
}

module.exports = OlympiadController;
