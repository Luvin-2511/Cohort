import productModel from "../model/product.model.js";
import wishlistModel from "../model/wishlist.mode.js";
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
    const { title, description, price, stock, brand, category, size } =
      req.body;
    const { id } = req.user;

    if (!title || !description || !price || !stock || !brand) {
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
      brand,
      category,
      size,
      seller: id,
      images,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully !",
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

/**
 * @route DELETE api/product/:productId
 * @description description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function deleteProductController(req, res, next) {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    const product = await productModel.findOneAndDelete({
      seller: id,
      _id: productId,
    });

    if (!product) {
      return next({
        status: 404,
        message: "Product doesn't Exist !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully !",
      product,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route POST api/product/wishlist/:productId
 * @description Add a product to the wishlist
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function addToWishlistController(req, res, next) {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    if (!productId) {
      return next({
        status: 400,
        message: "Product Id is required !",
      });
    }

    const isProductValid = await productModel.findOne({
      _id: productId,
    });

    if (!isProductValid) {
      return next({
        status: 404,
        message: "Product not found !",
      });
    }

    const alreadyInWishlist = await wishlistModel.findOne({
      product: productId,
      user: id,
    });

    if (alreadyInWishlist) {
      return next({
        status: 400,
        message: "Product already in wishlist!",
      });
    }

    const wishlist = await wishlistModel.create({
      product: productId,
      user: id,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist !",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route DELETE api/product/wishlist
 * @description Removes a product to the wishlist
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function RemoveWishlistController(req, res, next) {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    if (!productId) {
      return next({
        status: 400,
        message: "Product Id is required !",
      });
    }

    const isProductValid = await productModel.findOne({
      _id: productId,
    });

    if (!isProductValid) {
      return next({
        status: 404,
        message: "Product not found !",
      });
    }

    const wishlist = await wishlistModel.findOneAndDelete({
      product: productId,
      user: id,
    });

    if (!wishlist) {
      return next({
        status: 400,
        message: "Product not in wishlist!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product removed from wishlist!",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route GET api/product/wishlist
 * @description Fetches wishlist for a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function fetchWishlistController(req, res, next) {
  try {
    const { id } = req.user;
    const wishlist = await wishlistModel
      .find({
        user: id,
      })
      .populate("product");

    if (!wishlist) {
      return next({
        status: 400,
        message: "No product in wishList !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully !",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
}
