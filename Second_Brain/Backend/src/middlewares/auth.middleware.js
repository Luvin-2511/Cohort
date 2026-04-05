import jwt from 'jsonwebtoken'

/**
 * @route Middleware
 * @description Checks whether user is authenticated or not
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function authMiddleware(req, res,next) {
  let token = req.cookies.token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  if(!token){
    return next({
        status:400,
        message:"Unauthorized access !"
    })
  }
  
  try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  }catch(err){
    next({
        status:400,
        message:"Unauthorized access"
    })
  }
}