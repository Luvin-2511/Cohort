import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({
    errors: errors.array(),
  });
};

export const registrationValidation = [
  body("email").isEmail().withMessage("Fill email field correctly").trim(),

  body("username")
    .isAlpha()
    .withMessage("Username must only contain alphabet"),

    validation
];
