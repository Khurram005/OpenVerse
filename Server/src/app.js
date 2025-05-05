import "dotenv/config";
import express from "express";
import sequelize, { connectDb } from "./db/config.js";
import dbInit from "./db/init.js";
import allRouter from "./Router/AllRouter.js";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// Db connection and sync
connectDb();
dbInit()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.log(error);
  });

// session management
const mySequelizeStore = new SequelizeStore(Session.Store);
const mySequelizeStore1 = new mySequelizeStore({ db: sequelize });
mySequelizeStore1.sync();

app.use(
  Session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySequelizeStore1,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //one month expiration
    },
  })
);

app.use("/api", allRouter);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is listening at http://localhost:${PORT}`);
  } else {
    console.log("Something went wrong while listening to the server.");
  }
});
