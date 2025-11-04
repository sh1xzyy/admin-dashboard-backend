import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  userInfo,
} from "../services/auth.js";

export const registerController = async (req, res) => {
  const data = await registerUser(req, res);

  res.status(201).json({
    status: 201,
    message: "Successfully registered",
    data,
  });
};

export const loginController = async (req, res) => {
  const data = await loginUser(req, res);

  res.status(201).json({
    status: 201,
    message: "Successfully login",
    data,
  });
};

export const refreshController = async (req, res) => {
  const { accessToken } = await refreshUser(req, res);

  res.status(201).json({
    status: 201,
    message: "Successfully login",
    data: {
      accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  await logoutUser(res);

  res.status(200).json({
    status: 200,
    message: "Successfully logged out",
  });
};

export const userInfoController = async (req, res) => {
  const data = await userInfo(req);

  res.status(200).json({
    status: 200,
    message: "Successfully retrieved user information",
    data,
  });
};
