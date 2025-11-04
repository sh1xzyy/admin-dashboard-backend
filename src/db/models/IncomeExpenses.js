import { model, Schema } from "mongoose";

const incomeExpensesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Expense", "Income", "Error"],
    required: true,
  },
});

export const IncomeExpensesCollection = model(
  "income-expenses",
  incomeExpensesSchema
);
