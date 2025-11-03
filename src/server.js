import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.get("/", async (req, res) => {
    res.status(200).json({
      status: 200,
      message: "Successfully my brother",
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(getEnvVar("PORT", 3000));

  app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
};
