import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { dashboardController } from "../controllers/dashboard.js";

export const dashBoardRouter = Router();

dashBoardRouter.get("/", ctrlWrapper(dashboardController));
