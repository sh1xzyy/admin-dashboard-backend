import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { dashboardController } from "../controllers/dashboard.js";
import { authenticate } from "../middleware/authenticate.js";

export const dashBoardRouter = Router();

dashBoardRouter.get("/", authenticate, ctrlWrapper(dashboardController));
