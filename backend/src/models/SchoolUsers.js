const DbClient = require("../lib/dbConnection");

class SchoolUsersModel {
  static async findUserSchool(userData) {
    const databaseConnection = DbClient.getInstance();

    const { email } = userData;

    const queryMessage = `SELECT * FROM SchoolUsers WHERE email = '${email}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async findSchoolUsers(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = schoolData;

    const queryMessage = `SELECT * FROM SchoolUsers WHERE school = '${name}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async createUserSchool(userData) {
    const databaseConnection = DbClient.getInstance();

    const { user, school, permission } = userData;

    const queryMessage = `
      INSERT INTO SchoolUsers (email, school, permission)
      VALUES ('${user}', '${school}', '${permission}');
      `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async removeUserSchool(userData) {
    const databaseConnection = DbClient.getInstance();

    const { user } = userData;

    const queryMessage = `
      DELETE FROM SchoolUsers WHERE email = '${user}';
      `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }
}

module.exports = SchoolUsersModel;
