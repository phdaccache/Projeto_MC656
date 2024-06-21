const request = require("supertest");
const app = require("../app");
const DbClient = require("../lib/dbConnection");

afterAll(async () => {
  await DbClient.getInstance().close();
});

const today = new Date();

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

describe("POST /olympiad responses", () => {
  it("should not allow the olympiad date to be before today", async () => {
    const olympiad = {
      name: "Olympiad Before Today",
      school: "DefaultSchool",
      date_start: formatDate(today),
      description: "This is a test olympiad",
    };

    olympiad.date_end = new Date(today);
    olympiad.date_end.setDate(olympiad.date_end.getDate() - 1);
    olympiad.date_end = formatDate(olympiad.date_end);

    return request(app)
      .post("/olympiad")
      .send(olympiad)
      .then((res) => {
        expect(res.statusCode).not.toBe(200);
      });
  });

  it("should not allow the olympiad date to be more than 1 year from today", async () => {
    const olympiad = {
      name: "Olympiad After 1 Year From Today",
      school: "DefaultSchool",
      date_start: formatDate(today),
      description: "This is a test olympiad",
    };

    olympiad.date_end = new Date(today);
    olympiad.date_end.setFullYear(olympiad.date_end.getFullYear() + 1);
    olympiad.date_end.setDate(olympiad.date_end.getDate() + 1);
    olympiad.date_end = formatDate(olympiad.date_end);

    return request(app)
      .post("/olympiad")
      .send(olympiad)
      .then((res) => {
        expect(res.statusCode).not.toBe(200);
      });
  });

  it("should allow the olympiad date to be today", async () => {
    const olympiad = {
      name: "Olympiad Today",
      school: "DefaultSchool",
      date_start: formatDate(today),
      description: "This is a test olympiad",
    };

    olympiad.date_end = new Date(today);
    olympiad.date_end = formatDate(olympiad.date_end);

    return request(app)
      .post("/olympiad")
      .send(olympiad)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it("should allow the olympiad date to be 1 year from today", async () => {
    const olympiad = {
      name: "Olympiad 1 Year From Today",
      school: "DefaultSchool",
      date_start: formatDate(today),
      description: "This is a test olympiad",
    };

    olympiad.date_end = new Date(today);
    olympiad.date_end.setFullYear(olympiad.date_end.getFullYear() + 1);
    olympiad.date_end = formatDate(olympiad.date_end);

    return request(app)
      .post("/olympiad")
      .send(olympiad)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
