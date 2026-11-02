'use client'

import { catchError, ErrorInfo } from "next/error";

function ErrorFallback(_props: object, { retry }: ErrorInfo) {
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}

export const ErrorBoundary = catchError(ErrorFallback)
