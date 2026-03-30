import { body, validationResult } from "express-validator";

function validate(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: error.array(),
    });
  }

  next();
}

export function registerValidator() {
  return [
    body("username")
      .isAlpha()
      .withMessage("Name should only contain alphabets")
      .isLength({ min: 4, max: 12 })
      .withMessage("Name should be between 4 to 12 letters"),

    body("email").isEmail().withMessage("Enter valid email").trim(),

    body("password").isStrongPassword().withMessage("Enter a strong Password"),
    validate,
  ];
}

export function loginValidator() {
  return [
    body("email").isEmail().withMessage("Enter valid email").normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),

    validate,
  ];
}
