import type { Config } from "drizzle-kit";

export default {
  schema: "./app/_db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  dialect: "sqlite",
} satisfies Config;
