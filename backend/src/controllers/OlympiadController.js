const dbClient = require("../lib/dbConnection");

module.exports = {
    async index(req, res) {
        const client = await dbClient.connect();

        const query = `
            SELECT * FROM OLYMPIAD LIMIT 10;
        `
        await client.query(query, async (err, resp) => {
            if (err) {
                // console.error(err);
                await client.release(true);
                return res.status(500).json({ok : "Internal error"});
            }

            // console.log(resp.rows);
            await client.release(true);
            return res.status(200).json(resp.rows);
        });
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

        await client.query(query, async (err, resp) => {
            if (err) {
                // console.error(err);
                await client.release(true);
                return res.status(500).json({ok : "Internal error"});
            }

            await client.release(true);
            return res.status(200).json({ok: true});
        });
    }
};
