import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  userInfoController,
} from "../controllers/auth.js";
import { authenticate } from "../middleware/authenticate.js";

export const authRouter = Router();

authRouter.post("/register", ctrlWrapper(registerController));

authRouter.post("/login", ctrlWrapper(loginController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.get("/logout", authenticate, ctrlWrapper(logoutController));

authRouter.get("/user-info", authenticate, ctrlWrapper(userInfoController));
