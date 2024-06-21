const DbClient = require("../lib/dbConnection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      password,
      gender,
      phone_number: phoneNumber,
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const queryMessage = `
            INSERT INTO users (name, birth_date, email, password, gender, phone_number)
            VALUES ('${name}', '${birthDate}', '${email}', '${hashedPassword}', '${gender}', '${phoneNumber}');
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

  static async findPassword(userData) {
    const databaseConnection = DbClient.getInstance();

    const { email } = userData;

    const queryMessage = `
            SELECT email, password FROM users WHERE email = '${email}';
        `;
    
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }
}

module.exports = UserModel;
