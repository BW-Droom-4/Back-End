const server = require("../api/server");
const request = require("supertest");

 describe("companies routes", () => {
	it("should return 200", async () => {
		const checklog = await request(server)
		.post("/api/auth/companies/login")
		.send({
			email: "companyk@gmail.com",
			password: "lamdb123"
		})
		.set("Content-Type", "application/json");
		console.log(checklog.body.token)
		await request(server)
			.get("/api/companies")
			.set("Content-Type", "application/json")
			.set("Authorization", checklog.body.token)
			.then(result => {
				expect(result.status).toBe(200);
			});
	});
	
	it("should return a token", () => {
		return request(server)
			.post("/api/auth/companies/login")
			.send({
				email: "companyk@gmail.com",
				password: "lamdb123"
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then(result => {
				expect(result.body.token.length).toBeGreaterThan(50);
				expect(result.status).toBe(200);
			});
	});
	

	it("should get company by id", async () => {
		const login = await request(server)
			.post("/api/auth/companies/login")
			.send({
				email: "companyk@gmail.com",
				password: "lamdb123"
			})
			.set("Content-Type", "application/json");

		const companies = await request(server)
			.get("/api/companies/1")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(companies.body);
		expect(companies.status).toBe(200);
	});


	it("should get company by id", async () => {
		const login = await request(server)
			.post("/api/auth/companies/login")
			.send({
				email: "companyk@gmail.com",
				password: "lamdb123"
			})
			.set("Content-Type", "application/json");

		const companies = await request(server)
			.get("/api/companies/2")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);


		expect(companies.body).toMatchObject(
			{
                "0": {
                    "id": 2,
                    "companyName": "Google, Inc.",
                    "email": "google@gmail.com",
                    "password": "qwerty123456",
                    "role": "Hiring Company",
                    "created_at": "2020-02-05 20:33:32",
                    "updated_at": "2020-02-05 20:33:32"
                },
                "images": [
                    {
                        "id": 2,
                        "company_image": "b.png"
                    }
                ]                        
            }
		);
	});

	it("should get company profile by id", async () => {
		const login = await request(server)
			.post("/api/auth/companies/login")
			.send({
				email: "companyk@gmail.com",
				password: "lamdb123"
			})
			.set("Content-Type", "application/json");

		const companies = await request(server)
			.get("/api/companies/1/profile")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		expect(companies.status).toBe(200);
    });

    it("should delete joblisting of company by id", async () => {
		const login = await request(server)
			.post("/api/auth/companies/login")
			.send({
				email: "companyk@gmail.com",
				password: "lamdb123"
			})
			.set("Content-Type", "application/json");

		const companies = await request(server)
			.del("/api/companies/6/joblisting/9")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(companies.body);
		expect(companies.status).toBe(200);
	});


});