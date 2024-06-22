const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("POST /insert_user responses", () => {
  it("should not accept passwords with less than 6 characters", async () => {
    const newUser = {
      name: "Valid Name",
      birth_date: "2000-01-01",
      email: "valid_email@gmail.com",
      password: "Senh4",
      gender: "Masculino",
      phone_number: "12345-6789",
    };

    const response = await request(app)
      .post("/insert_user")
      .send(newUser);

    expect(response.status).toBe(400);
  });

  it("should not accept passwords without a number", async () => {
    const newUser = {
        name: "Valid Name",
        birth_date: "2000-01-01",
        email: "valid_email@gmail.com",
        password: "senhaS",
        gender: "Masculino",
        phone_number: "12345-6789",
      };

      const response = await request(app)
        .post("/insert_user")
        .send(newUser);

      expect(response.status).toBe(400);
  });

  it("should not accept passwords without uppercase letters", async () => {
    const newUser = {
        name: "Valid Name",
        birth_date: "2000-01-01",
        email: "valid_email@gmail.com",
        password: "senh4s",
        gender: "Masculino",
        phone_number: "12345-6789",
      };

      const response = await request(app)
        .post("/insert_user")
        .send(newUser);

      expect(response.status).toBe(400);
  });

  it("should accept valid passwords", async () => {
    const newUser = {
        name: "Valid Name",
        birth_date: "2000-01-01",
        email: "valid_email@gmail.com",
        password: "Senh4s",
        gender: "Masculino",
        phone_number: "12345-6789",
      };

      const response = await request(app)
        .post("/insert_user")
        .send(newUser);

      expect(response.status).toBe(200);
  });

});