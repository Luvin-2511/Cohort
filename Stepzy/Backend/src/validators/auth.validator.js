import { body, validationResult } from "express-validator";

function validator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  next();
}

export function loginValidator() {
  return [
    body("email").isEmail().withMessage("Invalid Email type").trim(),
    body("password")
      .isStrongPassword()
      .withMessage("Please enter a strong Password")
      .isLength({ min: 4, max: 12 })
      .withMessage("Password must be between 4 to 12 characters")
      .trim(),
    validator,
  ];
}
export function registerValidator() {
  return [
    body("fullName").isLength({min:3,max:12}).withMessage("Name must be between length of 3 and 12"),
    body("email").isEmail().withMessage("Invalid Email type").trim(),
    body("password")
      .isStrongPassword()
      .withMessage("Please enter a strong Password")
      .isLength({ min: 4, max: 12 })
      .withMessage("Password must be between 4 to 12 characters")
      .trim(),
    body("contactNo").isMobilePhone().withMessage("Enter a valid phone Number"),
    validator,
  ];
}
