import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import "server-only";

if (!process.env.DATABASE_URL || !process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("Database environment variables not provided");
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
