import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";
import { Suspense } from "react";
import { ErrorBoundary } from "./error-boundary";
import { connection } from "next/server";

async function Greeting() {
  await connection()
  prefetch(trpc.hello.queryOptions({ text: 'world' }))

  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  )
}

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Greeting />
      </Suspense>
    </ErrorBoundary>
  );
}
