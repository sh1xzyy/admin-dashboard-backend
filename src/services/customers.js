import createHttpError from "http-errors";
import { CustomersCollection } from "../db/models/Customers.js";

export const customer = async (req, res) => {
  const { customerId } = req.params;

  const customer = await CustomersCollection.findById(customerId);

  if (!customer) return createHttpError("404", "Customer not found");

  return customer;
};
