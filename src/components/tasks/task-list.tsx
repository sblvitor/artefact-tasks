'use client'

import { ListTodo, Plus } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { TaskCard } from "./task-card"
import { TaskFormDialog } from "./task-form-dialog"
import { TASK_PAGE_SIZE } from "@/lib/task"
import { Spinner } from "../ui/spinner"

export function TaskList() {
  const trpc = useTRPC()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.task.list.infiniteQueryOptions(
        { limit: TASK_PAGE_SIZE },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
      )
    )

  const tasks = data.pages.flatMap((page) => page.items)

  function observeLoadMore(node: HTMLDivElement | null) {
    if (!node || !hasNextPage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage()
      },
      { rootMargin: '200px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }

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
    <div className="flex flex-col gap-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      <div ref={observeLoadMore} className="flex justify-center py-4 text-muted-foreground">
        {isFetchingNextPage ? <Spinner /> : !hasNextPage && <span>You&apos;re all caught up.</span>}
      </div>
    </div>
  )
}
