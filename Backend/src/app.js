import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "../routes/auth.routes.js";
import errorMiddleware from "../middleware/errorMiddleware.js";
import cors from "cors";
import { config } from "../config/config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "DELETE"],
  }),
);
// routes
app.use("/api/auth/", authRouter);

app.use(errorMiddleware);
export default app;
