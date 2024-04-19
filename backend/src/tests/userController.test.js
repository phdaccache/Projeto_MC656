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

describe("POST /insert_user responses", () => {
    it("should insert a new user", async () => {
        const newUser = {
            name: "Test User",
            birth_date: "2022-01-01",
            email: "testuseremail@gmail.com",
            school: "Test School",
            gender: "Test gender",
            phone_number: "95124-9087"
        };

        return request(app)
            .post("/insert_user")
            .send(newUser)
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('ok');
                expect(res.body.ok).toBe('User created');
            })
    });

    it("shouldn't allow duplicates", async () => {
        const newUser = {
            name: "Test User33",
            birth_date: "2022-01-01",
            email: "testuseremail33@gmail.com",
            school: "Test School",
            gender: "Test gender",
            phone_number: "95124-9087"
        };

        // Primeira
        await request(app)
                .post("/insert_user")
                .send(newUser)
                .expect(200);

        return request(app)
            .post("/insert_user")
            .send(newUser)
            .expect(400)
            .then((res) => {
                expect(res.body).toHaveProperty('ok');
                expect(res.body.ok).toBe("User already exists");
            })
    });
});