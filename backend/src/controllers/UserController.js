const dbClient = require("../lib/dbConnection");

module.exports = {
    async index (req, res) {
        // GET
        const client = await dbClient.connect();
        const query = `
        SELECT * FROM USERS;
        `;
        await client.query(query, async (err, resp) => {
            if (err) {
                console.error(err);
                await client.release(true);
                return res.send("Internal error").status(500);
            }            
            const user_list = resp.rows;
            console.log(user_list);
            await client.release(true);
            return res.json({ user_list }).status(200);            
        });
    },

    async store (req, res) {
        // POST
        const { name, birth_date, email, school, gender, phone_number } = req.body;
        const client = await dbClient.connect();
        
        // Check if user already exists
        const query = `
        SELECT * FROM USERS WHERE email = '${email}';
        `;
        await client.query(query, async (err, resp) => {
            if (err) {
                console.error(err);
                await client.release(true);
                return res.json({ok : "Internal error"}).status(500);
            }
            if (resp.rows.length > 0) {
                await client.release(true);
                return res.json({ok : "User already exists"}).status(400);
            }
        });

        // Check if email is valid
        const email_regex = /^\S+@\S+\.\S+$/;
        if (!email_regex.test(email)) {
            await client.release(true);
            return res.json({ok : "Invalid email"}).status(400);
        }

        // Check if phone number is valid
        const phone_number_regex = /^\d{5}-\d{4}$/;
        if (!phone_number_regex.test(phone_number)) {
            await client.release(true);
            return res.json({ok : "Invalid phone number"}).status(400);            
        }

        // Insert new user
        const insert_query = `
        INSERT INTO USERS (name, birth_date, email, school, gender, phone_number)
        VALUES ('${name}', '${birth_date}', '${email}', '${school}', '${gender}', '${phone_number}');
        `;
        
        await client.query(insert_query, async (err, resp) => {
            if (err) {
                console.error(err);
                await client.release(true);
                return res.json({ok : "Internal error"}).status(500);
            }
            await client.release(true);
            return res.json({ok : "User created"}).status(200);
        });
    },
};
