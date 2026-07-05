import jwt from "jsonwebtoken";
import { config } from "../config/config.js"

async function authMiddleware(req, res, next){
    try {
        const token = req.cookies.token;
        if(!token){
            const error = new Error("token must be provided");
            error.statusCode = 401;
            return next(error);
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded
        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
}

export default authMiddleware;