import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import projectRoutes from "./routes/project.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

connect();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;
