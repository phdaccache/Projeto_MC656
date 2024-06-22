const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("POST /olympiadsports responses", () => {
  it("should allow a sport to be added to an olympiad", async () => {
    const newOlympiadSport = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Athletics",
      date_start: "2021-10-01",
    };

    return request(app)
      .post("/olympiadsports")
      .send(newOlympiadSport)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Esporte criado no evento da olimpíada");
      });
  });
});

describe("PUT /olympiadsports responses", () => {
  it("should allow an olympiad sport to have its information changed", async () => {
    const changedOlympiadSport = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Athletics",
      date_start: "2026-10-01",
    };

    return request(app)
      .put(
        "/olympiadsports/" +
          changedOlympiadSport.olympiad +
          "/" +
          changedOlympiadSport.school +
          "/" +
          changedOlympiadSport.sport
      )
      .send(changedOlympiadSport)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Informações atualizadas.");
      });
  });
});

describe("DELETE /olympiadsports responses", () => {
  it("should allow an olympiad sport to be removed", async () => {
    const removedOlympiadSport = {
      olympiad: "DefaultOlympiad",
      school: "DefaultSchool",
      sport: "Athletics",
    };

    return request(app)
      .delete(
        "/olympiadsports/" +
          removedOlympiadSport.olympiad +
          "/" +
          removedOlympiadSport.school +
          "/" +
          removedOlympiadSport.sport
      )
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Esporte deletado da olimpíada.");
      });
  });
});
