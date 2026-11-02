'use client'

import { createTRPCContext } from "@trpc/tanstack-react-query"
import type { AppRouter } from "./routers/_app"
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { makeQueryClient } from "./query-client"
import { useState } from "react"
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import superjson from "superjson"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new one if we don't have one already
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
  })()
  return `${base}/api/trpc`
}

export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson
        })
      ]
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
