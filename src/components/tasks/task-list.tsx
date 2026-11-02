'use client'

import { ListTodo, Plus } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { TaskCard } from "./task-card"
import { TaskFormDialog } from "./task-form-dialog"

export function TaskList() {
  const trpc = useTRPC()
  const { data: tasks } = useSuspenseQuery(trpc.task.list.queryOptions())

  if (tasks.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListTodo />
          </EmptyMedia>
          <EmptyTitle>No tasks yet</EmptyTitle>
          <EmptyDescription>Create your first task to get started.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <TaskFormDialog
            trigger={
              <Button>
                <Plus />
                New task
              </Button>
            }
          />
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}
