import request from "supertest";
import app from "../testApp.js";
import { registerAndLogin, setupTestDb } from "../utils/sharedUtils.js";
import { connectDb } from "../../src/db/config.js";
import dbInit from "../../src/db/init.js";
import clearUsers from "../Clear/ClearUsers.js";

let token;
let cookie;
let savedSearchId;

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
      .set("Authorization", `Bearer ${token}`) // Send token in headers
      .set("Cookie", cookie) // Send cookie
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

  it("should fetch all search history for logged in user", async () => {
    // First, add a known search to ensure there is at least one
    await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie)
      .send({ query: "openverse mountains" });

    const res = await request(app)
      .get("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Search history fetched successfully");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty("query");
    // Save one searchId for next test
    savedSearchId = res.body.data[0].id;
  });

  it("should return 401 when fetching search history without auth", async () => {
    const res = await request(app).get("/api/search-history");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should fetch a single search history item by ID", async () => {
    const res = await request(app)
      .get(`/api/search-history/${savedSearchId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Search fetched successfully");
    expect(res.body.search).toHaveProperty("id", savedSearchId);
    expect(res.body.search).toHaveProperty("query");
  });

  it("should return 401 for unauthenticated single search fetch", async () => {
    const res = await request(app).get(`/api/search-history/${savedSearchId}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should return 404 for invalid search ID", async () => {
    const res = await request(app)
      .get("/api/search-history/9999999") // assuming this doesn't exist
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);

    // Depends on whether your service throws 404 for missing searches
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch("No such history exist");
  });
});
describe("Search History API - DELETE operations", () => {
  let savedSearchId;

  beforeAll(async () => {
    // Save a search so we have something to delete later
    const res = await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie)
      .send({ query: "to-be-deleted" });

    savedSearchId = res.body.data.id;
  });

  it("should delete a single search history item by ID", async () => {
    const res = await request(app)
      .delete(`/api/search-history/${savedSearchId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Search history deleted successfully");
  });

  it("should return 404 if trying to delete a non-existent search item", async () => {
    const res = await request(app)
      .delete("/api/search-history/999999") // assuming this ID doesn't exist
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("No such history exist");
  });

  it("should delete all search history for the user", async () => {
    // First, create multiple entries
    await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie)
      .send({ query: "bulk-delete-1" });

    await request(app)
      .post("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie)
      .send({ query: "bulk-delete-2" });

    // Delete all
    const res = await request(app)
      .delete("/api/search-history")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Search history deleted successfully");
  });

  it("should return 401 if not authenticated", async () => {
    const res = await request(app)
      .delete("/api/search-history");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });
});
