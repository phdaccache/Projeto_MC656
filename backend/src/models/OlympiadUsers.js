const DbClient = require("../lib/dbConnection");

class OlympiadUsersModel {
  static async getInterestedOlympiadUsers(olympiadUserData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school } = olympiadUserData;

    const queryMessage = `
        SELECT *
        FROM OlympiadUsers
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND interested = 'true';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async hasSignedUp(olympiadUserData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, email } = olympiadUserData;

    const queryMessage = `
        SELECT *
        FROM OlympiadUsers
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND email = '${email}';`;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async showInterest(olympiadUserData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, email } = olympiadUserData;

    const queryMessage = `
      INSERT INTO OlympiadUsers (olympiad, school, email, interested)
      VALUES ('${olympiad}', '${school}', '${email}', 'true');
      `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async updateInterest(olympiadUserData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, email, interested } = olympiadUserData;

    const queryMessage = `
      UPDATE OlympiadUsers
      SET interested = '${interested}'
      WHERE olympiad = '${olympiad}' AND school = '${school}' AND email = '${email}';
      `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }
}

module.exports = OlympiadUsersModel;
