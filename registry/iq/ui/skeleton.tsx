import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Skeleton (2590:4438).
// Bone (2590:4469): Shape Bar | Circle × Motion Rest | Pulse.
// Pulse: white/8 → white/16 → white/8, then a short hold (2s loop, ease-in-out).
// Needs the `skeleton-pulse` keyframes (shipped in the registry item's css).

type SkeletonProps = React.ComponentProps<"div"> & {
  shape?: "bar" | "circle"
  motion?: "rest" | "pulse"
}

function Skeleton({ shape = "bar", motion = "pulse", className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-shape={shape}
      data-motion={motion}
      aria-hidden="true"
      className={cn(
        "shrink-0 bg-(--skeleton-bone)",
        shape === "circle" ? "size-8 rounded-(--skeleton-radius-circle)" : "h-3 w-40 rounded-(--skeleton-radius-bar)",
        motion === "pulse" &&
          "animate-[skeleton-pulse_var(--skeleton-pulse-duration)_ease-in-out_infinite] motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}

// Recipes. Each is a group of bones with fixed Figma sizes; override with className.

// _Skeleton / Text (2590:4473): three lines, 240 / 200 / 128 wide.
function SkeletonText({
  lines = 3,
  motion,
  className,
  ...props
}: React.ComponentProps<"div"> & { lines?: number; motion?: SkeletonProps["motion"] }) {
  const widths = ["w-60", "w-50", "w-32"]
  return (
    <div data-slot="skeleton-text" aria-hidden="true" className={cn("flex flex-col gap-2", className)} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          motion={motion}
          // The last line is always the short one.
          className={i === lines - 1 ? "w-32" : widths[i % 2]}
        />
      ))}
    </div>
  )
}

// _Skeleton / Control (2590:4477): label 96×12 over a 240×36 field.
function SkeletonControl({
  motion,
  className,
  ...props
}: React.ComponentProps<"div"> & { motion?: SkeletonProps["motion"] }) {
  return (
    <div data-slot="skeleton-control" aria-hidden="true" className={cn("flex flex-col gap-2", className)} {...props}>
      <Skeleton motion={motion} className="w-24" />
      <Skeleton motion={motion} className="h-9 w-60" />
    </div>
  )
}

// _Skeleton / Table Row (2590:4480): 24px circle and bars 160 / 96 / 64, 16px padding and gap.
function SkeletonTableRow({
  motion,
  className,
  ...props
}: React.ComponentProps<"div"> & { motion?: SkeletonProps["motion"] }) {
  return (
    <div
      data-slot="skeleton-table-row"
      aria-hidden="true"
      className={cn("flex items-center gap-4 p-4", className)}
      {...props}
    >
      <Skeleton motion={motion} shape="circle" className="size-6" />
      <Skeleton motion={motion} className="w-40" />
      <Skeleton motion={motion} className="w-24" />
      <Skeleton motion={motion} className="w-16" />
    </div>
  )
}

export { Skeleton, SkeletonControl, SkeletonTableRow, SkeletonText }
export type { SkeletonProps }
