import productModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";

/**
 * @route POST api/product/create
 * @description Seller can create a product
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Next} next
 */
export async function createProductController(req, res, next) {
  try {
    const { title, description, price } = req.body;
    const { id } = req.user;

    if (!title || !description || !price) {
      return next({
        status: 400,
        message: "All fields are required !",
      });
    }

    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: price,
        currency: "INR",
      },
      seller: id,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route GET api/product
 * @description Gets all the product created by a seller
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getProductController(req, res, next) {
  try {
    const { id } = req.user;
    const products = await productModel.find({ seller: id });
    if (!products) {
      return next({
        status: 404,
        message: "No products has been created by the user !",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully !",
      products,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/products
 * @description Fetches all products
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').Response} next
 */
export async function getAllProductsController(req, res, next) {
  try {
    const products = await productModel.find();
    if (!products) {
      return next({
        status: 404,
        message: "No products exist !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully !",
      products,
    });
  } catch (err) {
    next(err);
  }
}
