import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → _Label Block (1525:2375). State Default | Disabled; Label and Description optional.

type LabelBlockProps = Omit<React.ComponentProps<"div">, "children"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  /** Renders the label as a <label> for this control id. */
  htmlFor?: string
  labelId?: string
  descriptionId?: string
}

/** Label (14px medium, 80%) and description (12px, 50%), 2px apart. Everything drops to 32% when disabled. */
function LabelBlock({ label, description, disabled, htmlFor, labelId, descriptionId, className, ...props }: LabelBlockProps) {
  const LabelTag = htmlFor ? "label" : "p"
  return (
    <div
      data-slot="label-block"
      data-disabled={disabled || undefined}
      className={cn("flex flex-col items-start gap-(--label-block-gap) leading-normal", className)}
      {...props}
    >
      {label && (
        <LabelTag
          id={labelId}
          htmlFor={htmlFor}
          className={cn("text-sm leading-normal font-medium", disabled ? "text-(color:--content-disabled)" : "text-(color:--label-block-label)")}
        >
          {label}
        </LabelTag>
      )}
      {description && (
        <p
          id={descriptionId}
          className={cn("text-xs leading-normal", disabled ? "text-(color:--content-disabled)" : "text-(color:--label-block-description)")}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export { LabelBlock }
export type { LabelBlockProps }
