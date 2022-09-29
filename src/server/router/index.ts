// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { timelineRouter } from "./timeline";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("timeline.", timelineRouter)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
