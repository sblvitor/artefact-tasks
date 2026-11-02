import 'server-only'

import type { CreateTaskInput, ListTasksInput, Task, TaskCursor, UpdateTaskInput } from '@/lib/task'

const globalForTasks = globalThis as unknown as {
  tasks?: Map<string, Task>
}

const tasks = (globalForTasks.tasks ??= new Map<string, Task>())

export function createTask(input: CreateTaskInput): Task {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    createdAt: new Date()
  }

  tasks.set(newTask.id, newTask)

  return newTask
}

function byNewestFirst(a: Task, b: Task) {
  return b.createdAt.getTime() - a.createdAt.getTime() || b.id.localeCompare(a.id)
}

function isAfterCursor(task: Task, cursor: TaskCursor) {
  const timeDiff = task.createdAt.getTime() - cursor.createdAt.getTime()

  if (timeDiff !== 0) return timeDiff < 0

  return task.id.localeCompare(cursor.id) < 0
}

type TaskPage = {
  items: Task[]
  nextCursor: TaskCursor | null
}

export function listTasks({ cursor, limit }: ListTasksInput): TaskPage {

  const sorted = Array.from(tasks.values()).sort(byNewestFirst)
  const remaining = cursor
    ? sorted.filter((task) => isAfterCursor(task, cursor))
    : sorted

  const page = remaining.slice(0, limit + 1)
  const hasMore = page.length > limit
  const items = hasMore ? page.slice(0, limit) : page

  const last = items.at(-1)
  const nextCursor: TaskCursor | null =
    hasMore && last ? { id: last.id, createdAt: last.createdAt } : null

  return {
    items,
    nextCursor
  }
}

export function getTask(id: string): Task | undefined {
  return tasks.get(id)
}

export function updateTask(id: string, input: UpdateTaskInput): Task | undefined {
  const task = tasks.get(id)

  if (!task) return undefined

  const updatedTask: Task = {
    ...task,
    title: input.title,
    description: input.description,
  }

  tasks.set(id, updatedTask)
  return updatedTask
}

export function deleteTask(id: string): boolean {
  return tasks.delete(id)
}
