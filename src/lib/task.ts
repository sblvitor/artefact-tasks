import z from "zod";

export const taskSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1, { error: 'Title is required' }),
  description: z.string().trim().optional(),
  createdAt: z.date()
})

export type Task = z.infer<typeof taskSchema>

export const createTaskInput = taskSchema.pick({ title: true, description: true })
export type CreateTaskInput = z.infer<typeof createTaskInput>

export const updateTaskInput = createTaskInput
export type UpdateTaskInput = z.infer<typeof updateTaskInput>

export const taskCursorSchema = taskSchema.pick({ id: true, createdAt: true })
export type TaskCursor = z.infer<typeof taskCursorSchema>

export const TASK_PAGE_SIZE = 12

export const listTasksInput = z.object({
  limit: z.number().int().min(1).max(50).default(TASK_PAGE_SIZE),
  cursor: taskCursorSchema.nullish()
})
export type ListTasksInput = z.infer<typeof listTasksInput>
