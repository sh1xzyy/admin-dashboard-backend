import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getCustomersController,
  getDefiniteCustomerController,
} from "../controllers/customers.js";
import { authenticate } from "../middleware/authenticate.js";

export const customersRouter = Router();

customersRouter.get("/", authenticate, ctrlWrapper(getCustomersController));

customersRouter.get(
  "/:customerId",
  authenticate,
  ctrlWrapper(getDefiniteCustomerController)
);
