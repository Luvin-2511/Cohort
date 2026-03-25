/**
 * @route Middleware
 * @description Handles error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export function errorMiddleware(err,req,res,next){
    return res.status(err.status||500).json({
        success:false,
        message:err.message || "Internal server error !"
    })
}