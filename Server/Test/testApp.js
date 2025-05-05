import 'dotenv/config'
import express from "express";
import session from "express-session"
import allRouter from '../src/Router/AllRouter.js'

const testApp = express();

testApp.use(express.json());

testApp.use(
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
testApp.use("/api", allRouter);

export default testApp;
