const request = require("supertest");
const app = require("../app");

describe("GET /list_user responses", () => {
    it("should be 200", async () => {
        return request(app)
                .get("/list_user")
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                })
    });

    it("should be empty", async () => {
        return request(app)
                .get("/list_user")
                .expect(200)
                .then((res) => {
                    expect(res.body.user_list).toEqual([]);
                })
    });
});