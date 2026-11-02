import z from "zod";

export const TASK_TITLE_MAX_LENGTH = 100
export const TASK_DESCRIPTION_MAX_LENGTH = 500

export const taskSchema = z.object({
  id: z.uuid(),
  title: z.string()
    .trim()
    .min(1, { error: 'Title is required' })
    .max(TASK_TITLE_MAX_LENGTH, { error: `Title must be at most ${TASK_TITLE_MAX_LENGTH} characters` }),
  description: z.string()
    .trim()
    .max(TASK_DESCRIPTION_MAX_LENGTH, { error: `Description must be at most ${TASK_DESCRIPTION_MAX_LENGTH} characters` })
    .optional(),
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
