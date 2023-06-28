import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("listening to PORT ", PORT);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);
