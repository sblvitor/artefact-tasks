import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createTaskInput, CreateTaskInput, Task } from "@/lib/task";
import z from "zod";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type FieldErrors = Partial<Record<keyof CreateTaskInput, string[]>>

type TaskFormProps = {
  task?: Task
  isPending: boolean
  onSubmit: (data: CreateTaskInput) => void
}

export function TaskForm({ task, isPending, onSubmit }: TaskFormProps) {
  const isEditing = task !== undefined

  const [errors, setErrors] = useState<FieldErrors>({})

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const result = createTaskInput.safeParse(Object.fromEntries(formData))

    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" name="title" defaultValue={task?.title} aria-invalid={!!errors.title} />
          <FieldError errors={errors.title?.map((message) => ({ message }))} />
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea id="description" name="description" defaultValue={task?.description} aria-invalid={!!errors.description} />
          <FieldError errors={errors.description?.map((message) => ({ message }))} />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose render={<Button disabled={isPending} variant="outline">Cancel</Button>} />
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner />}
          {!isEditing ? 'Create task' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  )
}
