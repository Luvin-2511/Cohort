import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    message: errors.array(),
  });
};

export const renameValidator = [
  body("name")
    .notEmpty()
    .withMessage("Username can't be empty")
    .isLength({ min: 5, max: 12 })
    .withMessage("Username should be between 5 to 12 letters !"),

    validation
];
