const DbClient = require("../lib/dbConnection");

class SportsModel {
  static async listSports() {
    const databaseConnection = DbClient.getInstance();

    const queryMessage = `
        SELECT *
        FROM Sports;
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async findSport(sportData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = sportData;

    const queryMessage = `
        SELECT *
        FROM Sports
        WHERE name = '${name}';
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async createSport(sportData) {
    const databaseConnection = DbClient.getInstance();

    const {
      name,
      min_players: minPlayers,
      max_players: maxPlayers,
      duration,
      ruleset,
      extra_info: extraInfo,
    } = sportData;

    const queryMessage = `
        INSERT INTO Sports (name, min_players, max_players, duration, ruleset, extra_info)
        VALUES ('${name}', '${minPlayers}', '${maxPlayers}', '${duration}', '${ruleset}', '${extraInfo}');
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }

  static async updateSport(sportData) {
    const databaseConnection = DbClient.getInstance();

    const {
      name,
      min_players: minPlayers,
      max_players: maxPlayers,
      duration,
      ruleset,
      extra_info: extraInfo,
    } = sportData;

    const queryMessage = `
        UPDATE Sports
        SET min_players = '${minPlayers}', max_players = '${maxPlayers}', duration = '${duration}', ruleset = '${ruleset}', extra_info = '${extraInfo}'
        WHERE name = '${name}';
        `;

    const queryResult = await databaseConnection.query(queryMessage);
    return queryResult.rows;
  }
}

module.exports = SportsModel;
