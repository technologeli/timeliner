import { z } from "zod";
import { createProtectedRouter } from "./context";

export const timelineRouter = createProtectedRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.timeline.create({
        data: { name: input.name, userId: ctx.session.user.id },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.timeline.findMany({
        where: { userId: ctx.session.user.id },
      });
    },
  })
  .query("get", {
    input: z.object({ name: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.timeline.findFirst({
        where: { name: input.name, userId: ctx.session.user.id },
      });
    },
  });
