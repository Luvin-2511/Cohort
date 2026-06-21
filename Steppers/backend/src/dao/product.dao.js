import productModel from "../model/product.model.js";

export async function stockOfProduct(productId, variantId) {
  let product =
    (await productModel.findOne({
      _id: productId,
      "variant._id": variantId,
    })) ||
    (await productModel.findOne({
      _id: productId,
    }));

  const variant = product.variant.find(
    (item) => item.id.toString() === variantId.toString(),
  );
  const stock = variant ? variant.stock : product.stock;

  return stock;
}
