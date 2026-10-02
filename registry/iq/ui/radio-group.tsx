"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Radio (1571:2378), _Radio / Control (1570:2341),
// _Label Block (1525:2375). Selection (Unselected / Selected) × Interaction (Default / Hover /
// Focus / Pressed / Disabled). Hover, Pressed and Focus are automatic. Selected is an accent ring with a 10px
// accent dot and looks the same in every interaction except Disabled (accent 16%).

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("flex flex-col", className)} {...props} />
}

type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "children"> & {
  /** Label next to the control (Figma _Label Block label). Without it, pass aria-label. */
  children?: React.ReactNode
  /** Second line under the label (Figma _Label Block description). */
  description?: React.ReactNode
  /** Classes for the clickable row. */
  rowClassName?: string
  /** Force an interaction look for documentation matrices. */
  visualState?: "hover" | "focus" | "pressed"
}

/** One option. The whole row (control + label) is clickable. */
function RadioGroupItem({ children, description, className, rowClassName, disabled, id, visualState, ...props }: RadioGroupItemProps) {
  const generatedId = React.useId()
  const itemId = id ?? generatedId

  return (
    <label
      htmlFor={itemId}
      data-slot="radio-row"
      data-disabled={disabled || undefined}
      data-visual={visualState}
      className={cn(
        "group/radio relative flex cursor-pointer items-center gap-3 py-2 select-none",
        // Row focus (Figma Radio · Focus): canvas surface, 4px radius and the teal ring. Drawn outside
        // the row so focusing doesn't shift the layout.
        "before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-2 before:rounded-[4px] has-[:focus-visible]:before:bg-(--surface-canvas) has-[:focus-visible]:before:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-[visual=focus]:before:bg-(--surface-canvas) data-[visual=focus]:before:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-disabled:cursor-not-allowed",
        rowClassName
      )}
    >
      <RadioGroupPrimitive.Item
        id={itemId}
        data-slot="radio"
        disabled={disabled}
        className={cn(
          "peer relative inline-flex size-5 shrink-0 items-center justify-center rounded-full border outline-none transition-colors duration-100",
          // Unselected: 40% border; 64% on hover; pressed adds an 8% fill.
          "data-[state=unchecked]:border-(--checkbox-border-default)",
          "data-[state=unchecked]:group-hover/radio:border-(--checkbox-border-hover) data-[state=unchecked]:group-data-[visual=hover]/radio:border-(--checkbox-border-hover)",
          "data-[state=unchecked]:group-active/radio:border-(--checkbox-border-hover) data-[state=unchecked]:group-active/radio:bg-(--checkbox-fill-neutral-pressed)",
          "data-[state=unchecked]:group-data-[visual=pressed]/radio:border-(--checkbox-border-hover) data-[state=unchecked]:group-data-[visual=pressed]/radio:bg-(--checkbox-fill-neutral-pressed)",
          // Selected: accent ring + accent dot, no fill. Hover, pressed and focus don't change it.
          "data-[state=checked]:border-(--radio-border-selected)",
          // Disabled
          "disabled:pointer-events-none data-[state=unchecked]:disabled:border-(--checkbox-border-disabled) data-[state=checked]:disabled:border-(--radio-selected-disabled)",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-(--radio-dot-size) rounded-full bg-(--radio-dot-selected) data-disabled:bg-(--radio-selected-disabled)" />
      </RadioGroupPrimitive.Item>
      {(children || description) && (
        <span className="relative flex min-w-0 flex-col gap-0.5">
          {children && (
            <span className="text-(length:--font-size-sm) leading-(--line-height-sm) font-medium text-(color:--checkbox-label-default) group-data-disabled/radio:text-(color:--content-disabled)">
              {children}
            </span>
          )}
          {description && (
            <span className="text-xs leading-normal text-(color:--content-muted) group-data-disabled/radio:text-(color:--content-disabled)">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupItemProps }
