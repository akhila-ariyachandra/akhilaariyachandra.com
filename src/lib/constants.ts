export const PRODUCTION_URL = import.meta.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${import.meta.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://localhost:4321";
