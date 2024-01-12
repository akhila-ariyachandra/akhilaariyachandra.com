import "server-only";

import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(connection);
