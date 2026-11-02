'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export function TaskList() {
  const trpc = useTRPC()
  const { data: tasks } = useSuspenseQuery(trpc.task.list.queryOptions())

  return (
    <div>
      {tasks.map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
    </div>
  )
}
