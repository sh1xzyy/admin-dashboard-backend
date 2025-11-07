import { getCustomers, getDefiniteCustomer } from "../services/customers.js";
import { parseFilters } from "../utils/filters/parseFilters.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getCustomersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filters = parseFilters(req.query);
  const customers = await getCustomers({ page, perPage, filters });

  res.status(200).json({
    status: 200,
    message: "Successfully get customers",
    data: customers,
  });
};

export const getDefiniteCustomerController = async (req, res) => {
  const customer = await getDefiniteCustomer(req);

  res.status(200).json({
    status: 200,
    message: "Successfully get customer",
    data: customer,
  });
};
