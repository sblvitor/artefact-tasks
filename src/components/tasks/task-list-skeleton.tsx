import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export function TaskListSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading tasks...</span>
      <ul aria-hidden className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index}>
            <Card className="h-full">
              <CardHeader>
                <Skeleton className="h-5 w-2/3" />
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-3 w-40" />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
