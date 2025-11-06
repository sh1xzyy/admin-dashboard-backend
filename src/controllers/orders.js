import { getOrders } from "../services/orders.js";
import { parseCustomersFilters } from "../utils/filters/parseCustomersFilter.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getOrdersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filters = parseCustomersFilters(req.query);
  const orders = await getOrders({ page, perPage, filters });

  res.status(200).json({
    status: 200,
    message: "Successfully get orders",
    data: orders,
  });
};
