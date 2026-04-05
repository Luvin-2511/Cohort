import mongoose from "mongoose";
import itemModel from "../models/item.model.js";
import { generateTags, generateEmbedding } from "../services/ai.service.js";
import { detectType, extractContent } from "../services/extractor.service.js";

/**
 * @route POST api/item/save-item
 * @description Saves the item that user will provide the url and type off
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function saveItemController(req, res, next) {
  try {
    const { id } = req.user;
    const { url } = req.body;
    const type = detectType(url)
    if (!url || !type) {
      return next({
        status: 400,
        message: "Fill all the fields properly",
      });
    }

    const isItemAlreadyExist = await itemModel.findOne({
      userId: id,
      url: url,
    });

    if (isItemAlreadyExist) {
      return next({
        status: 409,
        message: "You have already added this URL",
      });
    }

    const extracted = await extractContent(url, type);

    const item = await itemModel.create({
      userId: id,
      url: url,
      type: type,
      title: extracted?.title || "",
      content: extracted?.content || "",
      thumbnailUrl: extracted?.thumbnailUrl || "",
    });

    if (!item) {
      return next({
        status: 400,
        message: "Something Wrong in saving item",
      });
    }

    const [itemTags, itemEmbeddings] = await Promisea.all([
      generateTags(item.content, item.title),
      generateEmbedding(item.content, item.title),
    ]);
    item.tags = itemTags;
    item.embedding = itemEmbeddings;
    await item.save();

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/item/get-item
 * @description Gets the item that user will provide the id off
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getItemController(req, res, next) {
  try {
    const { id } = req.user;
    if (!id) {
      return next({
        status: 400,
        message: "Id not found ",
      });
    }

    const items = await itemModel.find({ userId: id });

    return res.status(200).json({
      success: true,
      message: "Items fetched successfully !",
      items,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/item/search
 * @description Searches an item that user sets using embeddings
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function searchItemController(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return next({
        status: 400,
        message: "Query is required",
      });
    }
    const { id } = req.user;

    const embedded = await generateEmbedding(q, "");

    const matchedItems = await itemModel.aggregate([
      {
        $vectorSearch: {
          index: "vector_index_1",
          path: "embedding",
          queryVector: embedded,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $match: { userId: new mongoose.Types.ObjectId(id) },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Seach completed",
      matchedItems,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/item/:itemId/related
 * @description Gets related item to the item that is currently opened
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function relatedItemController(req, res, next) {
  try {
    const { itemId } = req.params;
    const { id } = req.user;
    if (!itemId) {
      return next({
        status: 400,
        message: "itemId is required !",
      });
    }
    const { embedding } = await itemModel.findById(itemId);

    if (!embedding) {
      return next({
        status: 400,
        message: "Invalid Item !",
      });
    }

    const relatedItems = await itemModel.aggregate([
      {
        $vectorSearch: {
          index: "vector_index_1",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $match: { userId: new mongoose.Types.ObjectId(id) },
        _id: { $ne: new mongoose.Types.ObjectId(itemId) },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Fetched related items !",
      relatedItems,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/item/resurface
 * @description Gets all the items that user saved between 7 to 90 days and haven't opened much
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function resurfaceController(req, res, next) {
  try {
    const { id } = req.user;
    if (!id) {
      return next({
        status: 400,
        message: "Id is required !",
      });
    }
    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
    const thalaDaysAgo = now - 7 * 24 * 60 * 60 * 1000; //Thala for a reason
    const items = await itemModel
      .find({
        userId: id,
        createdAt: {
          $lte: thalaDaysAgo,
          $gte: ninetyDaysAgo,
        },
      })
      .sort({ viewCount: 1 })
      .limit(20);

    const resurfaced = items.sort(() => Math.random() - 0.5).slice(0, 3);

    return res.status(200).json({
      success: true,
      message: "Resurfaced Item Fetched !",
      items: resurfaced,
    });
  } catch (err) {
    next(err);
  }
}
