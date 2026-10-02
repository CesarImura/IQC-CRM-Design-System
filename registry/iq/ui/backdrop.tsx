import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Backdrop (1312:2334). Intensity Subtle | Default | Strong × Blur None | Soft.
// The scrim behind Modal and Tray. Black at 32 / 50 / 64%, with an optional soft background blur.

type BackdropIntensity = "subtle" | "default" | "strong"

const intensityClass: Record<BackdropIntensity, string> = {
  subtle: "bg-(--backdrop-subtle)",
  default: "bg-(--backdrop-default)",
  strong: "bg-(--backdrop-strong)",
}

/** Classes for a backdrop element (also used by Modal and Tray overlays). */
function backdropClasses(intensity: BackdropIntensity = "default", blur = false) {
  return cn(intensityClass[intensity], blur && "backdrop-blur-(--backdrop-blur-soft)")
}

type BackdropProps = React.ComponentProps<"div"> & {
  intensity?: BackdropIntensity
  /** Soft background blur (Figma Blur = Soft). */
  blur?: boolean
  /** Cover the viewport (default) or only the nearest positioned parent. */
  position?: "fixed" | "absolute"
}

/** Backdrop: a full-screen scrim. Usually rendered for you by Modal or Tray. */
function Backdrop({ intensity = "default", blur = false, position = "fixed", className, ...props }: BackdropProps) {
  return (
    <div
      data-slot="backdrop"
      data-intensity={intensity}
      aria-hidden="true"
      className={cn(position === "fixed" ? "fixed" : "absolute", "inset-0", backdropClasses(intensity, blur), className)}
      {...props}
    />
  )
}

export { Backdrop, backdropClasses }
export type { BackdropProps, BackdropIntensity }
