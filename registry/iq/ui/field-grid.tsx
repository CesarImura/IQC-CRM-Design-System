"use client"

import * as React from "react"
import { Checkmark, Copy } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"
import { Empty, type EmptyProps } from "@/registry/iq/ui/empty"

// Figma: IQ Capital CRM Design System → Field Grid (320:15711) and _Field Grid / Row (332:5043).
// Grid: Columns 1 | 3 × State Default | Empty | Error | Read Only. Row: State Default | Hover | Focus | Copied × Label width
// 160 | 120, optional trailing Badge. The copy button shows on hover / focus; after copying it reads "Copied" for 1.5s.

type FieldGridContextValue = { readOnly: boolean; labelWidth: "default" | "narrow" }
const FieldGridContext = React.createContext<FieldGridContextValue>({ readOnly: false, labelWidth: "default" })

type FieldGridProps = React.ComponentProps<"div"> & {
  /** Number of columns rows flow into. Figma's “3” layout shows two. */
  columns?: 1 | 2 | 3
  /** Empty and Error replace the rows with the Empty component; Read Only drops the copy buttons. */
  state?: "default" | "empty" | "error" | "read-only"
  /** Label column width: 160px (default) or 120px. */
  labelWidth?: "default" | "narrow"
  /** Content for the Empty / Error state (title, description, actions). */
  statusContent?: Pick<EmptyProps, "title" | "description" | "action" | "secondaryAction">
}

/** Field Grid: label / value rows for a record's details. */
function FieldGrid({ columns = 1, state = "default", labelWidth = "default", statusContent, className, children, ...props }: FieldGridProps) {
  if (state === "empty" || state === "error") {
    return (
      <div data-slot="field-grid" data-state={state} className={cn("p-(--field-grid-state-padding)", className)} {...props}>
        <Empty status={state} surface="outline" {...statusContent} />
      </div>
    )
  }
  return (
    <FieldGridContext.Provider value={{ readOnly: state === "read-only", labelWidth }}>
      <div
        data-slot="field-grid"
        data-state={state}
        className={cn(
          "grid gap-x-(--field-grid-column-gap)",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </FieldGridContext.Provider>
  )
}

type FieldGridRowProps = Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode
  /** The value: text or any Value Slot. */
  children: React.ReactNode
  /** Trailing element after the value, e.g. a small Badge. */
  badge?: React.ReactNode
  /** Text copied by the copy button. Omit to make the row not copyable. */
  copyValue?: string
  /** Documentation only: force Hover, Focus or Copied. */
  visualState?: "hover" | "focus" | "copied"
  copyLabel?: string
  copiedLabel?: string
}

/** _Field Grid / Row: label, value, optional badge and copy action. */
function FieldGridRow({
  label,
  children,
  badge,
  copyValue,
  visualState,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: FieldGridRowProps) {
  const { readOnly, labelWidth } = React.useContext(FieldGridContext)
  const [copiedState, setCopied] = React.useState(false)
  const copied = visualState === "copied" || copiedState
  const copyable = copyValue !== undefined && !readOnly
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? "")
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      data-slot="field-grid-row"
      data-visual={visualState}
      data-copied={copied || undefined}
      className={cn(
        "group/row flex h-(--field-grid-row-height) items-center justify-between border-b border-(--field-grid-divider) pl-(--field-grid-row-px) text-sm leading-[21px]",
        copyable && "focus-within:bg-(--field-grid-row-bg-hover) hover:bg-(--field-grid-row-bg-hover) data-copied:bg-(--field-grid-row-bg-hover) data-visual:bg-(--field-grid-row-bg-hover)",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-(--field-grid-gap)">
        <span
          className={cn(
            "shrink-0 truncate text-(color:--field-grid-label)",
            labelWidth === "narrow" ? "w-(--field-grid-label-width-narrow)" : "w-(--field-grid-label-width)"
          )}
        >
          {label}
        </span>
        <span className="min-w-0 truncate text-(color:--field-grid-value)">{children}</span>
        {badge && <span className="flex shrink-0">{badge}</span>}
      </div>
      {copyable && (
        <div className="flex h-(--field-grid-action-hit) shrink-0 items-center px-1.5 py-2">
          {copied ? (
            <Button size="sm" variant="primary" onClick={copy} aria-live="polite">
              <Checkmark />
              {copiedLabel}
            </Button>
          ) : (
            <Button
              size="icon-sm"
              variant="secondary"
              aria-label={`${copyLabel} ${typeof label === "string" ? label : ""}`.trim()}
              onClick={copy}
              data-visual={visualState}
              className={cn(
                "opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100",
                visualState && "opacity-100",
                visualState === "hover" && "border-(--button-secondary-border-active)",
                visualState === "focus" && "shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
              )}
            >
              <Copy />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { FieldGrid, FieldGridRow }
export type { FieldGridProps, FieldGridRowProps }
