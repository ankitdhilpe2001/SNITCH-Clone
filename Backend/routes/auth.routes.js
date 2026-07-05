import {Router} from "express"
import { validateRegistrationUser, validateLogInUser } from "../validation/authValidation.js";
import authController from "../controller/authController.js"
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.post('/register', validateRegistrationUser, authController.handleRegister)

router.get('/get-me',authMiddleware, authController.getMeHandler);

router.post('/login',validateLogInUser, authController.handleLogin );

export default router