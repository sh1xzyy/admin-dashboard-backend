import createHttpError from "http-errors";
import { CustomersCollection } from "../db/models/Customers.js";

export const getCustomers = async ({ page, perPage, filters }) => {
  const skip = (page - 1) * perPage;

  const filterQuery = {};

  if (filters?.name) {
    filterQuery.name = filters.name;
  }

  const customer = await CustomersCollection.find(filterQuery)
    .skip(skip)
    .limit(perPage);

  const total = await CustomersCollection.countDocuments(filterQuery);
  const totalPages = Math.ceil(total / perPage);

  return { customer, total, totalPages };
};

export const getDefiniteCustomer = async (req) => {
  const { customerId } = req.params;

  const customer = await CustomersCollection.findById(customerId);

  if (!customer) return createHttpError("404", "Customer not found");

  return customer;
};
