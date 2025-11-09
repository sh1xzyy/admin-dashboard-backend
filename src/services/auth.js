import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";

export const registerUser = async (req) => {
  const { email, password } = req.body;
  const user = await UsersCollection.findOne({ email });

  if (user) throw createHttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollection.create({
    ...req.body,
    password: hashedPassword,
  });

  const { password: pass, ...userWithoutPass } = newUser.toObject();

  return { user: userWithoutPass };
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersCollection.findOne({ email });

  if (!user) throw createHttpError(401, "Email or password is invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare)
    throw createHttpError(401, "Email or password is invalid");

  const newAccessToken = jwt.sign(
    { userId: user._id },
    getEnvVar("ACCESS_TOKEN_SECRET"),
    {
      expiresIn: "15m",
    }
  );
  const newRefreshToken = jwt.sign(
    { userId: user._id },
    getEnvVar("REFRESH_TOKEN_SECRET"),
    {
      expiresIn: "7d",
    }
  );

   res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const { email: usersEmail } = user.toObject();

  return { user: { email: usersEmail }, accessToken: newAccessToken };
};

export const refreshUser = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(400, "No refresh token provided");
  }

  const decoded = jwt.verify(refreshToken, getEnvVar("REFRESH_TOKEN_SECRET"));

  const user = await UsersCollection.findById(decoded.userId);
  if (!user) {
    throw createHttpError(401, "User not found");
  }

  const newAccessToken = jwt.sign(
    { userId: user._id },
    getEnvVar("ACCESS_TOKEN_SECRET"),
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id },
    getEnvVar("REFRESH_TOKEN_SECRET"),
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    accessToken: newAccessToken,
  };
};

export const logoutUser = async (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
  });
};

export const userInfo = async (req) => {
  const user = await UsersCollection.findById({ _id: req.user.id });

  const { password, ...dataWithoutPass } = user.toObject();
  return dataWithoutPass;
};
