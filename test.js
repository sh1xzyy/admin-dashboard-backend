import { CustomersCollection } from "./src/db/models/Customers.js";
import { OrdersCollection } from "./src/db/models/Orders.js";

const customers = await CustomersCollection.find();
const orders = await OrdersCollection.find();

for (let i = 0; i < customers.length; i++) {
  const order = orders[i];

  if (order) {
    customers[i].order_ids.push(order._id);
    await customers.save();
  }
}
