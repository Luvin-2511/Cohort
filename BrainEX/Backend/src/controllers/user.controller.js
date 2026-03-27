import userModel from '../model/user.model.js';

/**
 * @route POST api/user/rename
 * @description User can change his username
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function renameController(req, res,next) {
  try {
    let {name} = req.body;
    if(!name){
        return next({
            status:400,
            message:"New username is required to change the name !"
        })
    }
    name = name.trim()

    const {id} = req.user;
    const user = await userModel.findById(id)
    if(user.username === name){
        return next({
            status:400,
            message:"You already have the same username !"
        })
    }

    const isUsernameExist = await userModel.findOne({username:name})

    if(isUsernameExist){
        return next({
            status:400,
            message:"Username already exist"
        })
    }

    user.username = name;
    await user.save()

    return res.status(201).json({
        success:true,
        message:"Username changed successful !",
        user
    })

  }catch(err){
    next(err)
  }
}