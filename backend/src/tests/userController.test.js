const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");
const User = require("../models/User");
const School = require("../models/School");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await DbClient.getInstance().close();
});

describe("GET /users responses", () => {
  const newUser = {
    name: "Test User",
    birth_date: "2001-01-01",
    email: "testuseremail@gmail.com",
    password: "Senh@123",
    gender: "Test Gender",
    phone_number: "95124-9087",
  };

  beforeAll(async () => {
    await User.createUser(newUser);
  });

  afterAll(async () => {
    await User.deleteUser(newUser);
  });

  it("should return status 200", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    return request(app)
      .get("/users")
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it("should return the information of the requested user", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    return request(app)
      .get("/users")
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.body.userList).not.toEqual([]);
      });
  });
});

describe("POST /users responses", () => {
  const newUser = {
    name: "Test User",
    birth_date: "2001-01-01",
    email: "testuseremail@gmail.com",
    password: "Senh@123",
    gender: "Test Gender",
    phone_number: "95124-9087",
  };

  afterEach(async () => {
    await User.deleteUser(newUser);

    newUser.name = "Test User";
    newUser.birth_date = "2001-01-01";
    newUser.email = "testuseremail@gmail.com";
    newUser.password = "Senh@123";
    newUser.gender = "Test Gender";
    newUser.phone_number = "95124-9087";
  });

  it("should insert a valid user", async () => {
    return request(app)
      .post("/users")
      .send(newUser)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário criado.");
      });
  });

  it("shouldn't allow duplicates", async () => {
    await request(app).post("/users").send(newUser);

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário já existe.");
      });
  });

  it("shouldn't allow invalid names", async () => {
    newUser.name = "Test";

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Nome inválido.");
      });
  });

  it("shouldn't allow invalid emails", async () => {
    newUser.email = "testuseremail2@gmailcom";

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Email inválido.");
      });
  });

  it("shouldn't allow invalid phone numbers", async () => {
    newUser.phone_number = "5a24-907";

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Número de telefone inválido.");
      });
  });

  it("shouldn't allow invalid birth dates", async () => {
    newUser.birth_date = "2030-01-01";

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Data de nascimento inválida.");
      });
  });

  it("shouldn't allow invalid passwords", async () => {
    newUser.password = "senha123";

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Senha inválida.");
      });
  });
});

describe("PUT /users/:email responses", () => {
  const newUser = {
    name: "Test User",
    birth_date: "2001-01-01",
    email: "testuseremail@gmail.com",
    password: "Senh@123",
    gender: "Test Gender",
    phone_number: "95124-9087",
  };

  beforeAll(async () => {
    await User.createUser(newUser);
  });

  afterAll(async () => {
    newUser.email = "testuseremail@gmail.com";
    await User.deleteUser(newUser);
  });

  it("should update an account", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    newUser.name = "Updated Name";
    newUser.birth_date = "2002-02-02";
    newUser.password = "UpdatedPassword123";
    newUser.gender = "Updated Gender";
    newUser.phone_number = "91234-5678";

    return request(app)
      .put(`/users/${newUser.email}`)
      .set({ authorization: token })
      .send(newUser)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário atualizado.");
      });
  });

  it("shouldn't update an account with invalid new parameters", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    newUser.name = "InvalidName";

    return request(app)
      .put(`/users/${newUser.email}`)
      .set({ authorization: token })
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Nome inválido.");
      });
  });

  it("shouldn't update an invalid user", async () => {
    newUser.email = "invaliduser@gmail.com";

    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    return request(app)
      .put(`/users/${newUser.email}`)
      .set({ authorization: token })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário não existe.");
      });
  });

  it("shouldn't update an account without a login", async () => {
    return request(app).put(`/users/${newUser.email}`).expect(401);
  });
});

describe("DELETE /users/:email responses", () => {
  const newUser = {
    name: "Test User",
    birth_date: "2001-01-01",
    email: "testuseremail@gmail.com",
    password: "Senh@123",
    gender: "Test Gender",
    phone_number: "95124-9087",
  };

  beforeEach(async () => {
    await User.createUser(newUser);
  });

  afterEach(async () => {
    newUser.email = "testuseremail@gmail.com";
    await User.deleteUser(newUser);
  });

  it("should delete a user", async () => {
    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    return request(app)
      .delete(`/users/${newUser.email}`)
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário deletado.");
      });
  });

  it("shouldn't delete an account without a login", async () => {
    return request(app).delete(`/users/${newUser.email}`).expect(401);
  });

  it("shouldn't delete an invalid user", async () => {
    newUser.email = "invaliduser@gmail.com";

    const token = jwt.sign({ userEmail: newUser.email }, "your-secret-key", {
      expiresIn: "1min",
    });

    return request(app)
      .delete(`/users/${newUser.email}`)
      .set({ authorization: token })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("Usuário não existe.");
      });
  });
});
