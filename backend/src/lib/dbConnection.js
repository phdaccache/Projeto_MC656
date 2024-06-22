const { Pool } = require("pg");

// Permitir a criação apenas pela própria classe (construtor privado)
const creationKey = Symbol();

class DbClient {
  constructor(usedKey) {
    if (usedKey !== creationKey) {
      throw new Error(
        "You can't require a new Database connection directly. Use getInstance()!"
      );
    }

    if (!DbClient.instance) {
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

      DbClient.instance = this;
    }

    return DbClient.instance;
  }

  static getInstance() {
    if (!DbClient.instance) {
      DbClient.instance = new DbClient(creationKey);
    }
    return DbClient.instance;
  }

  async query(query, values) {
    const client = await this.client.connect();
    const res = await client.query(query, values);
    client.release();
    return res;
  }

  async close() {
    await this.client.end();
  }
}

module.exports = DbClient;
