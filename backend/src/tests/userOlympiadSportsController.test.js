const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("GET /userolympiadsports responses", () => {
  it("should allow an user to see all users interested in a sport", async () => {
    const userOlympiadSportsData = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Default Sport",
    };

    return request(app)
      .get("/userolympiadsports")
      .send(userOlympiadSportsData)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});

describe("POST /userolympiadsports responses", () => {
  it("should allow an user to show their preference for a sport", async () => {
    const newPreference = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Default Sport",
      email: "student@gmail.com",
      preference: true,
    };

    return request(app)
      .post("/userolympiadsports")
      .send(newPreference)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Preferência criada.");
      });
  });
});

describe("PUT /userolympiadsports responses", () => {
  it("should allow an user to change their preference for a sport", async () => {
    const updatedPreference = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Default Sport",
      email: "student@gmail.com",
      preference: false,
    };

    return request(app)
      .put(
        "/userolympiadsports/" +
          updatedPreference.olympiad +
          "/" +
          updatedPreference.school +
          "/" +
          updatedPreference.sport +
          "/" +
          updatedPreference.email
      )
      .send(updatedPreference)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Preferência atualizada.");
      });
  });
});
