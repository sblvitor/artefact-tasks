import { cache } from 'react'
import 'server-only'
import { makeQueryClient } from './query-client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { createTRPCContext } from './init'
import { appRouter } from './routers/_app'
import { dehydrate, HydrationBoundary, InfiniteQueryExecuteOptions, noop, QueryExecuteOptions, QueryKey } from '@tanstack/react-query'

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}

export function prefetch<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey>(
  queryOptions: QueryExecuteOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
) {
  void getQueryClient().query(queryOptions).catch(noop)
}

export function prefetchInfinite<TQueryFnData, TError, TData, TQueryKey extends QueryKey, TPageParam>(
  queryOptions: InfiniteQueryExecuteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
) {
  void getQueryClient().infiniteQuery(queryOptions).catch(noop)
}
