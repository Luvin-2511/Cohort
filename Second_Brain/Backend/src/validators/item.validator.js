import { body, query, param } from "express-validator";

export const saveItemValidator = [
  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Invalid URL format"),
];

export const searchItemValidator = [
  query("q")
    .notEmpty()
    .withMessage("Search query 'q' is required")
    .isString()
    .withMessage("Search query must be a string"),
];

export const relatedItemValidator = [
  param("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isMongoId()
    .withMessage("Invalid itemId format"),
];
