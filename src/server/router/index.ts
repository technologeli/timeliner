// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { timelineRouter } from "./timeline";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("timeline.", timelineRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
