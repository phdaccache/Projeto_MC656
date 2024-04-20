const dbClient = require("../lib/dbConnection");

module.exports = {
    async index(req, res) {
        const client = await dbClient.connect();

        const query = `
            SELECT * FROM OLYMPIAD LIMIT 10;
        `

        try {
            const result = await client.query(query);
            await client.release(true);
            return res.status(200).json(result.rows);
        } catch (error) {
            console.log(error)
            await client.release(true);
            return res.status(500).json({ok : "Internal error"});
        }

    },

    async store(req, res) {
        const client = await dbClient.connect();

        const {name, date_start, date_end, school, description} = req.body;

        // Verificar se a olimpíada já existe
        const userExists = await client.query(`
            SELECT * FROM OLYMPIAD WHERE name = '${name}';
        `);
        if (userExists.rowCount > 0) {
            await client.release(true);
            return res.status(400).json({ok : "Olimpíada já cadastrada."});
        }

        // Inserir a olimpíada
        const query = `
            INSERT INTO OLYMPIAD (name, date_start, date_end, school, description)
            VALUES ('${name}', '${date_start}', '${date_end}', '${school}', '${description}');
        `;


        try {
            await client.query(query);
            await client.release(true);
            return res.status(200).json({ok: true});
        } catch (error) {
            await client.release(true);
            return res.status(500).json({ok : "Internal error"});
        }
    }
};
