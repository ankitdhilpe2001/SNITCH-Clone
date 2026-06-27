import { config } from "../config/config.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

async function sendToken(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  }); //sign and generate the token with user payload

  res.cookie("token", token); //set token in cookie on browser

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

async function handleRegister(req, res, next) {
  try {
    const { email, contact, password, fullname, isSeller } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { contact }] }); // check for existing user
    if (existingUser) {
      const err = new Error("User already exist");
      err.statusCode(409);
      return next(err);
    }
    const user = await User.create({
      email,
      contact,
      password,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });
    await sendToken(user, res, "User registered SuccesFully");
  } catch (error) {
    next(error);
  }
}

async function handleLogin(req, res, next) {}
export default { handleRegister };
