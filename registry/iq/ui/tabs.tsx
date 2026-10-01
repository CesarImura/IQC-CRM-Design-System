"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/iq/ui/badge"

// Figma: IQ Capital CRM Design System → Tabs → Tabs / Pill (2518:4789), _Tabs / Pill Item (2518:4788).
// Item: Active × State (Default, Hover, Focus, Disabled) × Trailing.
// Tabs / Line (288:12896) and _Tabs / Line Item (288:12874): Tone Neutral | Accent | Danger | Warning | Info × Active × State × Trailing.

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

/* -------------------------------------------------------------------------------------------------
 * Tabs / Line
 * -----------------------------------------------------------------------------------------------*/

type TabsLineTone = "neutral" | "accent" | "danger" | "warning" | "info"

const lineTone: Record<TabsLineTone, { color: string; badge: "gray" | "green" | "red" | "yellow" | "blue" }> = {
  neutral: { color: "var(--tabs-line-tone-neutral)", badge: "gray" },
  accent: { color: "var(--tabs-line-tone-accent)", badge: "green" },
  danger: { color: "var(--tabs-line-tone-danger)", badge: "red" },
  warning: { color: "var(--tabs-line-tone-warning)", badge: "yellow" },
  info: { color: "var(--tabs-line-tone-info)", badge: "blue" },
}

type TabsLineListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  /** Divider on the bottom only, or on the top and bottom. */
  divider?: "bottom" | "both"
}

/** Tabs / Line: the bar. 24px side padding, items 10px apart, divider lines. */
function TabsLineList({ divider = "bottom", className, ...props }: TabsLineListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-line-list"
      className={cn(
        "flex items-start gap-(--tabs-line-gap) overflow-x-auto border-b border-(--tabs-line-divider) px-(--tabs-line-bar-px)",
        divider === "both" && "border-t",
        className
      )}
      {...props}
    />
  )
}

type TabsLineTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  tone?: TabsLineTone
  /** Leading 16px icon, drawn in the tone color. */
  icon?: React.ReactNode
  /** Trailing count in a small Badge of the tone color. */
  count?: React.ReactNode
  /** Force a visual state for documentation matrices. */
  visualState?: "hover" | "focus"
}

/** _Tabs / Line Item: underline in the tone color when active; 2px and a soft fill on hover. */
function TabsLineTrigger({ tone = "neutral", icon, count, visualState, className, children, style, ...props }: TabsLineTriggerProps) {
  const t = lineTone[tone]
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-line-trigger"
      data-tone={tone}
      data-visual={visualState}
      style={{ "--tab-tone": t.color, ...style } as React.CSSProperties}
      className={cn(
        "group/line relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--tabs-pill-item-gap) px-(--tabs-line-item-px) py-(--tabs-line-item-py) text-sm leading-normal font-medium whitespace-nowrap outline-none",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        // Inactive
        "text-(color:--tabs-line-label-inactive)",
        "hover:bg-linear-to-b hover:from-transparent hover:to-(--tabs-line-hover-bg) hover:text-(color:--tabs-line-label-hover)",
        "data-[visual=hover]:bg-linear-to-b data-[visual=hover]:from-transparent data-[visual=hover]:to-(--tabs-line-hover-bg) data-[visual=hover]:text-(color:--tabs-line-label-hover)",
        // Active: white label (also on hover), underline in the tone color: 1px, 2px on hover. Drawn inset so nothing shifts.
        "data-[state=active]:text-(color:--tabs-line-label) data-[state=active]:hover:text-(color:--tabs-line-label) data-[state=active]:data-[visual=hover]:text-(color:--tabs-line-label)",
        "data-[state=active]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone)]",
        "data-[state=active]:hover:shadow-[inset_0_calc(-1*var(--tabs-line-stroke-hover))_0_var(--tab-tone)] data-[state=active]:data-[visual=hover]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke-hover))_0_var(--tab-tone)]",
        // Focus (keyboard)
        "focus-visible:bg-(--tabs-pill-item-bg-hover) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-[visual=focus]:bg-(--tabs-pill-item-bg-hover) data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-[state=active]:focus-visible:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone),0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=active]:data-[visual=focus]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone),0_0_0_var(--focus-spread)_var(--focus-ring)]",
        // Disabled
        "disabled:pointer-events-none disabled:text-(color:--content-disabled) data-[state=active]:disabled:text-(color:--content-disabled) disabled:[&_svg]:opacity-50 disabled:data-[state=active]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_color-mix(in_srgb,var(--tab-tone)_50%,transparent)]",
        className
      )}
      {...props}
    >
      {icon && <span className="flex text-(color:--tab-tone)">{icon}</span>}
      {children}
      {count !== undefined && (
        <Badge color={t.badge} size="sm" className="group-disabled/line:opacity-50">
          {count}
        </Badge>
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsPillList, TabsPillTrigger, TabsLineList, TabsLineTrigger, TabsContent }
export type { TabsPillTriggerProps, TabsLineTriggerProps, TabsLineTone }
