"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/iq/ui/badge"

// Figma: IQ Capital CRM Design System → Tabs → Tabs / Pill (2518:4789), _Tabs / Pill Item (2518:4788).
// Item: Active × State (Default, Hover, Focus, Disabled) × Trailing. Tabs / Line comes later.

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-4", className)} {...props} />
}

function TabsPillList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-pill-list"
      className={cn(
        "inline-flex w-fit items-center justify-center gap-(--tabs-pill-gap) rounded-(--tabs-pill-radius) border border-(--tabs-pill-track-border) bg-(--tabs-pill-track-bg) p-(--tabs-pill-track-padding)",
        className
      )}
      {...props}
    />
  )
}

type TabsPillTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  /** Leading 16px icon. */
  icon?: React.ReactNode
  /** Trailing count, shown in a small gray Badge. */
  count?: React.ReactNode
  /** Force a visual state for documentation matrices. */
  visualState?: "hover" | "focus"
}

function TabsPillTrigger({ icon, count, visualState, className, children, ...props }: TabsPillTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-pill-trigger"
      data-visual={visualState}
      className={cn(
        "group/pill inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--tabs-pill-item-gap) rounded-(--tabs-pill-radius) px-(--tabs-pill-item-px) py-(--tabs-pill-item-py) text-sm leading-normal font-medium whitespace-nowrap outline-none",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        // Inactive
        "bg-transparent text-(color:--content-muted)",
        "hover:bg-(--tabs-pill-item-bg-hover) hover:text-(color:--tabs-pill-item-content-hover)",
        "data-[visual=hover]:bg-(--tabs-pill-item-bg-hover) data-[visual=hover]:text-(color:--tabs-pill-item-content-hover)",
        // Active
        "data-[state=active]:bg-(--tabs-pill-item-bg-selected) data-[state=active]:text-(color:--content-default)",
        "data-[state=active]:hover:bg-(--tabs-pill-item-bg-selected-hover) data-[state=active]:hover:text-(color:--content-default)",
        "data-[state=active]:data-[visual=hover]:bg-(--tabs-pill-item-bg-selected-hover) data-[state=active]:data-[visual=hover]:text-(color:--content-default)",
        // Focus (keyboard): 3px ring; inactive items also take the hover fill.
        "focus-visible:bg-(--tabs-pill-item-bg-hover) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=active]:focus-visible:bg-(--tabs-pill-item-bg-selected)",
        "data-[visual=focus]:bg-(--tabs-pill-item-bg-hover) data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=active]:data-[visual=focus]:bg-(--tabs-pill-item-bg-selected)",
        // Disabled keeps the selected fill when active.
        "disabled:pointer-events-none disabled:text-(color:--content-disabled) data-[state=active]:disabled:text-(color:--content-disabled)",
        className
      )}
      {...props}
    >
      {icon}
      {children}
      {count !== undefined && (
        <Badge color="gray" size="sm">
          {count}
        </Badge>
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsPillList, TabsPillTrigger, TabsContent }
export type { TabsPillTriggerProps }
