'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CreateTaskInput, Task } from "@/lib/task";
import { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "../ui/toast";
import { TaskForm } from "./task-form";

type TaskFormDialogProps = {
  task?: Task
  trigger: ReactElement
}

export function TaskFormDialog({
  task,
  trigger
}: TaskFormDialogProps) {

  const isEditing = task !== undefined
  const [open, setOpen] = useState(false)

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  function handleSuccess(message: string) {
    queryClient.invalidateQueries({ queryKey: trpc.task.list.queryKey() })
    toast.add({
      type: 'success',
      description: message
    })
    setOpen(false)
  }

  function handleError(error: { message: string }) {
    toast.add({
      type: 'error',
      title: 'Something went wrong.',
      description: error.message
    })
  }

  const create = useMutation(trpc.task.create.mutationOptions({
    onSuccess: () => handleSuccess('Task created successfully!'),
    onError: handleError
  }))

  const update = useMutation(trpc.task.update.mutationOptions({
    onSuccess: () => handleSuccess('Task updated successfully!'),
    onError: handleError
  }))

  const isPending = create.isPending || update.isPending

  function handleSubmit(data: CreateTaskInput) {
    if (isEditing) {
      update.mutate({ id: task.id, ...data })
    } else {
      create.mutate(data)
    }
  }

  // Esc, outside click and the close button all go through here,
  // so ignoring the close request keeps the dialog open while saving.
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && isPending) return
    setOpen(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={trigger} />
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>
            {!isEditing ? 'New task' : 'Update task'}
          </DialogTitle>
          <DialogDescription>
            {!isEditing ? 'Create a new task' : 'You can change the title and description of this task'}
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={task} isPending={isPending} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
