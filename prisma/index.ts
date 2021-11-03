import { PrismaClient } from "@prisma/client";
export type { Page, Reaction } from "@prisma/client";

const prisma: PrismaClient = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = prisma;
}

export default prisma;
