import type { Config } from "drizzle-kit";

export default {
  schema: "./app/_db/new-schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
