import { CustomersCollection } from "../db/models/Customers.js";
import { IncomeExpensesCollection } from "../db/models/IncomeExpenses.js";
import { ProductsCollection } from "../db/models/Products.js";
import { SuppliersCollection } from "../db/models/Suppliers.js";

export const dashboard = async (req, res) => {
  // Fetch all required data with error handling
  const [allProducts, allSuppliers, allCustomers, finances] = await Promise.all(
    [
      ProductsCollection.find().exec(),
      SuppliersCollection.find().exec(),
      CustomersCollection.find().exec(),
      IncomeExpensesCollection.find().exec(),
    ]
  );

  const recentCustomers = allCustomers.slice(-5).reverse();

  const recentCustomersCorrectData = recentCustomers.map(
    ({ _id, name, email, photo, spent }) => {
      return {
        _id,
        photo,
        name,
        email,
        spent,
      };
    }
  );

  return {
    allProducts: allProducts.length,
    allSuppliers: allSuppliers.length,
    allCustomers: allCustomers.length,
    recentCustomers: recentCustomersCorrectData,
    finances,
  };
};
