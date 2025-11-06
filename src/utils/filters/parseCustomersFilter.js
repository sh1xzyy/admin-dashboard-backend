export const parseCustomersFilters = ({ name }) => {
  if (name && typeof name === "string") return { name };
};
