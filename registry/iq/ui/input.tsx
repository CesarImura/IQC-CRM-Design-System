"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Input (409:27488).
// State Default | Focus | Error | Disabled | Read-only | Active × Hover × Size Small | Medium; optional leading / trailing icon.
// Focus (teal ring) is keyboard focus. Active (lighter border, neutral ring) is editing: focused with the pointer, or typing.

const frameVariants = cva(
  [
    "group/input flex w-full min-w-0 items-center gap-(--button-spacing-gap) rounded-(--form-field-radius) border border-(--input-border) px-(--input-px) outline-none",
    "bg-(--input-bg) text-(color:--input-text)",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-(color:--input-icon)",
    // Hover
    "hover:border-(--input-border-hover) data-[visual=hover]:border-(--input-border-hover)",
    // Focus (keyboard): no fill, teal ring
    "data-[interaction=focus]:bg-(--form-field-surface-transparent) data-[interaction=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
    // Active (editing): 2% fill, 20% border, white 12% ring
    "data-[interaction=active]:border-(--input-border-hover) data-[interaction=active]:bg-(--input-bg-active) data-[interaction=active]:text-(color:--input-text-active) data-[interaction=active]:shadow-[0_0_0_var(--focus-spread)_var(--input-ring-active)]",
    // Error keeps its red ring while focused (Focus / Active are off in Error)
    "data-[status=error]:border-(length:--input-border-error-width) data-[status=error]:border-(--form-field-error-border) data-[status=error]:hover:border-(--form-field-error-border) data-[status=error]:data-[visual=hover]:border-(--form-field-error-border) data-[status=error]:bg-(--form-field-surface-transparent) data-[status=error]:shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]",
    // Read-only: fill only, no hover
    "data-readonly:border-(--input-border) data-readonly:hover:border-(--input-border) data-readonly:text-(color:--input-placeholder) data-readonly:shadow-none",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:border-(--input-border-disabled) data-disabled:bg-(--input-bg) data-disabled:text-(color:--content-disabled) data-disabled:shadow-none data-disabled:[&_svg]:text-(color:--content-disabled)",
  ],
  {
    variants: {
      size: {
        sm: "h-(--input-height-sm) text-sm leading-[21px]",
        md: "h-(--input-height-md) text-base leading-6",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "sm" | "md"
  error?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  /** Force a state for documentation matrices. */
  visualState?: "hover" | "focus" | "active"
  /** Hover look on top of a forced Focus / Active / Error (documentation only). */
  visualHover?: boolean
  frameClassName?: string
}

/** Input: a single-line text field (32px Small, 40px Medium). */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "sm", error = false, leadingIcon, trailingIcon, visualState, visualHover, disabled, readOnly, className, frameClassName, onFocus, onBlur, onKeyDown, ...props },
  ref
) {
  const pointerRef = React.useRef(false)
  const [interaction, setInteraction] = React.useState<"focus" | "active" | null>(null)
  const resolved = visualState === "focus" || visualState === "active" ? visualState : (interaction ?? undefined)

  return (
    <div
      data-slot="input"
      data-size={size}
      data-status={error ? "error" : undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-interaction={readOnly || error ? undefined : resolved}
      data-visual={visualState === "hover" || visualHover ? "hover" : undefined}
      className={cn(frameVariants({ size }), frameClassName)}
      onPointerDownCapture={() => {
        pointerRef.current = true
      }}
      onMouseDown={(event) => {
        // Clicking the frame (icons, padding) focuses the input.
        if ((event.target as HTMLElement).tagName !== "INPUT") {
          event.preventDefault()
          event.currentTarget.querySelector("input")?.focus()
        }
      }}
    >
      {leadingIcon && !readOnly && <span className="flex">{leadingIcon}</span>}
      <input
        ref={ref}
        data-slot="input-control"
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error || undefined}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent outline-none",
          // Hover brightens the placeholder only at rest; Focus and Active keep their own text color.
          "placeholder:text-(color:--input-placeholder) group-[:not([data-interaction]):hover]/input:placeholder:text-(color:--input-placeholder-hover) group-[:not([data-interaction])[data-visual=hover]]/input:placeholder:text-(color:--input-placeholder-hover)",
          "group-data-[interaction=focus]/input:placeholder:text-(color:--input-text) group-data-[interaction=active]/input:placeholder:text-(color:--input-text-active)",
          "disabled:placeholder:text-(color:--content-disabled) read-only:placeholder:text-(color:--input-placeholder)",
          className
        )}
        onFocus={(event) => {
          const viaPointer = pointerRef.current
          pointerRef.current = false
          setInteraction(viaPointer ? "active" : "focus")
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setInteraction(null)
          onBlur?.(event)
        }}
        onKeyDown={(event) => {
          const navigation = ["Tab", "Shift", "Escape", "Meta", "Control", "Alt", "CapsLock"]
          if (interaction === "focus" && !navigation.includes(event.key)) setInteraction("active")
          onKeyDown?.(event)
        }}
        {...props}
      />
      {trailingIcon && !readOnly && <span className="flex">{trailingIcon}</span>}
    </div>
  )
})

/* -------------------------------------------------------------------------------------------------
 * Text Area
 * -----------------------------------------------------------------------------------------------*/

// Figma: IQ Capital CRM Design System → Text Area (2545:31909). Same states and Focus / Active model as Input;
// 60px text box (Figma draws the border inside, so 58px + border; Small 72px, Medium 80px overall), optional trailing icon and the resize handle (Expandable).

type TextAreaProps = Omit<React.ComponentProps<"textarea">, "size"> & {
  size?: "sm" | "md"
  error?: boolean
  trailingIcon?: React.ReactNode
  /** Show the resize handle and let the user drag it taller (Figma Expandable). Default true. */
  expandable?: boolean
  visualState?: "hover" | "focus" | "active"
  visualHover?: boolean
  frameClassName?: string
}

/** Text Area: multi-line text with the Input chrome. Grows with its content and can be resized. */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { size = "sm", error = false, trailingIcon, expandable = true, visualState, visualHover, disabled, readOnly, className, frameClassName, onFocus, onBlur, onKeyDown, rows = 3, ...props },
  ref
) {
  const pointerRef = React.useRef(false)
  const [interaction, setInteraction] = React.useState<"focus" | "active" | null>(null)
  const resolved = visualState === "focus" || visualState === "active" ? visualState : (interaction ?? undefined)

  return (
    <div
      data-slot="text-area"
      data-size={size}
      data-status={error ? "error" : undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-interaction={readOnly || error ? undefined : resolved}
      data-visual={visualState === "hover" || visualHover ? "hover" : undefined}
      className={cn(
        frameVariants({ size }),
        "relative h-auto items-start",
        size === "sm" ? "py-1.5" : "py-2.5",
        frameClassName
      )}
      onPointerDownCapture={() => {
        pointerRef.current = true
      }}
    >
      <textarea
        ref={ref}
        data-slot="text-area-control"
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error || undefined}
        className={cn(
          "min-h-[58px] min-w-0 flex-1 bg-transparent outline-none [field-sizing:content] [&::-webkit-resizer]:bg-transparent",
          expandable && !readOnly && !disabled ? "resize-y" : "resize-none",
          "placeholder:text-(color:--input-placeholder) group-[:not([data-interaction]):hover]/input:placeholder:text-(color:--input-placeholder-hover) group-[:not([data-interaction])[data-visual=hover]]/input:placeholder:text-(color:--input-placeholder-hover)",
          "group-data-[interaction=focus]/input:placeholder:text-(color:--input-text) group-data-[interaction=active]/input:placeholder:text-(color:--input-text-active)",
          "disabled:placeholder:text-(color:--content-disabled)",
          className
        )}
        onFocus={(event) => {
          const viaPointer = pointerRef.current
          pointerRef.current = false
          setInteraction(viaPointer ? "active" : "focus")
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setInteraction(null)
          onBlur?.(event)
        }}
        onKeyDown={(event) => {
          const navigation = ["Tab", "Shift", "Escape", "Meta", "Control", "Alt", "CapsLock"]
          if (interaction === "focus" && !navigation.includes(event.key)) setInteraction("active")
          onKeyDown?.(event)
        }}
        {...props}
      />
      {trailingIcon && !readOnly && <span className="flex pt-0.5">{trailingIcon}</span>}
      {expandable && (
        // Figma _Resize: 12px triangle, 10% white, in the corner.
        <svg viewBox="0 0 12 12" aria-hidden="true" className="pointer-events-none absolute right-[3px] bottom-[3px] size-3 text-(color:--form-field-resize-handle)">
          <path d="M12 0V12H0L12 0Z" fill="currentColor" />
        </svg>
      )}
    </div>
  )
})

export { Input, TextArea }
export type { InputProps, TextAreaProps }
