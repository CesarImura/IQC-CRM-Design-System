import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Badge (1258:3536), Badge / Delta (1260:2650).

type BadgeColor = "gray" | "white" | "blue" | "green" | "yellow" | "red" | "purple"

const colorClasses: Record<BadgeColor, { filled: string; outline: string; ghost: string; dot: string }> = {
  gray: {
    filled: "bg-(--badge-gray-bg) text-(color:--badge-gray-content)",
    outline: "border-(--badge-gray-border) text-(color:--badge-gray-content)",
    ghost: "text-(color:--badge-gray-content)",
    dot: "bg-(--badge-gray-content)",
  },
  white: {
    filled: "bg-(--badge-white-bg) text-(color:--badge-white-content)",
    outline: "border-(--badge-white-border) text-(color:--badge-white-content)",
    ghost: "text-(color:--badge-white-content)",
    dot: "bg-(--badge-white-content)",
  },
  blue: {
    filled: "bg-(--badge-blue-bg) text-(color:--badge-blue-content)",
    outline: "border-(--badge-blue-border) text-(color:--badge-blue-content)",
    ghost: "text-(color:--badge-blue-content)",
    dot: "bg-(--badge-blue-content)",
  },
  green: {
    filled: "bg-(--badge-green-bg) text-(color:--badge-green-content)",
    outline: "border-(--badge-green-border) text-(color:--badge-green-content)",
    ghost: "text-(color:--badge-green-content)",
    dot: "bg-(--badge-green-content)",
  },
  yellow: {
    filled: "bg-(--badge-yellow-bg) text-(color:--badge-yellow-content)",
    outline: "border-(--badge-yellow-border) text-(color:--badge-yellow-content)",
    ghost: "text-(color:--badge-yellow-content)",
    dot: "bg-(--badge-yellow-content)",
  },
  red: {
    filled: "bg-(--badge-red-bg) text-(color:--badge-red-content)",
    outline: "border-(--badge-red-border) text-(color:--badge-red-content)",
    ghost: "text-(color:--badge-red-content)",
    dot: "bg-(--badge-red-content)",
  },
  purple: {
    filled: "bg-(--badge-purple-bg) text-(color:--badge-purple-content)",
    outline: "border-(--badge-purple-border) text-(color:--badge-purple-content)",
    ghost: "text-(color:--badge-purple-content)",
    dot: "bg-(--badge-purple-content)",
  },
}

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-(--badge-radius-default) font-medium whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled: "",
        outline: "border-(length:--badge-stroke-width)",
        ghost: "",
      },
      size: {
        sm: "gap-(--badge-gap-sm) px-(--badge-px-sm) py-(--badge-py-sm) text-(length:--badge-font-sm) leading-normal [&_svg:not([class*='size-'])]:size-(--badge-icon-sm)",
        md: "gap-(--badge-gap-md) px-(--badge-px-md) py-(--badge-py-md) text-(length:--badge-font-md) leading-normal [&_svg:not([class*='size-'])]:size-(--badge-icon-md)",
        lg: "gap-(--badge-gap-lg) px-(--badge-px-lg) py-(--badge-py-lg) text-(length:--badge-font-lg) leading-normal [&_svg:not([class*='size-'])]:size-(--badge-icon-lg)",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
)

// Figma "Icon / Dismiss" (IBM Carbon Close).
function DismissIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" />
    </svg>
  )
}

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    color?: BadgeColor
    /** Shows the square status mark before the label. */
    dot?: boolean
    /** Shows a remove button after the label and calls this when it's pressed. */
    onDismiss?: () => void
    /** Accessible name of the remove button. */
    dismissLabel?: string
  }

function Badge({
  className,
  variant,
  size,
  color = "gray",
  dot = false,
  onDismiss,
  dismissLabel = "Remove",
  children,
  ...props
}: BadgeProps) {
  const colors = colorClasses[color]

  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), colors[variant ?? "filled"], className)}
      {...props}
    >
      {dot && (
        <span aria-hidden="true" className={cn("shrink-0", size === "lg" ? "size-2" : "size-1.5", colors.dot)} />
      )}
      {children}
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="-m-0.5 inline-flex cursor-pointer items-center justify-center rounded-(--badge-radius-default) p-0.5 text-(color:--badge-dismiss) outline-none hover:text-(color:--badge-white-content) focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
        >
          <DismissIcon />
        </button>
      )}
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Badge / Delta
 * -----------------------------------------------------------------------------------------------*/

type DeltaTone = "positive" | "negative" | "neutral"

// Paths from the Figma assets (IBM Carbon arrows and subtract).
const deltaIcons: Record<DeltaTone, string> = {
  positive: "M5 3V4H11.295L3 12.295L3.705 13L12 4.705V11H13V3H5Z",
  negative: "M5 13V12H11.295L3 3.705L3.705 3L12 11.295V5H13V13H5Z",
  neutral: "M12 7.5H4V8.5H12V7.5Z",
}

const deltaLabels: Record<DeltaTone, string> = {
  positive: "Increase",
  negative: "Decrease",
  neutral: "No change",
}

/** "+18%" → positive, "-5%" / "−5%" → negative, anything else → neutral. */
function inferDeltaTone(value: React.ReactNode): DeltaTone {
  if (typeof value === "number") return value > 0 ? "positive" : value < 0 ? "negative" : "neutral"
  if (typeof value !== "string") return "neutral"
  const text = value.trim()
  if (text.startsWith("+")) return "positive"
  if (/^[-−]/.test(text)) return "negative"
  return "neutral"
}

type DeltaBadgeProps = Omit<BadgeProps, "color" | "dot" | "variant"> & {
  /** Defaults to the sign of the content: "+" → positive, "-" → negative. */
  tone?: DeltaTone
}

/** Metric change: green up, red down, gray flat. The arrow has an accessible name. */
function DeltaBadge({ tone, children, className, ...props }: DeltaBadgeProps) {
  const resolved = tone ?? inferDeltaTone(children)
  return (
    <Badge
      data-slot="delta-badge"
      color={resolved === "positive" ? "green" : resolved === "negative" ? "red" : "gray"}
      className={cn(resolved === "neutral" && "bg-(--badge-delta-neutral-bg)", className)}
      {...props}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" role="img" aria-label={deltaLabels[resolved]}>
        <path d={deltaIcons[resolved]} />
      </svg>
      {children}
    </Badge>
  )
}

export { Badge, badgeVariants, DeltaBadge, inferDeltaTone }
export type { BadgeProps, BadgeColor, DeltaBadgeProps, DeltaTone }
