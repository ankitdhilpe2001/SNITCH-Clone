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
    const {
      email,
      contact,
      password,
      fullname: fullnameFromBody,
      fullName,
      isSeller,
      role,
    } = req.body;

    const fullname = fullnameFromBody || fullName;
    const resolvedRole =
      role === "seller" || isSeller === true ? "seller" : "buyer";

    if (!fullname) {
      const err = new Error("Full name is required");
      err.statusCode = 400;
      return next(err);
    }

    const existingUser = await User.findOne({ $or: [{ email }, { contact }] }); // check for existing user
    if (existingUser) {
      const err = new Error("User already exist");
      err.statusCode = 409;
      return next(err);
    }
    const user = await User.create({
      email,
      contact,
      password,
      fullname,
      role: resolvedRole,
    });
    await sendToken(user, res, "User registered SuccesFully");
  } catch (error) {
    next(error);
  }
}

async function handleLogin(req, res, next) {}

async function getMeHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "user found",
      user,
    });
  } catch (error) {
    next(error);
  }
}
export default { handleRegister, getMeHandler };
