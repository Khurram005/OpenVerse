import request from "supertest";
import app from "../src/testApp.js";
import clearUsers from "../src/Clear/ClearUsers.js";
import { connectDb } from "../src/db/config.js";
import dbInit from "../src/db/init.js";

let token;
let cookie;

beforeAll(async () => {
  connectDb();
  await dbInit();
  await clearUsers();

  // Register a test user
  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });

  // Login to get token + cookie
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  token = loginRes.body.token;

  // ⚠️ FIX: Join cookies into one string
  cookie = loginRes.headers["set-cookie"].join("; ");
});

afterAll(async () => {
  await clearUsers();
});

describe("Search History API", () => {
  it("should save a search query for logged in user", async () => {
    const res = await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`) // ✅ Send token
      .set("Cookie", cookie)                   // ✅ Send joined cookie string
      .send({ query: "openverse sunset" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Search history created successfully");
    expect(res.body.data.query).toBe("openverse sunset");
  });

  it("should return 422 for missing query input", async () => {
    const res = await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`) // ✅ Send token
      .set("Cookie", cookie)                   // ✅ Send cookie for session
      .send({});

    expect(res.statusCode).toBe(422);
  });
});
