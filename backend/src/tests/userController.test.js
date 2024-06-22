const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");
const User = require("../models/User");
const School = require("../models/School");
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

describe("GET /list_user responses", () => {
  it("should be 200", async () => {
    return request(app)
      .get("/list_user")
      .set({ authorization: token })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it("should not be empty", async () => {
    return request(app)
      .get("/list_user")
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
        expect(res.body.ok).toBe("User created");
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
        expect(res.body.ok).toBe("User already exists");
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
        expect(res.body.ok).toBe("Invalid name");
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
        expect(res.body.ok).toBe("Invalid email");
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
        expect(res.body.ok).toBe("Invalid phone number");
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
        expect(res.body.ok).toBe("Invalid birth date");
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
        expect(res.body.ok).toBe("Invalid password");
      });
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
    await User.deleteUser(newUser);
  });

  it("should delete a user", async () => {
    const loggedToken = jwt.sign(
      { userEmail: newUser.email },
      "your-secret-key",
      {
        expiresIn: "1min",
      }
    );

    return request(app)
      .delete(`/users/${newUser.email}`)
      .set({ authorization: loggedToken })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User deleted");
      });
  });

  it("shouldn't delete an account without a login", async () => {
    return request(app).delete(`/users/${newUser.email}`).expect(401);
  });

  it("shouldn't delete an invalid user", async () => {
    newUser.email = "invaliduser@gmail.com";

    const loggedToken = jwt.sign(
      { userEmail: newUser.email },
      "your-secret-key",
      {
        expiresIn: "1min",
      }
    );

    return request(app)
      .delete(`/users/${newUser.email}`)
      .set({ authorization: loggedToken })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("User doesn't exist");
      });
  });
});
