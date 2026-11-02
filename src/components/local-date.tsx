import { useSyncExternalStore } from "react"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})

function subscribe() {
  return () => {}
}

type LocalDateProps = {
  date: Date
  className?: string
}

// Server and browser may be in different time zones, so the date is only
// formatted on the client to avoid a hydration mismatch.
export function LocalDate({ date, className }: LocalDateProps) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false)

  return (
    <time dateTime={date.toISOString()} className={className}>
      {isClient ? dateFormatter.format(date) : null}
    </time>
  )
}
