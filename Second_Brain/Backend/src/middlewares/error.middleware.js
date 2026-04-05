export async function errorHandler(err,req,res,next) {
    if(!err) return next();
    return res.status(err.status || 500).json({
        success:false,
        message:err.message || "Internal server error !"
    })
}