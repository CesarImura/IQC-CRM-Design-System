"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Scroll Bar (1436:2369) and _Scroll Bar / Thumb (1436:2357).
// Orientation Horizontal | Vertical × State Default | Hover | Drag. An overlay thumb: white at 40%, 64% on hover, 88% while
// dragging; 8px thick, 12px on hover and drag; 1px radius. The track itself is invisible.

const barClass =
  "group/bar flex touch-none p-0 select-none transition-[width,height] duration-100 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--scroll-bar-size) data-[orientation=vertical]:hover:w-(--scroll-bar-size-hover) data-[orientation=horizontal]:h-(--scroll-bar-size) data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:hover:h-(--scroll-bar-size-hover)"

const thumbClass =
  "relative flex-1 rounded-(--scroll-bar-radius) bg-(--scroll-bar-thumb) opacity-(--scroll-bar-opacity) transition-opacity group-hover/bar:opacity-(--scroll-bar-opacity-hover) active:opacity-(--scroll-bar-opacity-drag)"

function ScrollBar({ orientation = "vertical", className, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar data-slot="scroll-bar" orientation={orientation} className={cn(barClass, className)} {...props}>
      <ScrollAreaPrimitive.Thumb data-slot="scroll-bar-thumb" className={thumbClass} />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** Which scroll bars to draw. */
  orientation?: "vertical" | "horizontal" | "both"
  viewportClassName?: string
}

/** ScrollArea: native scrolling with the IQ overlay scroll bar. */
function ScrollArea({ orientation = "vertical", type = "hover", className, viewportClassName, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" type={type} className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className={cn("size-full rounded-[inherit]", viewportClassName)}>{children}</ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

type ScrollBarStaticProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  /** Visible share of the content (thumb length), 0–1. */
  ratio?: number
  /** Scroll position, 0–1. */
  offset?: number
  /** Force a state for documentation. */
  visualState?: "hover" | "drag"
}

/** The scroll bar as a static drawing, for documentation and mockups. */
function ScrollBarStatic({ orientation = "horizontal", ratio = 0.84, offset = 0, visualState, className, style, ...props }: ScrollBarStaticProps) {
  const horizontal = orientation === "horizontal"
  const big = visualState === "hover" || visualState === "drag"
  const opacity = visualState === "drag" ? "var(--scroll-bar-opacity-drag)" : visualState === "hover" ? "var(--scroll-bar-opacity-hover)" : "var(--scroll-bar-opacity)"
  const size = big ? "var(--scroll-bar-size-hover)" : "var(--scroll-bar-size)"
  return (
    <div
      data-slot="scroll-bar-static"
      aria-hidden="true"
      className={cn("relative", horizontal ? "w-full" : "h-full", className)}
      style={{ ...(horizontal ? { height: size } : { width: size }), ...style }}
      {...props}
    >
      <span
        className="absolute rounded-(--scroll-bar-radius) bg-(--scroll-bar-thumb)"
        style={{
          opacity,
          ...(horizontal
            ? { top: 0, bottom: 0, width: `${ratio * 100}%`, left: `${offset * (1 - ratio) * 100}%` }
            : { left: 0, right: 0, height: `${ratio * 100}%`, top: `${offset * (1 - ratio) * 100}%` }),
        }}
      />
    </div>
  )
}

export { ScrollArea, ScrollBar, ScrollBarStatic }
export type { ScrollAreaProps, ScrollBarStaticProps }
