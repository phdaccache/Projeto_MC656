const DbClient = require("../lib/dbConnection");

class SchoolModel {
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
}

module.exports = SchoolModel;
