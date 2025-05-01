import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is listening at http://localhost:${PORT}`);
  } else {
    console.log("Something went wrong while listening to the server.");
  }
});
