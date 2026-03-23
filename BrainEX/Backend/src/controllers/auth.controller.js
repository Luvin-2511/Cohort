import userModel from '../model/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import blackListModel from '../model/blacklist.model.js';

/**
 * @route POST api/auth/register
 * @description Registers a user to the website
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function registerController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Fill all field correctly !",
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or:[
        {email:email},
        {username:username}
    ]
  })

  if(isUserAlreadyExists){
    return res.status(409).json({
        success:false,
        message:"User already exists !"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    email:email,
    username:username,
    password:hashPassword
  })

  const token = jwt.sign({
    id:user._id,
    username:username
  },process.env.JWT_SECRET)

  res.cookie("token", token)

  return res.status(201).json({
    success:true,
    message:"User registered successfully !",
    user
  })
}

/**
 * @route POST api/auth/login
 * @description Logs in a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function loginController(req, res) {
  const {email,password} = req.body
  if(!email || !password){
    return res.status(401).json({
        success:false,
        message:"Fill all fields correctly !"
    })
  }

  const user = await userModel.findOne({
    email:email
  }).select("+password")

  if(!user){
    return res.status(404).json({
        success:false,
        message:"Incorrect email or password !"
    })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if(!isValidPassword){
    return res.status(400).json({
        success:false,
        message:"Incorrect email or password"
    })
  }

  const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET)

  res.cookie("token",token)

  return res.status(201).json({
    success:true,
    message:"User logged in successfully !"
  })
}


/**
 * @route POST api/auth/logout
 * @description description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logoutController(req, res) {
  const {token} = req.cookies
  await blackListModel.create({
    token:token
  })
  res.clearCookie("token")
  return res.status(201).json({
    success:true,
    message:"User logout Successfully !"
  })
}

/**
 * @route POST api/auth/get-me
 * @description Fetches the user detail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getMeController(req, res) {
  const {id} = req.user
  if(!id){
    return res.status(404).json({
      success:false,
      message:"Id not found !"
    })
  }
  const user = await userModel.findById(id)
  return res.status(200).json({
    success:true,
    message:"User fetched successfully !",
    user
  })
}