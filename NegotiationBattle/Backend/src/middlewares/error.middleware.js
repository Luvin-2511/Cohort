/**
 * @route Middleware
 * @description Handles the error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function ErrorHandlerMiddleware(err, req, res, next) {
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error !",
        stack:process.env.NODE_DEV==="development"?err.stack:undefined
    })
}

