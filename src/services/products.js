import createHttpError from "http-errors";
import { ProductsCollection } from "../db/models/Products.js";

export const getProducts = async ({ page, perPage, filters }) => {
  const skip = (page - 1) * perPage;

  const filterQuery = {};

  if (filters?.name) {
    filterQuery.name = filters.name;
  }

  const products = await ProductsCollection.find(filterQuery)
    .skip(skip)
    .limit(perPage);

  const total = await ProductsCollection.countDocuments(filterQuery);
  const totalPages = Math.ceil(total / perPage);

  return { products, total, totalPages };
};

export const addProduct = async (req) => {
  const { name } = req.body;

  const existing = await ProductsCollection.findOne({ name });

  if (existing) {
    throw createHttpError(400, "Product already exist");
  }

  const newProduct = await ProductsCollection.create(req.body);
  return newProduct;
};

export const updateProduct = async (req) => {
  const { productId } = req.params;

  const product = await ProductsCollection.findById(productId);

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  const updatedProduct = await ProductsCollection.findByIdAndUpdate(
    product._id,
    req.body,
    { new: true }
  );

  return updatedProduct;
};

export const deleteProduct = async (req) => {
  const { productId } = req.params;

  const product = await ProductsCollection.findById(productId);

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  await ProductsCollection.findByIdAndDelete(productId);
};
