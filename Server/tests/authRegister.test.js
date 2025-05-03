import "dotenv/config"
import request from "supertest";
import express from "express";
import allRouter from "../src/Router/AllRouter.js";
import { connectDb } from "../src/db/config.js";
import dbInit from "../src/db/init.js";
import clearUsers from "../src/Clear/ClearUsers.js";
const app = express();
app.use(express.json());
app.use("/api", allRouter);

beforeAll(async () => {
  connectDb();
  await dbInit();
});

afterEach(async () => {
  await clearUsers()
})

describe("POST /api/auth/register", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
  });

  it("should not allow duplicate email registration", async () => {
    // First, create a user
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    // Try registering the same user again
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should return 422 for invalid input", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "notanemail",
      password: "123",
    });

    expect(res.statusCode).toBe(422);
  });
});
