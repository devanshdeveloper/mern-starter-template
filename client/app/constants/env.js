// ENVS
export const NODE_ENV = import.meta.env.VITE_NODE_ENV || "production";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const MOCK_API = import.meta.env.VITE_MOCK_API === "Yes";

// CONSTANTS
export const PRODUCT_NAME = "Brihat Invoice";

// Helpers
export function isDevelopmentEnvironment() {
  return NODE_ENV === "development";
}
