import { ENV } from "varlock/env";

export const PRODUCTION_URL = ENV.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${ENV.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://localhost:3000";
