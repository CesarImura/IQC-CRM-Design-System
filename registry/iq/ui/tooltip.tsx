"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Tooltip (2837:4852). Placement Bottom | Top | Left | Right; Show icon and Show close.
// Plain tooltips open on hover / focus (Radix Tooltip). With a close button the content is interactive, so it becomes a
// toggletip that opens on click (Radix Popover) with the same bubble. Triggers use asChild so the tooltip wraps the
// consumer's own button (no nested buttons).

type TooltipSide = "top" | "bottom" | "left" | "right"

const bubbleClass =
  "z-50 flex max-w-xs items-center gap-(--tooltip-gap) rounded-(--tooltip-radius) bg-(--tooltip-bg) px-(--tooltip-px) py-(--tooltip-py) text-(length:--tooltip-font) leading-(--tooltip-line-height) text-(color:--tooltip-content)"

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" />
    </svg>
  )
}

// Figma "Caret": 12×7 triangle in the bubble color. Radix rotates it for each side.
function Caret({ as: As }: { as: typeof TooltipPrimitive.Arrow | typeof Popover.Arrow }) {
  return (
    <As asChild width={12} height={7}>
      <svg viewBox="0 0 12 7" aria-hidden="true" className="fill-(--tooltip-bg)">
        <path d="M0 0L6 6L12 0H0Z" />
      </svg>
    </As>
  )
}

type TooltipBubbleProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  onClose?: () => void
  side?: TooltipSide
  /** Draw the caret (static documentation only; live tooltips get it from Radix). */
  caret?: boolean
}

/** The bubble on its own: for documentation and static layouts. */
function TooltipBubble({ icon, onClose, side = "bottom", caret = true, className, children, ...props }: TooltipBubbleProps) {
  const vertical = side === "top" || side === "bottom"
  // The caret points at the trigger: up when the bubble sits below it (side=bottom), and so on.
  const caretPath = { bottom: "M0 7L6 1L12 7H0Z", top: "M0 0L6 6L12 0H0Z", left: "M0 0L6 6L0 12V0Z", right: "M7 0L1 6L7 12V0Z" }[side]
  const caretEl = caret && (
    <svg
      viewBox={vertical ? "0 0 12 7" : "0 0 7 12"}
      aria-hidden="true"
      className={cn("shrink-0 fill-(--tooltip-bg)", vertical ? "h-[7px] w-3" : "h-3 w-[7px]")}
    >
      <path d={caretPath} />
    </svg>
  )
  return (
    <div
      data-slot="tooltip-static"
      className={cn("inline-flex items-center", vertical ? "flex-col" : "flex-row", className)}
      {...props}
    >
      {(side === "bottom" || side === "right") && caretEl}
      <div className={bubbleClass}>
        {icon && <span className="flex text-(color:--tooltip-icon) [&_svg]:size-4">{icon}</span>}
        <span className="whitespace-nowrap">{children}</span>
        {onClose && (
          <button type="button" aria-label="Close" onClick={onClose} className="flex cursor-pointer text-(color:--tooltip-icon) outline-none [&_svg]:size-4">
            <CloseIcon />
          </button>
        )}
      </div>
      {(side === "top" || side === "left") && caretEl}
    </div>
  )
}

type TooltipProps = {
  /** The element that shows the tooltip. Must accept a ref and focus (a button, link, or icon button). */
  children: React.ReactElement
  content: React.ReactNode
  side?: TooltipSide
  align?: "start" | "center" | "end"
  /** Leading 16px icon. */
  icon?: React.ReactNode
  /** Adds a close button; the tooltip then opens on click and stays until closed (toggletip). */
  closable?: boolean
  /** Hover delay in ms. Default 300. */
  delayDuration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Tooltip: short help on hover or keyboard focus. */
function Tooltip({ children, content, side = "top", align = "center", icon, closable, delayDuration = 300, open, defaultOpen, onOpenChange }: TooltipProps) {
  if (closable) {
    return (
      <Popover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side={side} align={align} sideOffset={4} collisionPadding={8} className={bubbleClass} onOpenAutoFocus={(e) => e.preventDefault()}>
            {icon && <span className="flex text-(color:--tooltip-icon) [&_svg]:size-4">{icon}</span>}
            <span>{content}</span>
            <Popover.Close aria-label="Close" className="flex cursor-pointer rounded-[2px] text-(color:--tooltip-icon) outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)] [&_svg]:size-4">
              <CloseIcon />
            </Popover.Close>
            <Caret as={Popover.Arrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content side={side} align={align} sideOffset={4} collisionPadding={8} className={bubbleClass}>
            {icon && <span className="flex text-(color:--tooltip-icon) [&_svg]:size-4">{icon}</span>}
            <span>{content}</span>
            <Caret as={TooltipPrimitive.Arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export { Tooltip, TooltipBubble }
export type { TooltipProps, TooltipBubbleProps, TooltipSide }
