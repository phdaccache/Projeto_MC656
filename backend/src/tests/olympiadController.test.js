const request = require("supertest");
const app = require("../app");
const dbClient = require("../lib/dbConnection"); // force DB init before running

describe("GET /list_olympiad responses", () => {
    it("should be 200", async () => {
        return await request(app)
                .get("/list_olympiad")
                .expect(200);
    });

    it("should be empty", async () => {
        return await request(app)
                .get("/list_olympiad")
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual([]);
                })
    });
});

describe("POST /insert_olympiad responses", () => {
    it("should insert a new olympiad", async () => {
        const newOlympiad = {
            name: "Test Olympiad",
            date_start: "2022-01-01",
            date_end: "2022-12-31",
            school: "Test School",
            description: "This is a test olympiad"
        };

        return await request(app)
            .post("/insert_olympiad")
            .send(newOlympiad)
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('ok');
                expect(res.body.ok).toBe(true);
            });

    });

    it("shouldn't allow duplicates", async () => {
        const newOlympiad = {
            name: "Test Olympiad",
            date_start: "2022-01-01",
            date_end: "2022-12-31",
            school: "Test School",
            description: "This is a test olympiad"
        };

        return await request(app)
            .post("/insert_olympiad")
            .send(newOlympiad)
            .expect(400)
            .then((res) => {
                expect(res.body).toHaveProperty('ok');
                expect(res.body.ok).toBe("Olimpíada já cadastrada.");
            })
    });
});
