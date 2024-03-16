import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import "server-only";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client);
