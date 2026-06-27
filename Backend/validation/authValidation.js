import { body, validationResult } from "express-validator";

// express-validator is middleware used to validate incoming request data.

function validateRequest(req, res, next) {
  const errors = validationResult(req);   //Collects all validation errors and returns it.
  if (!errors.isEmpty()) {
    const err = new Error("Validation Failed");
    err.statusCode = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
}

export const validateRegistrationUser = [
  body("email").isEmail().withMessage("Invalid Email Format"),
  body("contact")
    .notEmpty()
    .withMessage("contact is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be between 10 to 15 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password cannot be empty anf must be 6 characters long"),
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("Username is required and must be 3 characters long"),
  body("isSeller").isBoolean().withMessage("must be boolean"),
  validateRequest,
];
