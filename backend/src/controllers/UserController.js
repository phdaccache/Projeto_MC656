const dbClient = require("../lib/dbConnection");

module.exports = {
    async index (req, res) {
        // GET
        const client = await dbClient.connect();
        const query = `
        SELECT * FROM users;
        `;
        await client.query(query, async (err, resp) => {
            if (err) {
                // console.error(err);
                await client.release(true);
                return res.status(500).json({ok : "Internal error"});
            }
            const user_list = resp.rows;
            // console.log(user_list);
            await client.release(true);
            return res.status(200).json({ user_list });
        });
    },

    async store (req, res) {
        const client = await dbClient.connect();
        // POST
        const { name, birth_date, email, school, gender, phone_number } = req.body;

        // Check if email is valid
        const email_regex = /^\S+@\S+\.\S+$/;
        if (!email_regex.test(email)) {
            await client.release(true);
            return res.status(400).json({ok : "Invalid email"});
        }

        // Check if phone number is valid
        const phone_number_regex = /^\d{5}-\d{4}$/;
        if (!phone_number_regex.test(phone_number)) {
            await client.release(true);
            return res.status(400).json({ok : "Invalid phone number"});
        }


        // Check if user already exists
        const query = `
        SELECT * FROM users WHERE email = '${email}';
        `;

        await client.query(query, async (err, resp) => {
            if (err) {
                console.error(err);
                await client.release(true);
                return res.status(500).json({ok : "Internal error"});
            }
            if (resp.rows.length > 0) {
                await client.release(true);
                return res.status(400).json({ok : "User already exists"});
            }

            // Insert new user
            const insert_query = `
            INSERT INTO users (name, birth_date, email, school, gender, phone_number)
            VALUES ('${name}', '${birth_date}', '${email}', '${school}', '${gender}', '${phone_number}');
            `;

            await client.query(insert_query, async (err, resp) => {
                if (err) {
                    // console.error(err);
                    await client.release(true);
                    return res.status(500).json({ok : "Internal error"});
                }
                await client.release(true);
                return res.status(200).json({ok : "User created"});
            });
        });
    },
};