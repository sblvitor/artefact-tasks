import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { taskRouter } from "./task";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`
      }
    }),
  task: taskRouter,
})

export type AppRouter = typeof appRouter
