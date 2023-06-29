import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoute.js";
import BlogRouter from "./routes/blogRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const PORT = process.env.PORT || 8000;

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/blog", BlogRouter);
//listen
app.listen(PORT, () => {
  console.log("listening to PORT ", PORT);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
