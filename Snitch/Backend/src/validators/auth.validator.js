import {body, validationResult} from 'express-validator'

function validate(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

export function registrationValidation(req,res,next){
    body('email').isEmail().withMessage("Invalid Email !").trim(),
    body('username').isAlpha().withMessage("Username must only contain alphabet !"),
    body("password").isAlpha().withMessage(),
    validate
}

export function loginValidation(req,res,next){
    body('email').isEmail().withMessage("Invalid Email !").trim(),
    body("password").isAlpha().withMessage(),
    validate
}
