import { authRouter } from "./router/auth";
import { noteRoute } from "./router/note";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  hello: publicProcedure.query(() => {
    return { message: "hello world" };
  }),
  note: noteRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
