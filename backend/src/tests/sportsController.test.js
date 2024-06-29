const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("POST /sports responses", () => {
  it("should insert a new sport", async () => {
    const newSport = {
      name: "DefaultSport",
      min_players: 1,
      max_players: 10,
      duration: "45M",
      ruleset: "DefaultRuleset",
      extra_info: "DefaultExtraInfo",
    };

    return request(app)
      .post("/sports")
      .send(newSport)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Esporte criado.");
      });
  });
});

describe("PUT /sports responses", () => {
  it("should update the sport information", async () => {
    const newSport = {
      name: "DefaultSport",
      min_players: 10,
      max_players: 10,
      duration: "60M",
      ruleset: "New Ruleset",
      extra_info: "New Extra Info",
    };

    return request(app)
      .put("/sports")
      .send(newSport)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Esporte atualizado.");
      });
  });
});
