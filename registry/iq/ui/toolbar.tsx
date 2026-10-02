import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Toolbar (343:24907). Stack Horizontal | Vertical; Filter Bar and Actions slots.
// Horizontal: the filter bar fills the row (and wraps), actions sit at the end. Vertical: filters above actions.

type ToolbarProps = React.ComponentProps<"div"> & {
  stack?: "horizontal" | "vertical"
  /** Raised surface with border and padding (default). Off when the toolbar sits inside another header. */
  surface?: boolean
  /** Filter controls: Search Bar, Dropdowns, Date Picker, Toggle… */
  filters?: React.ReactNode
  /** Actions: usually a Dropdown and a Primary Button. */
  actions?: React.ReactNode
}

/** Toolbar: filters on one side, actions on the other. */
function Toolbar({ stack = "horizontal", surface = true, filters, actions, className, children, ...props }: ToolbarProps) {
  const vertical = stack === "vertical"
  return (
    <div
      data-slot="toolbar"
      data-stack={stack}
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex gap-(--toolbar-gap)",
        vertical ? "flex-col items-start" : "flex-row items-center",
        surface && "border border-(--toolbar-border) bg-(--toolbar-surface) px-(--toolbar-px) py-(--toolbar-py)",
        className
      )}
      {...props}
    >
      {filters && (
        <div data-slot="toolbar-filters" className={cn("flex min-w-0 flex-wrap items-center gap-(--toolbar-gap)", vertical ? "w-full" : "flex-1")}>
          {filters}
        </div>
      )}
      {children}
      {actions && (
        <div data-slot="toolbar-actions" className="flex shrink-0 items-center gap-(--toolbar-gap)">
          {actions}
        </div>
      )}
    </div>
  )
}

/** Vertical rule between filter groups: 1px at white 8%, 8px either side, as tall as the row. */
function ToolbarDivider({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="toolbar-divider" role="separator" aria-orientation="vertical" className={cn("flex self-stretch px-2", className)} {...props}>
      <span className="w-px bg-(--toolbar-divider)" />
    </span>
  )
}

export { Toolbar, ToolbarDivider }
export type { ToolbarProps }
