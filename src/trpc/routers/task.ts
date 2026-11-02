import { createTask, deleteTask, getTask, listTasks, updateTask } from "@/server/task-repository";
import { baseProcedure, createTRPCRouter } from "../init";
import { createTaskInput, listTasksInput, taskSchema, updateTaskInput } from "@/lib/task";
import { TRPCError } from "@trpc/server";

const taskIdInput = taskSchema.pick({ id: true })

export const taskRouter = createTRPCRouter({
  list: baseProcedure
    .input(listTasksInput)
    .query(({ input }) => listTasks(input)),

  getById: baseProcedure
    .input(taskIdInput)
    .query(({ input }) => {
      const task = getTask(input.id)

      if (!task) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })
      }

      return task
    }),


  create: baseProcedure
    .input(createTaskInput)
    .mutation(({ input }) => createTask(input)),

  update: baseProcedure
    .input(updateTaskInput.extend(taskIdInput.shape))
    .mutation(({ input }) => {
      const { id, ...data } = input
      const updatedTask = updateTask(id, data)

      if (!updatedTask) throw new TRPCError({ code: 'NOT_FOUND', message: "Task not found" })

      return updatedTask
    }),

  delete: baseProcedure
    .input(taskIdInput)
    .mutation(({ input }) => {
      if (!deleteTask(input.id)) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })
      return { id: input.id }
    })
})
