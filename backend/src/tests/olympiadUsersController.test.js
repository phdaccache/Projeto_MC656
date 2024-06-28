const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("GET /olympiadusers responses", () => {
  it("should return a list of users interested in an olympiad", async () => {
    token = jwt.sign(
      { userEmail: "schoolmanager@gmail.com" },
      "your-secret-key",
      {
        expiresIn: "1min",
      }
    );

    return request(app)
      .get("/olympiadusers/1")
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});

describe("POST /olympiadusers responses", () => {
  it("should allow an user to show interest in an olympiad", async () => {
    const newOlympiadUser = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      email: "schoolmanager@gmail.com",
      interested: "Yes",
    };

    return request(app)
      .post("/olympiadusers")
      .send(newOlympiadUser)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User signed up");
      });
  });
});

describe("PUT /olympiadusers responses", () => {
  it("should allow an user to change their interest in an olympiad", async () => {
    const changedOlympiadUser = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      email: "schoolmanager@gmail.com",
      interested: "No",
    };

    return request(app)
      .put("/olympiadusers")
      .send(changedOlympiadUser)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User interest updated");
      });
  });
});
