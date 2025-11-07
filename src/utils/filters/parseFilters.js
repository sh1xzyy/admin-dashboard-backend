export const parseFilters = ({ name }) => {
  if (name && typeof name === "string") return { name };
};
