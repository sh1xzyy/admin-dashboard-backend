import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/auth.js";

export const setupServer = () => {
  const app = express();

  app.use(
    cors({
      origin: [getEnvVar("LOCAL_URL"), getEnvVar("DEPLOYED_URL")],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/user", authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(getEnvVar("PORT", 3000));

  app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
};
