import jwt from "jsonwebtoken";
import { config } from "../config/config.js"
import User from "../models/userModel.js"

async function authMiddleware(req, res, next){
    try {
        const token = req.cookies.token;
        if(!token){
            const error = new Error("token must be provided");
            error.statusCode = 401;
            return next(error);
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            const error = new Error("No user found");
            error.statusCode = 401;
            return next(error);
        }

        if(user.role !== "seller"){
            const error = new Error("Forbidden");
            error.statusCode = 403;
            return next(error);
        }
        req.user = user;
        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
}

export default authMiddleware;