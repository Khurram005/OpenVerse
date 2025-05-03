import "dotenv/config";
import express from "express";
import { connectDb } from "./db/config.js";
import dbInit from "./db/init.js";

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

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is listening at http://localhost:${PORT}`);
  } else {
    console.log("Something went wrong while listening to the server.");
  }
});
