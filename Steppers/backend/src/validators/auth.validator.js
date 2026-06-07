import { body, validationResult } from "express-validator";

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  next();
};

export const registerValidator = [
  body("email").isEmail().withMessage("Enter a valid email").trim(),

  body("name")
    .isAlpha()
    .withMessage("Name should contain alphabets only")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Name should contain minimum 3 and maximum 12 letters"),

  body("password")
    .isStrongPassword({
      minLength: 5,
      minLowercase: 3,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Enter a strong password"),

  validator,
];

export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email").trim(),

  body("password").notEmpty().withMessage("Password is required"),

  validator,
];
