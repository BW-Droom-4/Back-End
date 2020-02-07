const server = require("../api/server");
const request = require("supertest");

describe("users routes", () => {
	it("should return 200", async () => {
		const checklog = await request(server)
		.post("/api/auth/users/login")
		.send({
			email: "kdahal@gmail.com",
			password: "lambda123"
		})
		.set("Content-Type", "application/json");
		console.log(checklog.body.token)
		await request(server)
			.get("/api/users")
			.set("Content-Type", "application/json")
			.set("Authorization", checklog.body.token)
			.then(result => {
				expect(result.status).toBe(200);
			});
	});
	
	it("should return a token", () => {
		return request(server)
			.post("/api/auth/users/login")
			.send({
				email: "kdahal@gmail.com",
				password: "lambda123"
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then(result => {
				expect(result.body.token.length).toBeGreaterThan(50);
				expect(result.status).toBe(200);
			});
	});
	

	it("should get user by id", async () => {
		const login = await request(server)
			.post("/api/auth/users/login")
			.send({
				email: "kdahal@gmail.com",
				password: "lambda123"
			})
			.set("Content-Type", "application/json");

		const users = await request(server)
			.get("/api/users/1")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(users.body);
		expect(users.status).toBe(200);
	});


	it("should get user by id", async () => {
		const login = await request(server)
			.post("/api/auth/users/login")
			.send({
				email: "kdahal@gmail.com",
				password: "lambda123"
			})
			.set("Content-Type", "application/json");

		const users = await request(server)
			.get("/api/users/5")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(users.body);

		expect(users.body).toMatchObject(
			{
                "0": {
                    "id": 5,
                    "firstname": "krishan",
                    "lastname": "dahaa",
                    "email": "kdahal@gmail.com",
                    "password": "$2a$10$WCUlsLF1YEyZ..HMKXs.guac0N/yGLuUxgVjs1mSdlNeU3z7Vqtui",
                    "role": "Job Seeker",
                    "created_at": "2020-02-06 00:06:04",
                    "updated_at": "2020-02-06 00:06:04"
                },
                "images": []
            }
		);
	});

	it("should get user profile by id", async () => {
		const login = await request(server)
			.post("/api/auth/users/login")
			.send({
				email: "kdahal@gmail.com",
				password: "lambda123"
			})
			.set("Content-Type", "application/json");

		const users = await request(server)
			.get("/api/users/1/profile")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(users.body);
		expect(users.status).toBe(200);
	});

});