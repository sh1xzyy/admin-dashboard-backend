import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/products.js";
import { parseFilters } from "../utils/filters/parseFilters.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filters = parseFilters(req.query);
  const products = await getProducts({ page, perPage, filters });

  res.status(200).json({
    status: 200,
    message: "Successfully get products",
    data: products,
  });
};

export const addProductController = async (req, res) => {
  const newProduct = await addProduct(req);

  res.status(201).json({
    status: 201,
    message: "Successfully added new product",
    data: newProduct,
  });
};

export const updateProductController = async (req, res) => {
  const updatedProduct = await updateProduct(req);

  res.status(200).json({
    status: 200,
    message: "Successfully updated product",
    data: updatedProduct,
  });
};

export const deleteProductController = async (req, res) => {
  await deleteProduct(req);

  res.status(200).json({
    status: 200,
    message: "Successfully delete product",
  });
};
