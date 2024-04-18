const request = require("supertest");
const app = require("../app");

describe("GET / response should be 200", () => {
  it("should be 200", async () => {
      return request(app)
          .get("/")
          .expect(200)
          .then((res) => {
              expect(res.statusCode).toBe(200);
          })
  });
});