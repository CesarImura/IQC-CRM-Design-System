import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Page Grid (2906:210). Width Full | Default | Reduced | Narrow.
// Content area inside the app column (1616px on a 1920 screen). The 48px top bar and 304px nav stay outside.
// Widths are maximums: on smaller screens Default keeps its padding and fills the column, Reduced and Narrow
// shrink to the column with a 24px side margin.

type PageGridWidth = "full" | "default" | "reduced" | "narrow"

const frame = cva("flex w-full max-w-(--page-grid-width-track) flex-col", {
  variants: {
    width: {
      // Edge to edge, for dense tables.
      full: "p-(--page-grid-padding-none)",
      // 1504 at 1920: 56px padding on every side.
      default: "p-(--page-grid-padding-default)",
      // Centered columns with 48px top and bottom.
      reduced: "items-center px-(--page-grid-margin-min) py-(--page-grid-padding-y)",
      narrow: "items-center px-(--page-grid-margin-min) py-(--page-grid-padding-y)",
    },
  },
  defaultVariants: { width: "default" },
})

const content = cva("flex w-full flex-1 flex-col gap-(--page-grid-gap)", {
  variants: {
    width: {
      full: "",
      default: "",
      reduced: "max-w-(--page-grid-width-reduced)",
      narrow: "max-w-(--page-grid-width-narrow)",
    },
  },
  defaultVariants: { width: "default" },
})

type PageGridProps = React.ComponentProps<"main"> & {
  /**
   * full: 1616, edge to edge (dense tables). default: 1504 with 56px padding (ordinary screens).
   * reduced: 1120 centered (no analytics). narrow: 688 centered (settings and sensitive flows).
   */
  width?: PageGridWidth
  /** Classes for the inner content column (the slot). */
  contentClassName?: string
}

/** Page Grid: drop the screen's blocks in; they stack with 48px gaps. */
function PageGrid({ width = "default", className, contentClassName, children, ...props }: PageGridProps) {
  return (
    <main data-slot="page-grid" data-width={width} className={cn(frame({ width }), className)} {...props}>
      <div data-slot="page-grid-content" className={cn(content({ width }), contentClassName)}>
        {children}
      </div>
    </main>
  )
}

export { PageGrid }
export type { PageGridProps, PageGridWidth }
