const DbClient = require("../lib/dbConnection");

class OlympiadSportsModel {
  static async getOlympiadSports(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { name: olympiad, school } = olympiadSportData;

    const queryMessage = `
        SELECT *
        FROM OlympiadSports, Sports
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND OlympiadSports.sport = Sports.name;
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async createNewOlympiadSport(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport, date_start } = olympiadSportData;

    const queryMessage = `
        INSERT INTO OlympiadSports (olympiad, school, sport, date_start, participants)
        VALUES ('${olympiad}', '${school}', '${sport}', '${date_start}', 0);
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async addParticipant(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport } = olympiadSportData;

    const queryMessage = `
        UPDATE OlympiadSports
        SET participants = participants + 1
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}';
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async findOlympiadSport(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport } = olympiadSportData;

    const queryMessage = `
        SELECT *
        FROM OlympiadSports
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}';
        `;
    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async updateOlympiadSport(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport, date_start } = olympiadSportData;

    const queryMessage = `
        UPDATE OlympiadSports
        SET date_start = '${date_start}'
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}';
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async deleteOlympiadSport(olympiadSportData) {
    const databaseConnection = DbClient.getInstance();

    const { olympiad, school, sport } = olympiadSportData;

    const queryMessage = `
        DELETE FROM OlympiadSports
        WHERE olympiad = '${olympiad}' AND school = '${school}' AND sport = '${sport}';
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }
}

module.exports = OlympiadSportsModel;
