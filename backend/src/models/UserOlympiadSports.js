const DbClient = require("../lib/dbConnection");

class UserOlympiadSportsModel {
  static async getInterestedUsers(userOlympiadSportsData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport } = userOlympiadSportsData;

    const queryMessage = `
        SELECT *
        FROM UserOlympiadSports
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}' AND preference = 'true';`;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async getPreference(userOlympiadSportsData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport, email } = userOlympiadSportsData;

    const queryMessage = `
        SELECT *
        FROM UserOlympiadSports
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}' AND email = '${email}';`;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async addPreference(userOlympiadSportsData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport, email, preference } =
      userOlympiadSportsData;

    const queryMessage = `
        INSERT INTO UserOlympiadSports(olympiad, school, sport, email, preference)
        VALUES ('${olympiad}', '${school}', '${sport}', '${email}', '${preference}');`;

    await databaseConnection.query(queryMessage);
  }

  static async setPreference(userOlympiadSportsData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport, email, preference } =
      userOlympiadSportsData;

    const queryMessage = `
        UPDATE UserOlympiadSports
        SET preference = '${preference}'
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}' AND email = '${email}';`;

    await databaseConnection.query(queryMessage);
  }
}

module.exports = UserOlympiadSportsModel;
