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
    const { title, description, price, stock } = req.body;
    const { id } = req.user;

    if (!title || !description || !price || !stock) {
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
      stock,
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
 * @route GET api/product/
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
 * @route POST api/product/products
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

/**
 * @route POST api/product/:productId
 * @description Fetches a particular product info
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function fetchProductDetailController(req, res, next) {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next({
        status: 404,
        message: "Product Id missing",
      });
    }
    const productDetail = await productModel
      .findOne({ _id: productId })
      .populate("seller");
    if (!productDetail) {
      return next({
        status: 404,
        message: "Invalid product Id !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched Detail",
      productDetail,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route PUT api/product/:product
 * @description Updates the product (Only seller)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateProductController(req, res, next) {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { updatedTitle, updatedDescription, updatedPrice, updatedStock } =
      req.body;

    const product = await productModel.findOne({
      seller: id,
      _id: productId,
    });

    if (!product) {
      return next({
        status: 404,
        message: "Invalid Product!",
      });
    }

    product.title = updatedTitle || product.title;
    product.description = updatedDescription || product.description;
    product.price.amount = updatedPrice || product.price.amount;
    product.stock = updatedStock || product.stock;

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product Updated successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/product/:productId/variant
 * @description Adds variant to a specific Product
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function addVariantController(req, res, next) {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    const product = await productModel.findOne({
      seller: id,
      _id: productId,
    });

    if (!product) {
      return next({
        status: 400,
        message: "Invalid Product !",
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

    const { stock, price, ...attributes } = req.body;

    product.variant.push({
      images,
      stock: Number(stock),
      price: {
        amount: Number(price),
        currency: "INR",
      },
      attributes,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Variant Added successfully !",
      product,
    });
  } catch (err) {
    next(err);
  }
}
