import { model, Schema } from "mongoose";
import { emailRegex, phoneRegex } from "../../constants/index.js";

const customersSchema = new Schema({
  photo: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: emailRegex,
  },
  spent: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: phoneRegex,
    required: true,
  },
  register_date: {
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
});

export const CustomersCollection = model("customers", customersSchema);
