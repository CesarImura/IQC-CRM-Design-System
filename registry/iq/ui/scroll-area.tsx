"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Scroll Bar (1436:2369) and _Scroll Bar / Thumb (1436:2357).
// Orientation Horizontal | Vertical × State Default | Hover | Drag. An overlay thumb in solid neutrals: 600, 500 on hover, 400
// while dragging; an 8px invisible track with a 4px square thumb inset 2px from the sides and the ends. Same as the native
// scrollbar rule in globals.css.

const barClass =
  "group/bar flex touch-none p-(--scroll-bar-inset) select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--scroll-bar-size) data-[orientation=horizontal]:h-(--scroll-bar-size) data-[orientation=horizontal]:flex-col"

const thumbClass =
  "relative flex-1 rounded-(--scroll-bar-radius) bg-(--scroll-bar-thumb) transition-colors group-hover/bar:bg-(--scroll-bar-thumb-hover) active:bg-(--scroll-bar-thumb-drag)"

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
  const fill = visualState === "drag" ? "var(--scroll-bar-thumb-drag)" : visualState === "hover" ? "var(--scroll-bar-thumb-hover)" : "var(--scroll-bar-thumb)"
  const size = "var(--scroll-bar-size)"
  const inset = "var(--scroll-bar-inset)"
  return (
    <div
      data-slot="scroll-bar-static"
      aria-hidden="true"
      className={cn("relative", horizontal ? "w-full" : "h-full", className)}
      style={{ ...(horizontal ? { height: size } : { width: size }), ...style }}
      {...props}
    >
      <span
        className="absolute rounded-(--scroll-bar-radius)"
        style={{
          background: fill,
          ...(horizontal
            ? { top: inset, bottom: inset, width: `calc(${ratio * 100}% - 2 * ${inset})`, left: `calc(${inset} + ${offset * (1 - ratio) * 100}%)` }
            : { left: inset, right: inset, height: `calc(${ratio * 100}% - 2 * ${inset})`, top: `calc(${inset} + ${offset * (1 - ratio) * 100}%)` }),
        }}
      />
    </div>
  )
}

export { ScrollArea, ScrollBar, ScrollBarStatic }
export type { ScrollAreaProps, ScrollBarStaticProps }
