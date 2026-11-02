'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Task } from "@/lib/task";
import { ReactElement, useState } from "react";
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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!isEditing ? 'New task' : 'Update task'}
          </DialogTitle>
          <DialogDescription>
            {!isEditing ? 'Create a new task' : 'You can change the title and description of this task'}
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={task} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
