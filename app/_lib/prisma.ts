import { PrismaClient } from "generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
