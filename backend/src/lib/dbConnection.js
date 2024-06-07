const { Pool } = require("pg");

class DbClient {
  constructor() {
    this.client = new Pool({
      user: "backend_user",
      host: "localhost",
      database: "olimpiada",
      password: "S3cret",
      port: 5432,
    });

    this.client.on("error", (err, client) => {
      console.error("Error:", err);
    });
  }

  async query(query, values) {
    const client = await this.client.connect();
    const res = await client.query(query, values);
    client.release();
    return res;
  }
}

module.exports = DbClient;
