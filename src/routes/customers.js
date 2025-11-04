import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { customersController } from "../controllers/customers.js";
import { authenticate } from "../middleware/authenticate.js";

export const customersRouter = Router();

customersRouter.get(
  "/:customerId",
  authenticate,
  ctrlWrapper(customersController)
);
