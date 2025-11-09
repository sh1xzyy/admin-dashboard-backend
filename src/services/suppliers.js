import { SuppliersCollection } from "../db/models/Suppliers.js";

export const getSuppliers = async ({ page, perPage, filters }) => {
  const skip = (page - 1) * perPage;

  const filterQuery = {};

  if (filters?.name) {
    filterQuery.name = filters.name;
  }

  const suppliers = await SuppliersCollection.find(filterQuery)
    .skip(skip)
    .limit(perPage);

  const total = await SuppliersCollection.countDocuments(filterQuery);
  const totalPages = Math.ceil(total / perPage);

  return { suppliers, total, totalPages };
};

export const addSupplier = async (req) => {
  const { name } = req.body;

  const existing = await SuppliersCollection.findOne({ name });

  if (existing) {
    throw createHttpError(400, "Supplier already exist");
  }

  const newSupplier = await SuppliersCollection.create(req.body);
  return newSupplier;
};

export const updateSupplier = async (req) => {
  const { supplierId } = req.params;

  const supplier = await SuppliersCollection.findById(supplierId);

  if (!supplier) {
    throw createHttpError(404, "Supplier not found");
  }

  const updatedSupplier = await SuppliersCollection.findByIdAndUpdate(
    supplier._id,
    req.body,
    { new: true }
  );

  return updatedSupplier;
};
