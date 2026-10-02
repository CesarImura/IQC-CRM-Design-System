import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Item (2967:340). Size sm | md | lg × Style Default | Outline | Muted.
// Optional leading icon and description; trailing slot for an action (Small Secondary Button), a link and a dismiss
// (Small Ghost icon-only Buttons). Any two trailing controls can be on together.

type ItemSize = "sm" | "md" | "lg"
type ItemStyle = "default" | "outline" | "muted"

const sizeClass: Record<ItemSize, string> = {
  sm: "px-(--item-px-sm) py-(--item-py-sm) [&_[data-slot=item-icon]_svg]:size-4",
  md: "px-(--item-px-md) py-(--item-py-md) [&_[data-slot=item-icon]_svg]:size-6",
  lg: "px-(--item-px-lg) py-(--item-py-lg) [&_[data-slot=item-icon]_svg]:size-6",
}

const styleClass: Record<ItemStyle, string> = {
  default: "",
  outline: "border border-(--item-border)",
  muted: "border border-(--item-border) bg-(--item-muted-bg)",
}

type ItemProps = Omit<React.ComponentProps<"div">, "title"> & {
  size?: ItemSize
  variant?: ItemStyle
  label: React.ReactNode
  description?: React.ReactNode
  /** Leading icon: 16px on sm, 24px on md and lg. */
  icon?: React.ReactNode
  /** Trailing controls: an action Button, a link and/or a dismiss icon button. */
  trailing?: React.ReactNode
}

/** Item: a list row with a label, optional description, icon and trailing controls. */
function Item({ size = "md", variant = "default", label, description, icon, trailing, className, ...props }: ItemProps) {
  return (
    <div
      data-slot="item"
      data-size={size}
      data-variant={variant}
      className={cn("flex items-center gap-(--item-gap) rounded-(--item-radius)", sizeClass[size], styleClass[variant], className)}
      {...props}
    >
      {icon && (
        <span data-slot="item-icon" className="flex shrink-0 text-(color:--item-label)">
          {icon}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-(--item-copy-gap)">
        <p className={cn("font-medium text-(color:--item-label)", size === "sm" ? "text-sm leading-[21px]" : "text-base leading-6")}>{label}</p>
        {description && (
          <p className={cn("text-(color:--item-description)", size === "sm" ? "text-xs leading-[18px]" : "text-sm leading-[21px]")}>{description}</p>
        )}
      </div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
    </div>
  )
}

export { Item }
export type { ItemProps, ItemSize, ItemStyle }
