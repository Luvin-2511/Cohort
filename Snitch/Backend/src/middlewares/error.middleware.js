export function errorHandler(err, req, res, next) {
    if(!err) return next();
    res.status(err.status || 500).json({
        success: false,
        message:err.message || 'Internal Server Error'
    })
}