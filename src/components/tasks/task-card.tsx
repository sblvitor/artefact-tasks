import { CalendarDays, Pencil } from "lucide-react"
import type { Task } from "@/lib/task"
import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { LocalDate } from "../local-date"
import { TaskFormDialog } from "./task-form-dialog"

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base wrap-break-word">{task.title}</CardTitle>
        <CardAction>
          <TaskFormDialog
            task={task}
            trigger={
              <Button variant="ghost" size="icon-sm" aria-label={`Edit task "${task.title}"`}>
                <Pencil />
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        {task.description ? (
          <p className="line-clamp-4 whitespace-pre-line wrap-break-word text-muted-foreground">
            {task.description}
          </p>
        ) : (
          <p className="text-muted-foreground/60 italic">No description</p>
        )}
      </CardContent>
      <CardFooter className="gap-1.5 text-muted-foreground">
        <CalendarDays className="size-3.5" aria-hidden />
        <span>Created</span>
        <LocalDate date={task.createdAt} />
      </CardFooter>
    </Card>
  )
}
