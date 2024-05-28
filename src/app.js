import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// Routes to import after creating user routes

import userRouter from "./routes/user.routes.js";
import canvaRouter from "./routes/canva.routes.js"

// routes Declaration
app.use("/api/users", userRouter);

app.use("/api/canva", canvaRouter);

export { app };

