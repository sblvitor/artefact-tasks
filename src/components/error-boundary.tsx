'use client'

import { catchError, ErrorInfo } from "next/error";
import { RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

function ErrorFallback(_props: object, { retry }: ErrorInfo) {
  return (
    <Empty className="border border-destructive/30">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>We couldn&apos;t load this content. Please try again.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={() => retry()}>
          <RotateCw />
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export const ErrorBoundary = catchError(ErrorFallback)
