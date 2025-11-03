import { getEnvVar } from "../utils/getEnvVar.js";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createHttpError(401, "Authorization header is missing"));
  }

  const [bearer, accessToken] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(
      createHttpError(401, "Authorization header must be Bearer type")
    );
  }

  const decoded = jwt.verify(accessToken, getEnvVar("ACCESS_TOKEN_SECRET"));

  req.user = { id: decoded.userId };

  next();
};
