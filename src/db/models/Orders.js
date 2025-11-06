import { model, Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Completed",
        "Confirmed",
        "Pending",
        "Cancelled",
        "Processing",
        "Shipped",
        "Delivered",
      ],
      required: true,
    },
    order_date: {
      type: String,
      default: () => {
        const date = new Date();
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
  },
  { versionKey: false }
);

export const OrdersCollection = model("orders", ordersSchema);
