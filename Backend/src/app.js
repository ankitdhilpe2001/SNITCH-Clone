import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.routes.js";
import productRouter from "../routes/product.routes.js"
import errorMiddleware from "../middleware/errorMiddleware.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../config/config.js";

const app = express();

app.use(passport.initialize());

const backendBaseUrl = "http://localhost:8080";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendBaseUrl}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

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
app.use("/api/auth", authRouter);
app.use("/api/product/", productRouter);

app.use(errorMiddleware);
export default app;
