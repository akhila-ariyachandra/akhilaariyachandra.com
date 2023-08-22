import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/connection";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};
