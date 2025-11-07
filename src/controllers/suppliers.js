import {
  addSupplier,
  getSuppliers,
  updateSupplier,
} from "../services/suppliers.js";
import { parseFilters } from "../utils/filters/parseFilters.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getSuppliersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filters = parseFilters(req.query);
  const suppliers = await getSuppliers({ page, perPage, filters });

  res.status(200).json({
    status: 200,
    message: "Successfully get suppliers",
    data: suppliers,
  });
};

export const addSupplierController = async (req, res) => {
  const addedSupplier = await addSupplier(req);

  res.status(201).json({
    status: 201,
    message: "Successfully add supplier",
    data: addedSupplier,
  });
};

export const updateSupplierController = async (req, res) => {
  const updatedSupplier = await updateSupplier(req);

  res.status(201).json({
    status: 201,
    message: "Successfully updated supplier",
    data: updatedSupplier,
  });
};
