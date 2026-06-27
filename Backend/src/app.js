import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "../routes/auth.routes.js"
import errorMiddleware from "../middleware/errorMiddleware.js";

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/auth/",authRouter);

// health check
app.get("/",(req, res)=>{
    res.status(200).json({Message: "Server is running"})
})


app.use(errorMiddleware)
export default app;