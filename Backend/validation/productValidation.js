import { body, validationResult } from "express-validator";

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

export const productValidator = [
    body("title").notEmpty().withMessage("Title cannot be empty"),
    body("description").notEmpty().withMessage("Description cannot be empty").length(500),
    body("priceAmount").isNumeric().withMessage("Amount cannot be empty"),
    body("priceCurrency").isString().withMessage("Currency is required"),
    validateRequest
] 