import mongoose from "mongoose";
import itemModel from "../models/item.model.js";
import { generateTags, generateEmbedding, generateInsights } from "../services/ai.service.js";
import { detectType, extractContent, uploadFileToImageKit } from "../services/extractor.service.js";

/**
 * @route POST api/item/save-file
 * @description Saves an uploaded file (image, video, pdf) directly to ImageKit
 */
export async function saveFileController(req, res, next) {
  try {
    const { id } = req.user;
    const file = req.file;
    const { title: customTitle, collectionId } = req.body;

    if (!file) {
      return next({ status: 400, message: "No file provided" });
    }

    const mimeType = file.mimetype;
    let type, folder;

    if (mimeType.startsWith("image/")) {
      type = "image";
      folder = "images";
    } else if (mimeType.startsWith("video/")) {
      type = "video";
      folder = "videos";
    } else if (mimeType === "application/pdf") {
      type = "pdf";
      folder = "pdfs";
    } else {
      return next({ status: 400, message: "Unsupported file type. Only image, video, and PDF allowed." });
    }

    const uploaded = await uploadFileToImageKit(file.buffer, file.originalname, mimeType, folder);

    const title = customTitle?.trim() || file.originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const content = type === "pdf" ? `PDF: ${file.originalname}` : "";

    const isAlreadyExist = await itemModel.findOne({ userId: id, url: uploaded.url });
    if (isAlreadyExist) {
      return next({ status: 409, message: "This file has already been saved" });
    }

    const item = await itemModel.create({
      userId: id,
      url: uploaded.url,
      type,
      title,
      content,
      thumbnailUrl: type === "image" ? uploaded.url : "",
      collectionId: collectionId || null,
    });

    const [itemTags, itemEmbeddings, itemInsights] = await Promise.all([
      generateTags(content, title),
      generateEmbedding(content, title),
      generateInsights(content, title, type),
    ]);

    item.tags = itemTags;
    item.embedding = itemEmbeddings;
    item.aiInsights = itemInsights;
    await item.save();

    return res.status(201).json({
      success: true,
      message: "File saved successfully",
      item,
    });
  } catch (err) {
    next(err);
  }
}



/**
 * @route POST api/item/save-item
 * @description Saves the item that user will provide the url and type off
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function saveItemController(req, res, next) {
  try {
    const { id } = req.user;
    const { url, collectionId } = req.body;
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
      collectionId: collectionId || null,
    });

    if (!item) {
      return next({
        status: 400,
        message: "Something Wrong in saving item",
      });
    }

    const [itemTags, itemEmbeddings, itemInsights] = await Promise.all([
      generateTags(item.content, item.title),
      generateEmbedding(item.content, item.title),
      generateInsights(item.content, item.title, type),
    ]);
    item.tags = itemTags;
    item.embedding = itemEmbeddings;
    item.aiInsights = itemInsights;
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
 * @route GET api/item/:itemId
 * @description Gets a single item by id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getSingleItemController(req, res, next) {
  try {
    const { itemId } = req.params;
    const { id: userId } = req.user;

    if (!itemId) {
      return next({ status: 400, message: "itemId is required" });
    }

    const item = await itemModel.findOne({ _id: itemId, userId });

    if (!item) {
      return next({ status: 404, message: "Item not found" });
    }

    // Increment viewCount for algorithms
    item.viewCount = (item.viewCount || 0) + 1;
    await item.save();

    return res.status(200).json({
      success: true,
      message: "Item fetched successfully",
      item,
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
    if (!q || q.trim().length < 2) {
      return next({
        status: 400,
        message: "Query must be at least 2 characters",
      });
    }
    const { id } = req.user;

    const embedded = await generateEmbedding(q, "");

    const itemsWithScores = await itemModel.aggregate([
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
      {
        $project: {
          title: 1,
          content: 1,
          type: 1,
          url: 1,
          thumbnailUrl: 1,
          tags: 1,
          createdAt: 1,
          viewCount: 1,
          aiInsights: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]);

    console.log(`[Search] Query: "${q}"`);
    
    // HYBRID SEARCH BOOST:
    // Pure vector search struggles with short, 1-2 word queries (like "game") because Mistral 
    // considers many things "loosely related" (all videos ~ 0.80 similarity).
    // We manually boost the score if the query words literally appear in the titles or tags.
    const queryLower = q.toLowerCase();
    const boostedItems = itemsWithScores.map(item => {
      let boost = 0;
      const titleLower = (item.title || "").toLowerCase();
      const contentLower = (item.content || "").toLowerCase();
      
      if (titleLower.includes(queryLower)) boost += 0.05;
      else if (contentLower.includes(queryLower)) boost += 0.02;
      
      return { ...item, originalScore: item.score, score: item.score + boost };
    }).sort((a, b) => b.score - a.score); // Re-sort by boosted score

    boostedItems.forEach((item) => {
      console.log(`  -> ${item.score.toFixed(3)} (boost: ${item.score > item.originalScore ? "yes" : "no"}) | ${item.title}`);
    });

    let matchedItems = [];
    if (boostedItems.length > 0) {
      const topScore = boostedItems[0].score;
      
      // Strict thresholding based on the boosted top score
      if (topScore >= 0.78) {
        // 1) Must be highly relevant OR
        // 2) Must be within a very tight 1.5% margin (0.015) of the absolute best match
        matchedItems = boostedItems.filter((item) => {
          return item.score >= 0.86 || (item.score >= 0.78 && topScore - item.score <= 0.015);
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Search completed",
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

/**
 * @route DELETE api/item/:itemId
 * @description Deletes a single item from the user's library
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteItemController(req, res, next) {
  try {
    const { itemId } = req.params;
    const { id } = req.user;

    if (!itemId) {
      return next({ status: 400, message: "itemId is required!" });
    }

    const item = await itemModel.findOne({ _id: itemId, userId: id });

    if (!item) {
      return next({ status: 404, message: "Item not found or unauthorized" });
    }

    await itemModel.findByIdAndDelete(itemId);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

