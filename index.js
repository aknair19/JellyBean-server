import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
const PORT = 8000;
dotenv.config();
const app = express();

app.use("/", Router);

app.listen(PORT, () => {
  console.log("listening to PORT ", PORT);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
