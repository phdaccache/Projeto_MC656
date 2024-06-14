const DbClient = require("../lib/dbConnection");

class UserModel {
  static async listUsers() {
    const databaseConnection = DbClient.getInstance();

    const queryMessage = `SELECT * FROM users;`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async createUser(userData) {
    const databaseConnection = DbClient.getInstance();

    const {
      name,
      birth_date: birthDate,
      email,
      gender,
      phone_number: phoneNumber,
    } = userData;

    const queryMessage = `
            INSERT INTO users (name, birth_date, email, gender, phone_number)
            VALUES ('${name}', '${birthDate}', '${email}', '${gender}', '${phoneNumber}');
            `;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async findUser(userData) {
    const databaseConnection = DbClient.getInstance();

    const { email } = userData;

    const queryMessage = `SELECT * FROM users WHERE email = '${email}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }
}

module.exports = UserModel;
