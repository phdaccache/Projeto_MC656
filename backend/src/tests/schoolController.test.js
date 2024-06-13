const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("POST /school responses", () => {
  it("should insert a new school", async () => {
    const newSchool = {
      name: "Test School",
      manager: "schoolmanager@gmail.com",
    };

    return request(app)
      .post("/school")
      .send(newSchool)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("School created");
      });
  });
});
