"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"

// Figma: IQ Capital CRM Design System → Selection Bar (2831:4830). Count, an actions slot and a Clear button.
// Swap the actions per table; turn Clear off when the screen dismisses another way.

type SelectionBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Number of selected items; shown as "8 selected" unless `label` is set. */
  count?: number
  label?: React.ReactNode
  /** Actions for the selection: Buttons and Dropdowns, Small size. */
  children?: React.ReactNode
  /** Shows the Clear button. */
  onClear?: () => void
  clearLabel?: React.ReactNode
  /** Shown while true; slides in and out. Defaults to count > 0 when `count` is given. */
  open?: boolean
}

/** Selection Bar: appears while rows are selected, with the count and bulk actions. */
function SelectionBar({ count, label, children, onClear, clearLabel = "Clear", open: openProp, className, ...props }: SelectionBarProps) {
  const open = openProp ?? (count === undefined ? true : count > 0)
  // Keep it mounted through the exit animation.
  const [mounted, setMounted] = React.useState(open)
  if (open && !mounted) setMounted(true)
  // Remember the last count so the text doesn't flash "0 selected" while sliding out.
  const [shown, setShown] = React.useState(count)
  if (open && count !== shown) setShown(count)

  if (!mounted) return null
  return (
    <div
      role="region"
      aria-label="Selection"
      data-slot="selection-bar"
      data-state={open ? "open" : "closed"}
      onAnimationEnd={() => {
        if (!open) setMounted(false)
      }}
      className={cn(
        "flex w-full items-center justify-between gap-4 border border-(--border-panel) bg-(--surface-raised) px-[calc(var(--selection-bar-px)-1px)] py-[calc(var(--selection-bar-py)-1px)]",
        // Figma draws the 1px border inside the 24 / 16px padding; subtract it so the bar stays 64px.
        "data-[state=open]:animate-[selection-bar-in_var(--selection-bar-motion)_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[selection-bar-out_var(--selection-bar-motion)_ease-in_forwards] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <p aria-live="polite" className="shrink-0 text-sm leading-normal font-medium whitespace-nowrap text-(color:--selection-bar-label) tabular-nums">
        {label ?? `${shown ?? 0} selected`}
      </p>
      <div className="flex min-w-0 items-center justify-end gap-(--selection-bar-gap)">
        {children && <div className="flex flex-wrap items-center justify-end gap-(--button-spacing-gap)">{children}</div>}
        {children && onClear && <span aria-hidden="true" className="h-4 w-px shrink-0 bg-(--border-panel)" />}
        {onClear && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            {clearLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export { SelectionBar }
export type { SelectionBarProps }
