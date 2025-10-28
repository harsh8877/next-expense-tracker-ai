import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: (ReturnType<typeof createPrismaClient>) | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient().$extends({
    model: {
      user: {
        async findUser(args: { where: { clerkUserId: string } }) {
          return (this as any).findUnique(args);
        },
      },
    },
  });
};

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
