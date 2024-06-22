const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("POST /schoolusers responses", () => {
  it("should insert a new school to an existing user", async () => {
    const newUserSchool = {
      school: "DefaultSchool",
      user: "schoolmanager@gmail.com",
      permission: "Manager",
    };

    return request(app)
      .post("/schoolusers")
      .send(newUserSchool)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User School updated");
      });
  });
});

describe("DELETE /schoolusers/:id responses", () => {
  it("should delete the user-school relation", async () => {
    const addedUserSchool = {
      user: "schoolmanager@gmail.com",
    };

    return request(app)
      .delete("/schoolusers/" + addedUserSchool.user)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User School deleted");
      });
  });
});
