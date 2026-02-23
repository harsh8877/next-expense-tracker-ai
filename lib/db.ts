import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient().$extends({
    model: {
      user: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async findUser(this: any, args: { where: { clerkUserId: string } }) {
          return this.findUnique(args);
        },
      },
    },
  });
};

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
