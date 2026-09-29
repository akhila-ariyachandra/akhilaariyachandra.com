import { ENV } from "varlock/env";

export const token = ENV.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
