import request from "supertest";
import app from "../testApp.js";
import { registerAndLogin, setupTestDb } from "../utils/sharedUtils.js";
import { connectDb } from "../../src/db/config.js";
import dbInit from "../../src/db/init.js";
import clearUsers from "../Clear/ClearUsers.js";

let token;
let cookie;

beforeAll(async () => {
  await setupTestDb({ connectDb, dbInit, clearUsers });

  // Register and login a test user
  const auth = await registerAndLogin();
  token = auth.token;
  cookie = auth.cookie;
});

afterAll(async () => {
  await clearUsers();
});

describe("Search History API", () => {
  it("should save a search query for logged in user", async () => {
    const res = await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)  // Send token in headers
      .set("Cookie", cookie)                    // Send cookie
      .send({ query: "openverse sunset" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Search history created successfully");
    expect(res.body.data.query).toBe("openverse sunset");
  });

  it("should return 422 for missing query input", async () => {
    const res = await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie)
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Unprocessable Entity");
  });

  it("should return 401 for unauthorized access", async () => {
    const res = await request(app)
      .post("/api/search-history")
      .send({ query: "openverse sunset" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });
});
