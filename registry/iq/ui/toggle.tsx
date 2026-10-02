"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Toggle (343:19412) and _Toggle / Switch (1504:2387).
// Active (on / off) × State Default | Hover | Focus | Pressed | Disabled. Hover, Pressed and Focus
// are automatic; the whole row (switch + label) is clickable.

type ToggleProps = Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> & {
  /** Label next to the switch (Figma _Label Block label). Without it, pass aria-label. */
  children?: React.ReactNode
  /** Second line under the label (Figma _Label Block description). */
  description?: React.ReactNode
  /** Classes for the clickable row. */
  rowClassName?: string
  /** Force an interaction look for documentation matrices. */
  visualState?: "hover" | "focus" | "pressed"
}

const hover = "border-(--toggle-track-off-border-hover) bg-(--toggle-track-off-bg-hover) data-[state=checked]:border-(--toggle-track-on-border) data-[state=checked]:bg-(--toggle-track-on-fill-hover)"
const pressed = "border-(--toggle-track-off-border-hover) bg-(--toggle-track-off-bg-hover) data-[state=checked]:border-(--toggle-track-on-border) data-[state=checked]:bg-(--toggle-track-on-fill-pressed)"
const focus = "bg-(--toggle-track-off-bg-focus) shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=checked]:bg-(--toggle-track-on-fill)"

/** The 32 × 18 switch on its own. */
function Switch({
  className,
  visualState,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { visualState?: ToggleProps["visualState"] }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-(--toggle-track-height) w-(--toggle-track-width) shrink-0 cursor-pointer items-center rounded-full border p-(--toggle-track-padding) outline-none transition-colors duration-100",
        // Off: 40% ring, white thumb. On: accent ring, 8% accent fill, accent thumb.
        "border-(--toggle-track-off-border) bg-transparent data-[state=checked]:border-(--toggle-track-on-border) data-[state=checked]:bg-(--toggle-track-on-fill)",
        // Hover / pressed come from the row so the label is part of the target.
        "group-hover/toggle:border-(--toggle-track-off-border-hover) group-hover/toggle:bg-(--toggle-track-off-bg-hover)",
        "data-[state=checked]:group-hover/toggle:border-(--toggle-track-on-border) data-[state=checked]:group-hover/toggle:bg-(--toggle-track-on-fill-hover)",
        "data-[state=checked]:group-active/toggle:bg-(--toggle-track-on-fill-pressed)",
        // Standalone switch (no row).
        "hover:border-(--toggle-track-off-border-hover) hover:bg-(--toggle-track-off-bg-hover) data-[state=checked]:hover:border-(--toggle-track-on-border) data-[state=checked]:hover:bg-(--toggle-track-on-fill-hover) data-[state=checked]:active:bg-(--toggle-track-on-fill-pressed)",
        "focus-visible:bg-(--toggle-track-off-bg-focus) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=checked]:focus-visible:bg-(--toggle-track-on-fill)",
        visualState === "hover" && hover,
        visualState === "pressed" && pressed,
        visualState === "focus" && focus,
        // Disabled
        "disabled:pointer-events-none disabled:border-(--toggle-track-off-border-disabled) disabled:bg-transparent disabled:shadow-none",
        "data-[state=checked]:disabled:border-(--toggle-track-on-fill-disabled) data-[state=checked]:disabled:bg-(--toggle-track-on-fill-disabled)",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block size-(--toggle-thumb-size) rounded-full bg-(--toggle-thumb-off) transition-transform duration-150 ease-out motion-reduce:transition-none",
          // Travel: track width − 2 × (border + padding) − thumb.
          "data-[state=checked]:translate-x-[calc(var(--toggle-track-width)_-_2px_-_2*var(--toggle-track-padding)_-_var(--toggle-thumb-size))] data-[state=checked]:bg-(--toggle-thumb-on)",
          "data-disabled:bg-(--toggle-thumb-disabled) data-[state=checked]:data-disabled:bg-(--toggle-thumb-disabled)"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

/** Toggle: switch with an optional label and description. The whole row is clickable. */
function Toggle({ children, description, className, rowClassName, disabled, id, visualState, ...props }: ToggleProps) {
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const descriptionId = description ? `${switchId}-description` : undefined

  if (!children && !description) {
    return <Switch id={switchId} disabled={disabled} visualState={visualState} className={className} {...props} />
  }

  return (
    <label
      htmlFor={switchId}
      data-slot="toggle"
      data-disabled={disabled || undefined}
      className={cn("group/toggle inline-flex cursor-pointer items-start gap-(--toggle-row-gap) select-none data-disabled:cursor-not-allowed", rowClassName)}
    >
      <Switch id={switchId} disabled={disabled} visualState={visualState} aria-describedby={descriptionId} className={className} {...props} />
      <span className="flex min-w-0 flex-col gap-(--toggle-copy-gap)">
        {children && (
          <span className="text-sm leading-[21px] font-medium text-(color:--toggle-label) group-data-disabled/toggle:text-(color:--content-disabled)">
            {children}
          </span>
        )}
        {description && (
          <span id={descriptionId} className="text-xs leading-[18px] text-(color:--toggle-description) group-data-disabled/toggle:text-(color:--content-disabled)">
            {description}
          </span>
        )}
      </span>
    </label>
  )
}

export { Toggle, Switch }
export type { ToggleProps }
