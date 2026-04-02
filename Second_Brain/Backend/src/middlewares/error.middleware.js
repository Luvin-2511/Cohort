export async function errorHandler(err,req,res,next) {
    if(!err) return next();
    return err.status(err.status).json({
        success:false,
        message:err.message || "Internal server error !"
    })
}