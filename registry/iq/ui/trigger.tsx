"use client"

import * as React from "react"
import { ChevronDown } from "@carbon/icons-react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Trigger (341:17619).
// State Default | Focus | Error | Disabled × Active (open) × Hover × Size Small | Medium | Large.

type TriggerSize = "sm" | "md" | "lg"

const sizeClasses: Record<TriggerSize, string> = {
  sm: "h-(--button-size-sm-height) px-(--button-size-sm-padding-x) text-sm leading-[21px] [&_svg]:size-4",
  md: "h-(--button-size-md-height) px-(--button-size-md-padding-x) text-base leading-6 [&_svg]:size-4",
  lg: "h-(--button-size-lg-height) px-(--button-size-lg-padding-x) text-lg leading-[27px] [&_svg]:size-6",
}
const iconOnlySize: Record<TriggerSize, string> = {
  sm: "size-(--button-size-sm-height) px-0",
  md: "size-(--button-size-md-height) px-0",
  lg: "size-(--button-size-lg-height) px-0",
}

/** Trigger surface classes. Drive state with data-open, data-disabled and data-visual (hover | focus). */
function triggerClasses(size: TriggerSize, error: boolean, iconOnly = false) {
  return cn(
    "group/trigger flex min-w-0 shrink-0 items-center justify-center gap-(--button-spacing-gap) rounded-(--button-radius-control) border font-medium whitespace-nowrap backdrop-blur-(--trigger-blur) outline-none",
    "[&_svg]:shrink-0",
    sizeClasses[size],
    iconOnly && iconOnlySize[size],
    error
      ? "border-(--form-field-error-border) bg-(--button-secondary-bg-disabled) text-(color:--button-danger-content-default) shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]"
      : cn(
          "border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-(color:--button-neutral-content-default)",
          "hover:border-(--button-secondary-border-active) data-[visual=hover]:border-(--button-secondary-border-active)",
          "data-[open=true]:border-(--button-secondary-border-active) data-[open=true]:bg-(--button-secondary-bg-hover)",
          "data-[open=true]:hover:bg-(--button-secondary-bg-pressed) data-[open=true]:data-[visual=hover]:bg-(--button-secondary-bg-pressed)",
          "focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
        ),
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:border-(--button-secondary-border-disabled) data-[disabled=true]:bg-(--button-secondary-bg-disabled) data-[disabled=true]:text-(color:--button-neutral-content-disabled) data-[disabled=true]:shadow-none"
  )
}

// Figma "Error Icon" (filled circle with a slash), same path as Form Field.
function TriggerErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="text-(color:--button-danger-content-default)">
      <path d="M7.99999 0.999988C7.07914 0.994279 6.16632 1.17144 5.31446 1.5212C4.46261 1.87096 3.68866 2.38636 3.03751 3.03751C2.38636 3.68866 1.87096 4.46261 1.5212 5.31446C1.17144 6.16632 0.994279 7.07914 0.999988 7.99999C0.994279 8.92084 1.17144 9.83365 1.5212 10.6855C1.87096 11.5374 2.38636 12.3113 3.03751 12.9625C3.68866 13.6136 4.46261 14.129 5.31446 14.4788C6.16632 14.8285 7.07914 15.0057 7.99999 15C8.92084 15.0057 9.83365 14.8285 10.6855 14.4788C11.5374 14.129 12.3113 13.6136 12.9625 12.9625C13.6136 12.3113 14.129 11.5374 14.4788 10.6855C14.8285 9.83365 15.0057 8.92084 15 7.99999C15.0057 7.07914 14.8285 6.16632 14.4788 5.31446C14.129 4.46261 13.6136 3.68866 12.9625 3.03751C12.3113 2.38636 11.5374 1.87096 10.6855 1.5212C9.83365 1.17144 8.92084 0.994279 7.99999 0.999988ZM10.7224 11.5L4.49999 5.27784L5.27784 4.49999L11.5 10.7224L10.7224 11.5Z" />
    </svg>
  )
}

type TriggerContentProps = {
  /** Leading icon (16px; 24px on Large). */
  icon?: React.ReactNode
  /** Shown when there's no value. */
  placeholder?: React.ReactNode
  value?: React.ReactNode
  open?: boolean
  error?: boolean
  disabled?: boolean
  /** Fill the width and truncate the value (form use); otherwise hug the content. */
  fill?: boolean
  chevron?: boolean
}

/** The inside of a Trigger: icon, value at 70% (80% open), error icon, chevron. */
function TriggerContent({ icon, placeholder, value, open, error, disabled, fill, chevron = true }: TriggerContentProps) {
  return (
    <>
      {icon && <span className="flex">{icon}</span>}
      <span
        className={cn(
          fill && "min-w-0 flex-1 truncate text-left",
          !error && (open ? "text-(color:--trigger-value-active)" : "text-(color:--trigger-value)"),
          error && (open ? "opacity-80" : "opacity-70"),
          disabled && "text-(color:--button-neutral-content-disabled) opacity-100"
        )}
      >
        {value ?? placeholder}
      </span>
      {error && !disabled && <TriggerErrorIcon />}
      {chevron && <ChevronDown aria-hidden="true" className={cn(!disabled && "text-(color:--content-default)")} />}
    </>
  )
}

type TriggerProps = React.ComponentProps<"button"> &
  Omit<TriggerContentProps, "disabled"> & {
    size?: TriggerSize
    /** Square, icon only (Dropdown / Icon Only). */
    iconOnly?: boolean
    /** Force Hover or Focus for documentation matrices. */
    visualState?: "hover" | "focus"
  }

/** Trigger: the button that opens a Dropdown, Select or Date Picker. */
const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(function Trigger(
  { size = "sm", icon, placeholder, value, open = false, error = false, fill = false, chevron, iconOnly = false, visualState, disabled, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="trigger"
      data-size={size}
      data-open={open}
      data-disabled={disabled ?? false}
      data-visual={visualState}
      disabled={disabled}
      data-status={error ? "error" : undefined}
      className={cn(triggerClasses(size, error, iconOnly), fill && "w-full", className)}
      {...props}
    >
      {children ??
        (iconOnly ? (
          <span className={cn("flex", !disabled && "text-(color:--content-default)")}>{icon}</span>
        ) : (
          <TriggerContent icon={icon} placeholder={placeholder} value={value} open={open} error={error} disabled={disabled} fill={fill} chevron={chevron} />
        ))}
    </button>
  )
})

export { Trigger, TriggerContent, TriggerErrorIcon, triggerClasses }
export type { TriggerProps, TriggerSize }
