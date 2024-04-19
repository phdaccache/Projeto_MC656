const request = require("supertest");
const app = require("../app");

describe("GET /list_olympiad responses", () => {
    it("should be 200", async () => {
        return request(app)
                .get("/list_olympiad")
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                })
    });

    it("should be empty", async () => {
        return request(app)
                .get("/list_olympiad")
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual([]);
                })
    });
});