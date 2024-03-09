import type { Config } from "drizzle-kit";

export default {
  schema: "./app/_db/new-schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
