import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import type { Task } from "@/lib/task";

type DeleteTaskDialogProps = {
  task: Task
}

export function DeleteTaskDialog({ task }: DeleteTaskDialogProps) {
  const [open, setOpen] = useState(false)

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(trpc.task.delete.mutationOptions({
    onSuccess: () => {
      // Close first so the dialog animates out before the card leaves the list.
      setOpen(false)
      queryClient.invalidateQueries(trpc.task.list.pathFilter())
      toast.add({
        type: 'success',
        description: 'Task deleted!'
      })
    },
    onError: (error) => {
      toast.add({
        type: 'error',
        title: 'Something went wrong.',
        description: error.message
      })
    }
  }))

  const handleDelete = () => {
    deleteMutation.mutate({ id: task.id })
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && deleteMutation.isPending) return
    setOpen(nextOpen)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Delete task "${task.title}"`}>
            <Trash2 className="text-destructive" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete task?</AlertDialogTitle>
          <AlertDialogDescription className="wrap-break-word">
            &ldquo;{task.title}&rdquo; will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
