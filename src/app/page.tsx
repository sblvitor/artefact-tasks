import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "../components/error-boundary";
import { connection } from "next/server";
import { TaskList } from "@/components/tasks/task-list";

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
    <main className="container flex flex-col flex-1 mx-auto p-8">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold">Tasks</h1>
      </header>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskListSection />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
