import { CustomersCollection } from "../db/models/Customers.js";
import { OrdersCollection } from "../db/models/Orders.js";
import { ProductsCollection } from "../db/models/Products.js";

export const getOrders = async ({ page, perPage, filters = {} }) => {
  const skip = (page - 1) * perPage;
  const query = CustomersCollection.find()
    .populate("order_id")
    .populate("product_ids")
    .skip(skip)
    .limit(perPage);

  if (filters.name) {
    query.where("name").equals(filters.name);
  }

  const customers = await query;
  const total = await CustomersCollection.countDocuments();
  const totalPages = Math.ceil(total / perPage);

  const requiredCustomersData = customers.map(
    ({ name, address, photo, order_id, product_ids }) => ({
      name,
      address,
      photo,
      order_id,
      product_ids: product_ids.length,
    })
  );

  return { orders: requiredCustomersData, total, totalPages };
};
