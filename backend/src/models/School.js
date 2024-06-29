const DbClient = require("../lib/dbConnection");

class SchoolModel {
  static async getManagerSchools(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { email } = schoolData;

    const queryMessage = `
            SELECT *
            FROM School
            WHERE School.manager = '${email}';
            `;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async createSchool(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { name, manager } = schoolData;

    const queryMessage = `
            INSERT INTO School (name, manager)
            VALUES ('${name}', '${manager}');
            `;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async findSchool(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = schoolData;

    const queryMessage = `
            SELECT * FROM School
            WHERE name = '${name}';
            `;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }

  static async deleteSchool(schoolData) {
    const databaseConnection = DbClient.getInstance();

    const { name } = schoolData;

    const queryMessage = `
            DELETE FROM School
            WHERE name = '${name}';
            `;
    const queryResult = await databaseConnection.query(queryMessage);

    return queryResult.rows;
  }
}

module.exports = SchoolModel;
