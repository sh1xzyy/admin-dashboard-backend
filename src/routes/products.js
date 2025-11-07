import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  addProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get("/", authenticate, ctrlWrapper(getProductsController));

productsRouter.post("/", authenticate, ctrlWrapper(addProductController));

productsRouter.put(
  "/:productId",
  authenticate,
  ctrlWrapper(updateProductController)
);

productsRouter.delete(
  "/:productId",
  authenticate,
  ctrlWrapper(deleteProductController)
);
