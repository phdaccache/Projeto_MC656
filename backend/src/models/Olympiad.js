const DbClient = require("../lib/dbConnection");
const SchoolUsers = require("./SchoolUsers");

class OlympiadModel {
  static async addParticipant(olympiadData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = olympiadData;

    const queryMessage = `
      UPDATE olympiad
      SET participants = participants + 1
      WHERE name = '${name}';
    `;

    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async listOlympiadsBySchool(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { school } = schoolData;

    const queryMessage = `SELECT * FROM olympiad WHERE school = '${school}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async listOlympiads(userData) {
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
      INSERT INTO olympiad (name, school, date_start, date_end, description, participants)
      VALUES ('${name}', '${school}', '${dateStart}', '${dateEnd}', '${description}', 0);
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

  static async findOlympiadById(olympiadData) {
    const databaseConnection = DbClient.getInstance();

    const { id } = olympiadData;

    const queryMessage = `SELECT * FROM olympiad WHERE id = '${id}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }
}

module.exports = OlympiadModel;
