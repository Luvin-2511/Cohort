import { body, validationResult } from "express-validator";

function vaidate(req,res,next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success:false,
            errors:errors.array()
        })
    }
    next()
}

export function registrationValidator() {
  return [
    body("email").isEmail().withMessage("This field must be an email !").trim(),
    body("username").isString().withMessage("Username must be a String").isLength({min:3,max:12}).withMessage("Username must be between 3 and 12 letters").trim(),
    body("contactNumber").isMobilePhone('en-IN').withMessage("This field must be a valid Number"),
    body("password").isStrongPassword().withMessage("Enter a strong password").trim(),
    vaidate
  ];
}

export function loginValidator() {
  return [
    body("email").isEmail().withMessage("This field must be an email !").trim(),
    body("password").isStrongPassword().withMessage("Enter a strong password").trim(),
    vaidate
  ];
}
