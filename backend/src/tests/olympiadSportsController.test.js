const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const DbClient = require("../lib/dbConnection");
const User = require("../models/User");
const School = require("../models/School");
const SchoolUsers = require("../models/SchoolUsers");
const Olympiad = require("../models/Olympiad");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("GET /olympiadsports responses", () => {
  const newUser = {
    name: "Test User",
    birth_date: "2001-01-01",
    email: "testuseremail@gmail.com",
    password: "Senh@123",
    gender: "Test Gender",
    phone_number: "95124-9087",
  };

  const newSchool = {
    name: "Test School",
    manager: newUser.email,
  };

  const newOlympiad = {
    name: "Test Olympiad",
    school: newSchool.name,
    date_start: "2021-10-01",
    date_end: "2021-10-10",
    description: "Default description",
  };

  beforeAll(async () => {
    await User.createUser(newUser);
    await School.createSchool(newSchool);
    await SchoolUsers.createUserSchool({
      user: newUser.email,
      school: newSchool.name,
      permission: "aluno",
    });
    await Olympiad.createOlympiad(newOlympiad);
  });

  afterAll(async () => {
    await SchoolUsers.removeUserSchool({ user: newUser.email });
    await Olympiad.deleteOlympiad(newOlympiad);
    await School.deleteSchool(newSchool);
    await User.deleteUser(newUser);
  });

  it("should return all sports from an olympiad", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    const olympiadData = await Olympiad.findOlympiad({
      name: newOlympiad.name,
    });

    return request(app)
      .get(`/olympiadsports/${olympiadData[0].id}`)
      .set({ authorization: token })
      .expect(200);
  });
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
