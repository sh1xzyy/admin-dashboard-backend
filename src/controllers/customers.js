import { customer } from "../services/customers.js";

export const customersController = async (req, res) => {
  const data = await customer(req, res);

  res.status(200).json({
    status: 200,
    message: "Successfully get customer info",
    data,
  });
};
