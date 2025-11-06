import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getOrdersController } from "../controllers/orders.js";

export const ordersRouter = Router();

ordersRouter.get("/", authenticate, ctrlWrapper(getOrdersController));
