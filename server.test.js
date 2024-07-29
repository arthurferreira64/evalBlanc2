const jwt = require("jsonwebtoken");
const app = require("./server.js");
const request = require("supertest");

describe("POST /api/vehicles", () => {
    const token = jwt.sign({ id: 1 }, "OEKFNEZKkF78EZFH93023NOEAF", {
        expiresIn: 86400,
    });

    it("return 201", async () => {
        const vehicleData = {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            client_id: 2,
            registration_plate: 'ABC123'
        };

        const response = await request(app)
            .post("/api/vehicles")
            .set("Cookie", [`token=${token}`])
            .set("Content-Type", "application/json")
            .send(vehicleData);
        console.log(response)
        expect(response.status).toBe(201);
    });
});
