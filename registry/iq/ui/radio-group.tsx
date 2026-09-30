"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Radio (1571:2378), _Radio / Control (1570:2341),
// _Label Block (1525:2375). Selection (Unselected / Selected) × Interaction (Default / Hover /
// Focus / Pressed / Disabled). Hover, Pressed and Focus are automatic.

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
}

/** One option. The whole row (control + label) is clickable. */
function RadioGroupItem({ children, description, className, rowClassName, disabled, id, ...props }: RadioGroupItemProps) {
  const generatedId = React.useId()
  const itemId = id ?? generatedId

  return (
    <label
      htmlFor={itemId}
      data-slot="radio-row"
      data-disabled={disabled || undefined}
      className={cn(
        "group/radio relative flex cursor-pointer items-center gap-3 py-2 select-none",
        // Row focus (Figma Radio · Focus): canvas surface, 4px radius and the teal ring. Drawn outside
        // the row so focusing doesn't shift the layout.
        "before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-2 before:rounded-[4px] has-[:focus-visible]:before:bg-(--canvas) has-[:focus-visible]:before:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
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
          // Unselected
          "data-[state=unchecked]:border-(--checkbox-border-default)",
          "data-[state=unchecked]:group-hover/radio:border-(--checkbox-border-hover)",
          "data-[state=unchecked]:group-active/radio:border-(--checkbox-border-hover) data-[state=unchecked]:group-active/radio:bg-(--checkbox-fill-neutral-pressed)",
          // Selected: green fill keeps its 40% white edge; hover and pressed lighten it.
          "data-[state=checked]:border-(--checkbox-border-default) data-[state=checked]:bg-(--checkbox-fill-selected)",
          "data-[state=checked]:group-hover/radio:border-(--checkbox-border-hover) data-[state=checked]:group-hover/radio:bg-(--checkbox-fill-selected-hover)",
          "data-[state=checked]:group-active/radio:bg-(--checkbox-fill-selected-hover)",
          "data-[state=checked]:focus-visible:border-(--focus-stroke-on-fill)",
          // Disabled
          "disabled:pointer-events-none disabled:border-(--checkbox-border-disabled) data-[state=checked]:disabled:bg-(--checkbox-fill-selected-disabled)",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-(--checkbox-icon-on-selected)" />
      </RadioGroupPrimitive.Item>
      {(children || description) && (
        <span className="relative flex min-w-0 flex-col gap-0.5">
          {children && (
            <span className="text-sm leading-[normal] font-medium text-(color:--checkbox-label-default) group-data-disabled/radio:text-(color:--content-disabled)">
              {children}
            </span>
          )}
          {description && (
            <span className="text-xs leading-[normal] text-(color:--content-muted) group-data-disabled/radio:text-(color:--content-disabled)">
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
