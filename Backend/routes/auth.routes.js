import {Router} from "express"
import { validateRegistrationUser } from "../validation/authValidation.js";
import authController from "../controller/authController.js"

const router = Router();

router.post('/register', validateRegistrationUser, authController.handleRegister)

export default router