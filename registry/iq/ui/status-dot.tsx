import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Status Dot (248:3719).
// Tone is semantic (state of a record), not a Badge color.

type StatusTone = "neutral" | "positive" | "negative" | "warning" | "info"

const markClasses: Record<StatusTone, string> = {
  neutral: "bg-(--status-dot-neutral)",
  positive: "bg-(--status-dot-positive)",
  negative: "bg-(--status-dot-negative)",
  warning: "bg-(--status-dot-warning)",
  info: "bg-(--status-dot-info)",
}

type StatusDotProps = React.ComponentProps<"span"> & {
  tone?: StatusTone
  /**
   * Accessible name when there's no visible label (mark-only form).
   * With children, the label text is announced instead.
   */
  label?: string
}

function StatusDot({ tone = "neutral", label, children, className, ...props }: StatusDotProps) {
  const markOnly = children === undefined || children === null || children === false

  return (
    <span
      data-slot="status-dot"
      data-tone={tone}
      role={markOnly ? "img" : undefined}
      aria-label={markOnly ? (label ?? tone) : undefined}
      className={cn(
        "inline-flex items-center gap-2 text-sm leading-none font-medium whitespace-nowrap text-(color:--status-dot-label)",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className={cn("size-1.5 shrink-0", markClasses[tone])} />
      {children}
    </span>
  )
}

export { StatusDot }
export type { StatusDotProps, StatusTone }
