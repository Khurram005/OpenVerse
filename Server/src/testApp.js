import "dotenv/config"
import express from "express";
import session from "express-session"; // Using express-session's in-memory store
import allRouter from "./Router/AllRouter.js"; // Adjust path if necessary

const testApp = express();
testApp.use(express.json());

// Use in-memory store for sessions during tests
testApp.use(
  session({
    secret: process.env.SESSION_SECRET || "testsecret", // fallback secret
    resave: false,
    saveUninitialized: true, // Session state stored in memory during tests
    store: new session.MemoryStore(), // In-memory session store for tests
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month expiration
    },
  })
);

// Use your original routes
testApp.use("/api", allRouter);

export default testApp;
