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

async function handleLogin(req, res, next) {
  try {
    const { email, contact, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { contact }] })

    if (!user) {
      const error = new Error("User not found")
      error.statusCode = 400;
      return next(error);
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      const error = new Error("Invalid Credentials")
      error.statusCode = 400;
      return next(error);
    }

    await sendToken(user, res, "user logged in successfully")
  } catch (error) {
    next(error)
  }
}

async function getMeHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 400;
      return next(error);
    }
    return res.status(200).json({
      message: "user found",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function handleLogout(req, res, next) {
  try {

    res.clearCookie("token",{
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    })

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error)
  }
}

async function googleCallback( req, res, next){

  console.log(req.user);
  const {id, displayName, emails, photos} = req.user;

  const email = emails[0].value;

  const profilePic = photos[0].value;

  //Check if the user is already Signed Up or not 

  let user = await User.findOne({email})

  //If user is not present in the DB create it 
  if(!user){
    user = await User.create({
      email,
      googleId : id,
      fullname : displayName,

    })
  }


  const payload = {
    id : id, 
  }

  //generate token and sign it 
  const token = jwt.sign(payload, config.JWT_SECRET,{expiresIn:"1d"} )

  // set token in cookies.
  res.cookie("token", token);

  //cannot use sendToken as it sends res to use we want the use to redirect.


  res.redirect("http://localhost:5173/home");
}

export default { handleRegister, handleLogin, getMeHandler, handleLogout,googleCallback };
