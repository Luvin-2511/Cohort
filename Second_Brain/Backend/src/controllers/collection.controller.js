import collectionModel from "../models/collection.model.js";

/**
 * @route POST api/collection/create
 * @description Create a new collection
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createCollectionController(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      return next({
        status: 400,
        message: "Name is required to create collection !",
      });
    }
    const { id } = req.user;

    const isCollectionAlreadyExist = await collectionModel.findOne({
      name,
      userId: id,
    });

    if(isCollectionAlreadyExist){
        return next({
            status: 409,
            message:"Collection Already Exists !"
        })
    }

    const collection = await collectionModel.create({
        userId:id,
        name
    })

    return res.status(201).json({
        success:true,
        message:"Collection created successfully !",
        collection
    })

  } catch (err) {
    next(err);
  }
}


/**
 * @route GET api/collection/get
 * @description Gets all collection of user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getCollectionController(req, res, next) {
  try {
    const {id} = req.user;
    if(!id) {
        return next({
            status: 400,
            message:"Id is required !"
        })
    }

    const collections = await collectionModel.find({
        userId:id
    })

    return res.status(200).json({
        success:true,
        message:"Fetched all collection !",
        collections
    })
  }catch(err){
    next(err)
  }
}
