const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  token = jwt.sign({ userEmail: "testuser@testing.com" }, "your-secret-key", {
    expiresIn: "10min",
  });
});

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("GET /olympiad responses", () => {
  it("should be 200", async () => {
    return await request(app)
      .get("/olympiad")
      .set({ authorization: token })
      .expect(200);
  });

  it("should be empty for a new user", async () => {
    return await request(app)
      .get("/olympiad")
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.body.olympiadList).toEqual([]);
      });
  });
});

describe("POST /olympiad responses", () => {
  it("should insert a new olympiad", async () => {
    const newOlympiad = {
      name: "Test Olympiad",
      date_start: "2024-09-01",
      date_end: "2024-09-05",
      school: "DefaultSchool",
      description: "This is a test olympiad",
    };

    return await request(app)
      .post("/olympiad")
      .send(newOlympiad)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Olimpíada criada");
      });
  });

  it("shouldn't allow duplicates", async () => {
    const newOlympiad = {
      name: "Test Olympiad",
      date_start: "2024-09-01",
      date_end: "2024-09-05",
      school: "DefaultSchool",
      description: "This is a test olympiad",
    };

    return await request(app)
      .post("/olympiad")
      .send(newOlympiad)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Olimpíada já cadastrada.");
      });
  });
});
