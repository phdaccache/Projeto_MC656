const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

let school = {
  manager: "schoolmanager@gmail.com",
};

describe("POST /school responses", () => {
  it("should not allow the school name to have exactly 1 word", async () => {
    school.name = "Escola";

    return request(app)
      .post("/school")
      .send(school)
      .then((res) => {
        expect(res.statusCode).not.toBe(200);
      });
  });

  it("should allow the school name to have exactly 2 words", async () => {
    school.name = "Minha Escola";

    return request(app)
      .post("/school")
      .send(school)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
