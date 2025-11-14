import { CustomersCollection } from "../db/models/Customers.js";
import { OrdersCollection } from "../db/models/Orders.js";
import { ProductsCollection } from "../db/models/Products.js";

export const getOrders = async ({ page, perPage, filters = {} }) => {
  const skip = (page - 1) * perPage;

  const filterQuery = {};

  if (filters?.name) {
    filterQuery.name = filters.name;
  }

  const customers = await CustomersCollection.find(filterQuery)
    .populate("order_id")
    .populate("product_ids")
    .skip(skip)
    .limit(perPage);

  const total = await CustomersCollection.countDocuments(filterQuery);
  const totalPages = Math.ceil(total / perPage);

  const requiredCustomersData = customers.map(
    ({ _id, name, address, photo, order_id, product_ids }) => ({
      _id,
      name,
      address,
      photo,
      order_id,
      product_ids: product_ids.length,
    })
  );

  return { orders: requiredCustomersData, total, totalPages };
};
