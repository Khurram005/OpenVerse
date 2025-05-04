import request from "supertest";
import app from "../testApp.js";

export async function setupTestDb({ connectDb, dbInit, clearUsers }) {
  await connectDb();
  await dbInit();
  await clearUsers();
}

export async function registerAndLogin() {
  const email = `testuser12@example.com`;
  const password = "password123";

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password,
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const token = loginRes.body.token;
  const cookie = loginRes.headers["set-cookie"].join("; ");

  return { token, cookie, email, password };
}
