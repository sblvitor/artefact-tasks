import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { connection } from "next/server";
import { TaskList } from "@/components/tasks/task-list";
import { TaskListSkeleton } from "@/components/tasks/task-list-skeleton";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function TaskListSection() {
  await connection()
  prefetch(trpc.task.list.queryOptions())

  return (
    <HydrateClient>
      <TaskList />
    </HydrateClient>
  )
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tasks</h1>
          <p className="text-sm text-muted-foreground">Keep track of what needs to get done.</p>
        </div>
        <TaskFormDialog
          trigger={
            <Button>
              <Plus />
              New task
            </Button>
          }
        />
      </header>
      <ErrorBoundary>
        <Suspense fallback={<TaskListSkeleton />}>
          <TaskListSection />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
