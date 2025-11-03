import "dotenv/config";

export const getEnvVar = (key, defaultValue) => {
  return process.env[key] || defaultValue;
};
