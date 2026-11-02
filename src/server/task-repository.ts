import 'server-only'

import type { CreateTaskInput, Task, UpdateTaskInput } from '@/lib/task'

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

export function listTasks(): Task[] {
  return Array.from(tasks.values())
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
