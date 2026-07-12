import {Router} from "express"
import { validateRegistrationUser, validateLogInUser } from "../validation/authValidation.js";
import authController from "../controller/authController.js"
import authMiddleware from "../middleware/AuthMiddleware.js";
import passport from "passport";
import {config} from "../config/config.js";

const router = Router();

router.post('/register', validateRegistrationUser, authController.handleRegister)

router.get("/google",passport.authenticate("google", {scope : ["profile", "email"]}) )

router.get("/google/callback",passport.authenticate("google",{
    session: false,
    failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
}),authController.googleCallback )

router.get('/get-me',authMiddleware, authController.getMeHandler);

router.post('/login',validateLogInUser, authController.handleLogin );

export default router