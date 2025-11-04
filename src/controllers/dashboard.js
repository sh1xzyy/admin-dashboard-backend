import { dashboard } from "../services/dashboard.js";

export const dashboardController = async (req, res) => {
  const data = await dashboard(req, res);

  res.status(200).json({
    status: 200,
    message: "Successfully get dashboard info",
    data,
  });
};
