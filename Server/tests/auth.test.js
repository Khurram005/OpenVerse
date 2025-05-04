import request from "supertest";
import app from '../src/testApp.js'
import clearUsers from "../src/Clear/ClearUsers.js"
import { connectDb } from "../src/db/config.js";
import dbInit from "../src/db/init.js";

beforeAll(async () => {
  connectDb();
  await dbInit();
});

afterAll(async () => {
  await clearUsers(); // final cleanup after all tests
});

describe("Auth Flow: Register and Login", () => {
  it("should return 422 for invalid registration input", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "notanemail",
      password: "123",
    });

    expect(res.statusCode).toBe(422);
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
  });

  it("should not allow duplicate email registration", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should return 401 for login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid password");
  });

  it("should return 422 for invalid login input", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "invalid-email",
      password: "123",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Unprocessable Entity");
  });

  it("should login the user with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body).toHaveProperty("token");
    expect(res.body.data.email).toBe("testuser@example.com");
  });
});
