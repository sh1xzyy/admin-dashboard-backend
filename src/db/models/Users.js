import { model, Schema } from "mongoose";
import { emailRegex } from "../../constants/index.js";

const usersSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const UsersCollection = model("users", usersSchema);
