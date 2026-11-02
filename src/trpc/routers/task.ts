import { createTask, deleteTask, getTask, listTasks, updateTask } from "@/server/task-repository";
import { baseProcedure, createTRPCRouter } from "../init";
import { createTaskInput, taskSchema, updateTaskInput } from "@/lib/task";
import { TRPCError } from "@trpc/server";

const taskIdInput = taskSchema.pick({ id: true })

export const taskRouter = createTRPCRouter({
  list: baseProcedure.query(() => listTasks()),

  getById: baseProcedure
    .input(taskIdInput)
    .query(({ input }) => {
      const task = getTask(input.id)

      if (!task) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })
      }

      return task
    }),


  createTask: baseProcedure
    .input(createTaskInput)
    .mutation(({ input }) => createTask(input)),

  updateTask: baseProcedure
    .input(updateTaskInput.extend(taskIdInput.shape))
    .mutation(({ input }) => {
      const { id, ...data } = input
      updateTask(id, data)
    }),

  deleteTaks: baseProcedure
    .input(taskIdInput)
    .mutation(({ input }) => {
      if (!deleteTask(input.id)) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })
      return { id: input.id }
    })
})
