import * as React from "react"
import { CheckmarkOutline, Error as ErrorIcon, Information } from "@carbon/icons-react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Alert (3072:213). Tone Default | Success | Destructive; Show icon, Show action.
// Tone sets the icon; Destructive also tints the surface and turns both text lines red.

type AlertTone = "default" | "success" | "destructive"

const toneIcon: Record<AlertTone, React.ReactNode> = {
  default: <Information size={24} className="text-(color:--alert-icon)" />,
  success: <CheckmarkOutline size={24} className="text-(color:--alert-icon-success)" />,
  destructive: <ErrorIcon size={24} className="text-(color:--alert-icon-destructive)" />,
}

type AlertProps = Omit<React.ComponentProps<"div">, "title"> & {
  tone?: AlertTone
  title: React.ReactNode
  description?: React.ReactNode
  /** Tone icon on the left. Default true; pass a node to replace it. */
  icon?: boolean | React.ReactNode
  /** Trailing action, usually a Small Button. */
  action?: React.ReactNode
}

/** Alert: an inline status message inside a page or panel. */
function Alert({ tone = "default", title, description, icon = true, action, className, ...props }: AlertProps) {
  const destructive = tone === "destructive"
  return (
    <div
      data-slot="alert"
      data-tone={tone}
      role={destructive ? "alert" : "status"}
      className={cn(
        "flex items-center gap-(--alert-gap) rounded-(--alert-radius) border border-(--alert-border) px-(--alert-px) py-(--alert-py)",
        destructive ? "bg-(--alert-surface-destructive)" : "bg-(--alert-surface)",
        className
      )}
      {...props}
    >
      {icon && <span className="flex shrink-0 self-start [&_svg]:size-6">{icon === true ? toneIcon[tone] : icon}</span>}
      <div className="flex min-w-0 flex-1 flex-col text-sm leading-[21px]">
        <p className={cn("font-medium", destructive ? "text-(color:--alert-destructive)" : "text-(color:--alert-title)")}>{title}</p>
        {description && <p className={destructive ? "text-(color:--alert-destructive)" : "text-(color:--alert-description)"}>{description}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  )
}

export { Alert }
export type { AlertProps, AlertTone }
