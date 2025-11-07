import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  addSupplierController,
  getSuppliersController,
  updateSupplierController,
} from "../controllers/suppliers.js";

export const suppliersRouter = Router();

suppliersRouter.get("/", authenticate, ctrlWrapper(getSuppliersController));

suppliersRouter.post("/", authenticate, ctrlWrapper(addSupplierController));

suppliersRouter.put(
  "/:supplierId",
  authenticate,
  ctrlWrapper(updateSupplierController)
);
