const DbClient = require("../lib/dbConnection");

class OlympiadModel {
  static async listOlympiadsBySchool(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { school } = schoolData;

    const queryMessage = `SELECT * FROM olympiad WHERE school = '${school}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async listOlympiads() {
    const databaseConnection = DbClient.getInstance();

    const queryMessage = `SELECT * FROM olympiad;`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async createOlympiad(olympiadData) {
    const databaseConnection = DbClient.getInstance();

    const {
      name,
      date_start: dateStart,
      date_end: dateEnd,
      school,
      description,
    } = olympiadData;

    const queryMessage = `
      INSERT INTO olympiad (name, school, date_start, date_end, description)
      VALUES ('${name}', '${school}', '${dateStart}', '${dateEnd}', '${description}');
      `;

    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async findOlympiad(olympiadData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = olympiadData;

    const queryMessage = `SELECT * FROM olympiad WHERE name = '${name}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }
}

module.exports = OlympiadModel;
