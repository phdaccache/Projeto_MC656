const request = require("supertest");
const app = require("../app");

describe("POST /school responses", () => {
  it("should insert a new school", async () => {
    const newSchool = {
      name: "Test School",
      manager: "schoolmanager@gmail.com",
    };

    return request(app)
      .post("/school")
      .send(newSchool)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("School created");
      });
  });
});

describe("DELETE /school/:id responses", () => {
  it("should delete the newly added school", async () => {
    const school = {
      name: "Test School",
    };

    return request(app)
      .delete("/school/" + school.name)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("ok");
        expect(res.body.ok).toBe("School deleted");
      });
  });
});
