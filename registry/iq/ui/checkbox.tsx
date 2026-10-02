"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Checkbox (189:10351). Selection (Unchecked / Checked /
// Indeterminate) × Interaction (Default / Hover / Focus / Pressed / Disabled). The whole 40px row,
// label included, is clickable.

type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "children"> & {
  /** Visible label. Without it, pass `aria-label`. */
  children?: React.ReactNode
  /** Classes for the outer row (the <label>). `className` styles the 20px control. */
  rowClassName?: string
}

function Checkbox({ children, className, rowClassName, disabled, ...props }: CheckboxProps) {
  return (
    <label
      data-slot="checkbox-row"
      data-disabled={disabled || undefined}
      className={cn(
        "group/checkbox relative inline-flex cursor-pointer items-center gap-(--checkbox-label-gap) py-(--checkbox-hit-padding) select-none",
        // Focus ring around the whole row (Figma adds 8px side padding and a 6px radius in focus).
        "before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-2 before:rounded-[6px] has-[:focus-visible]:before:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        !children && "before:-inset-x-0 before:-inset-y-2",
        "data-disabled:cursor-not-allowed",
        rowClassName
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        disabled={disabled}
        className={cn(
          "peer relative inline-flex size-5 shrink-0 items-center justify-center rounded-(--checkbox-radius-control) border-(length:--checkbox-stroke-default) outline-none transition-colors duration-100",
          // Unchecked: 40% border; 64% on hover, pressed and focus
          "data-[state=unchecked]:border-(--checkbox-border-default)",
          "data-[state=unchecked]:group-hover/checkbox:border-(--checkbox-border-hover) data-[state=unchecked]:group-active/checkbox:border-(--checkbox-border-hover)",
          "data-[state=unchecked]:focus-visible:border-(--checkbox-border-hover)",
          // Checked + indeterminate: green fill stays the same; hover and pressed add a 64% border
          "data-[state=checked]:border-transparent data-[state=checked]:bg-(--checkbox-fill-selected)",
          "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-(--checkbox-fill-selected)",
          "data-[state=checked]:group-hover/checkbox:border-(--checkbox-border-hover) data-[state=indeterminate]:group-hover/checkbox:border-(--checkbox-border-hover)",
          "data-[state=checked]:group-active/checkbox:border-(--checkbox-border-hover) data-[state=indeterminate]:group-active/checkbox:border-(--checkbox-border-hover)",
          "data-[state=checked]:focus-visible:border-(--focus-stroke-on-fill) data-[state=indeterminate]:focus-visible:border-(--focus-stroke-on-fill)",
          // Disabled: unchecked 16% border; checked / indeterminate neutral 4% fill with a 50% white mark
          "disabled:pointer-events-none data-[state=unchecked]:disabled:border-(--checkbox-border-disabled)",
          "data-[state=checked]:disabled:bg-(--checkbox-fill-disabled) data-[state=indeterminate]:disabled:bg-(--checkbox-fill-disabled)",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="group/indicator flex items-center justify-center text-(color:--checkbox-icon-on-selected) data-disabled:text-(color:--checkbox-icon-disabled)">
          {/* Figma "Checkmark" (checked) and "Indeterminate Mark" (12×2, 1px radius) */}
          <svg viewBox="0 0 18 18" aria-hidden="true" className="size-[18px] group-data-[state=indeterminate]/indicator:hidden">
            <path
              d="M16.1035 5.06205L7.48926 13.6763L7.3125 13.854L7.13574 13.6763L1.89648 8.43705L3.04492 7.28861L7.31152 11.5552L14.7783 4.09037L14.9551 3.91361L16.1035 5.06205Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
          <span className="hidden h-0.5 w-3 rounded-[1px] bg-current group-data-[state=indeterminate]/indicator:block" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <span className="text-base leading-6 text-(color:--checkbox-label-default) group-data-disabled/checkbox:text-(color:--content-disabled)">
          {children}
        </span>
      )}
    </label>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Checkbox mark (static visual)
 * -----------------------------------------------------------------------------------------------*/

type CheckboxMarkProps = Omit<React.ComponentProps<"span">, "children"> & {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  /** Hover / pressed look (64% border), driven by the parent row, e.g. a highlighted option. */
  highlighted?: boolean
  /** 20px (default, the Checkbox control) or 16 for the ≈17px scaled box Figma nests in Option Panel items. */
  size?: 16 | 20
}

/**
 * The Checkbox control as a static mark, for rows that handle selection themselves (Option Panel items, menus).
 * Same colors as <Checkbox>: 40% border (64% highlighted), green fill when checked, neutral fill when disabled.
 */
function CheckboxMark({ checked = false, indeterminate = false, disabled = false, highlighted = false, size = 20, className, ...props }: CheckboxMarkProps) {
  const on = checked || indeterminate
  return (
    <span
      aria-hidden="true"
      data-slot="checkbox-mark"
      data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center border-(length:--checkbox-stroke-default)",
        size === 20 ? "size-5 rounded-(--checkbox-radius-control)" : "size-[16.67px] rounded-[3.33px]",
        on ? "border-transparent bg-(--checkbox-fill-selected) text-(color:--checkbox-icon-on-selected)" : "border-(--checkbox-border-default)",
        highlighted && !disabled && "border-(--checkbox-border-hover)",
        disabled && (on ? "bg-(--checkbox-fill-disabled) text-(color:--checkbox-icon-disabled)" : "border-(--checkbox-border-disabled)"),
        className
      )}
      {...props}
    >
      {checked && !indeterminate && <CheckIcon className={size === 20 ? "size-[18px]" : "size-[15px]"} />}
      {indeterminate && <span className={cn("rounded-[1px] bg-current", size === 20 ? "h-0.5 w-3" : "h-0.5 w-2.5")} />}
    </span>
  )
}

// Figma "Checkmark" (18px in the 20px control).
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path
        d="M16.1035 5.06205L7.48926 13.6763L7.3125 13.854L7.13574 13.6763L1.89648 8.43705L3.04492 7.28861L7.31152 11.5552L14.7783 4.09037L14.9551 3.91361L16.1035 5.06205Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  )
}

export { Checkbox, CheckboxMark }
export type { CheckboxProps, CheckboxMarkProps }
