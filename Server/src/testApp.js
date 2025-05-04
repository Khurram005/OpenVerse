import 'dotenv/config'
import express from "express";
import session from "express-session"
import allRouter from '../src/Router/AllRouter.js'

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "testsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // must be false in tests
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// Routes
app.use("/api", allRouter);

export default app;
