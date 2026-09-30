import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Pill (1380:3466). Removable value chip for filters and
// Value Slot cells. Color × Size × State; Hover, Pressed and Focus map to :hover, :active and
// :focus-visible, Disabled is a prop.

type PillColor = "gray" | "white" | "blue" | "green" | "yellow" | "red" | "purple"

const colorClasses: Record<PillColor, string> = {
  gray: "bg-(--badge-gray-bg) text-(color:--badge-gray-content)",
  white: "bg-(--badge-white-bg) text-(color:--badge-white-content)",
  blue: "bg-(--badge-blue-bg) text-(color:--badge-blue-content)",
  green: "bg-(--badge-green-bg) text-(color:--badge-green-content)",
  yellow: "bg-(--badge-yellow-bg) text-(color:--badge-yellow-content)",
  red: "bg-(--badge-red-bg) text-(color:--badge-red-content)",
  purple: "bg-(--badge-purple-bg) text-(color:--badge-purple-content)",
}

const pillVariants = cva(
  [
    "relative inline-flex max-w-full min-w-0 shrink-0 items-center justify-center overflow-hidden rounded-full font-medium whitespace-nowrap",
    // State overlay (Figma "State Overlay" layer): 6% white on hover, 16% black when pressed.
    "before:pointer-events-none before:absolute before:inset-0 before:transition-colors before:duration-100",
    "hover:before:bg-(--pill-overlay-hover) active:before:bg-(--pill-overlay-pressed)",
    // Focus ring around the whole pill when any control inside has keyboard focus.
    "has-[:focus-visible]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
    "aria-disabled:pointer-events-none aria-disabled:text-(color:--content-disabled)",
  ],
  {
    variants: {
      size: {
        sm: "gap-(--pill-gap-sm) px-(--pill-px-sm) py-(--pill-py-sm) text-xs leading-normal [--pill-icon:var(--pill-icon-sm)] [--pill-hit:var(--pill-hit-sm)]",
        md: "gap-(--pill-gap-md) px-(--pill-px-md) py-(--pill-py-md) text-sm leading-normal [--pill-icon:var(--pill-icon-md)] [--pill-hit:var(--pill-hit-md)]",
        lg: "gap-(--pill-gap-lg) px-(--pill-px-lg) py-(--pill-py-lg) text-base leading-normal [--pill-icon:var(--pill-icon-lg)] [--pill-hit:var(--pill-hit-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type PillProps = Omit<React.ComponentProps<"span">, "onClick"> &
  VariantProps<typeof pillVariants> & {
    color?: PillColor
    /** Leading icon, e.g. a Carbon icon. Drawn in the pill color at 50% opacity. */
    icon?: React.ReactNode
    /** Makes the label clickable, e.g. to edit the filter. Rendered as a button. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    /** Shows the remove button and calls this when it's pressed. */
    onDismiss?: () => void
    /** Accessible name of the remove button. Defaults to "Remove {text}". */
    dismissLabel?: string
    disabled?: boolean
  }

function Pill({
  color = "gray",
  size,
  icon,
  onClick,
  onDismiss,
  dismissLabel,
  disabled = false,
  className,
  children,
  ...props
}: PillProps) {
  const text = typeof children === "string" ? children : undefined

  const content = (
    <>
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 [&_svg]:size-(--pill-icon)",
            disabled ? "text-(color:--content-disabled)" : "opacity-50"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 truncate">{children}</span>
    </>
  )

  return (
    <span
      data-slot="pill"
      data-color={color}
      aria-disabled={disabled || undefined}
      className={cn(pillVariants({ size }), colorClasses[color], className)}
      {...props}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="relative inline-flex min-w-0 cursor-pointer items-center gap-[inherit] outline-none"
        >
          {content}
        </button>
      ) : (
        content
      )}
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel ?? (text ? `Remove ${text}` : "Remove")}
          onClick={onDismiss}
          disabled={disabled}
          className={cn(
            "relative inline-flex size-(--pill-hit) shrink-0 cursor-pointer items-center justify-center rounded-full outline-none",
            disabled ? "text-(color:--content-disabled)" : "text-(color:--pill-dismiss)"
          )}
        >
          {/* Figma "Icon / Dismiss" (IBM Carbon Close) */}
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-(--pill-icon)">
            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" />
          </svg>
        </button>
      )}
    </span>
  )
}

export { Pill, pillVariants }
export type { PillProps, PillColor }
