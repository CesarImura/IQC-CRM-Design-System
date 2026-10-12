"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/iq/ui/badge"

// Figma: IQ Capital CRM Design System → Tabs → Tabs / Pill (2518:4789), _Tabs / Pill Item (2518:4788).
// Tabs / Pill (3019:35112) Size Default | Small. Item: Active × State (Default, Hover, Focus, Disabled) × Trailing × Size.
// Tabs / Line (288:12896) and _Tabs / Line Item (288:12874): Tone Neutral | Accent | Danger | Warning | Info × Active × State × Trailing.
// The tone only shows on the active item; inactive items are neutral in every tone.

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-4", className)} {...props} />
}

type TabsPillSize = "default" | "sm"

const PillSizeContext = React.createContext<TabsPillSize>("default")

type TabsPillListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  /** Figma Size: Default (43px track) or Small (32px track, tighter padding). */
  size?: TabsPillSize
}

function TabsPillList({ size = "default", className, ...props }: TabsPillListProps) {
  return (
    <PillSizeContext.Provider value={size}>
      <TabsPrimitive.List
        data-slot="tabs-pill-list"
        data-size={size}
        className={cn(
          "inline-flex w-fit items-center justify-center rounded-(--tabs-pill-radius) border border-(--tabs-pill-track-border) bg-(--tabs-pill-track-bg)",
          size === "sm" ? "gap-(--tabs-pill-gap-sm) p-(--tabs-pill-track-padding-sm)" : "gap-(--tabs-pill-gap) p-(--tabs-pill-track-padding)",
          className
        )}
        {...props}
      />
    </PillSizeContext.Provider>
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
  const size = React.useContext(PillSizeContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-pill-trigger"
      data-visual={visualState}
      className={cn(
        "group/pill inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--tabs-pill-item-gap) rounded-(--tabs-pill-radius) px-(--tabs-pill-item-px) text-sm leading-normal font-medium whitespace-nowrap outline-none",
        size === "sm" ? "py-(--tabs-pill-item-py-sm)" : "py-(--tabs-pill-item-py)",
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

/* Each tone colors the active item only: underline, icon, count and the hover glow (tone at 5%).
   Inactive items are always neutral, whatever the tone. Class names are literal so Tailwind can see them. */
const lineTone: Record<TabsLineTone, { color: string; glow: string; badgeActive: string }> = {
  neutral: { color: "var(--tabs-line-tone-neutral)", glow: "var(--tabs-line-hover-bg)", badgeActive: "" },
  accent: {
    color: "var(--tabs-line-tone-accent)",
    glow: "color-mix(in srgb, var(--tabs-line-tone-accent) 5%, transparent)",
    badgeActive: "group-data-[state=active]/line:bg-(--badge-green-bg) group-data-[state=active]/line:text-(color:--badge-green-content)",
  },
  danger: {
    color: "var(--tabs-line-tone-danger)",
    glow: "color-mix(in srgb, var(--tabs-line-tone-danger) 5%, transparent)",
    badgeActive: "group-data-[state=active]/line:bg-(--badge-red-bg) group-data-[state=active]/line:text-(color:--badge-red-content)",
  },
  warning: {
    color: "var(--tabs-line-tone-warning)",
    glow: "color-mix(in srgb, var(--tabs-line-tone-warning) 5%, transparent)",
    badgeActive: "group-data-[state=active]/line:bg-(--badge-yellow-bg) group-data-[state=active]/line:text-(color:--badge-yellow-content)",
  },
  info: {
    color: "var(--tabs-line-tone-info)",
    glow: "color-mix(in srgb, var(--tabs-line-tone-info) 5%, transparent)",
    badgeActive: "group-data-[state=active]/line:bg-(--badge-blue-bg) group-data-[state=active]/line:text-(color:--badge-blue-content)",
  },
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
  /** Leading 16px icon: tone color when active, muted when inactive. */
  icon?: React.ReactNode
  /** Trailing count: tone Badge when active, gray when inactive. */
  count?: React.ReactNode
  /** Force a visual state for documentation matrices. */
  visualState?: "hover" | "focus"
}

/**
 * _Tabs / Line Item (Figma 288:12874), state by state:
 * - Inactive: label content/muted at 80%, icon muted, gray count. Hover lights the label only (no fill).
 * - Active: white label, 1px underline in the tone, icon and count in the tone.
 *   Hover: 2px underline and a tone gradient (0 → 5%) behind the item.
 * - Focus: 2% fill, 4px radius and the 3px teal ring; the active underline stays.
 * - Disabled: label at 32%; an active item keeps its tone.
 */
function TabsLineTrigger({ tone = "neutral", icon, count, visualState, className, children, style, ...props }: TabsLineTriggerProps) {
  const t = lineTone[tone]
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-line-trigger"
      data-tone={tone}
      data-visual={visualState}
      style={{ "--tab-tone": t.color, "--tab-glow": t.glow, ...style } as React.CSSProperties}
      className={cn(
        "group/line relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--tabs-pill-item-gap) px-(--tabs-line-item-px) py-(--tabs-line-item-py) text-sm leading-normal font-medium whitespace-nowrap outline-none",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        // Inactive: muted label; hover only lights the label
        "text-(color:--tabs-line-label-inactive)",
        "hover:text-(color:--tabs-line-label-hover) data-[visual=hover]:text-(color:--tabs-line-label-hover)",
        // Active: white label, 1px underline in the tone (drawn inset so nothing shifts)
        "data-[state=active]:text-(color:--tabs-line-label)",
        "data-[state=active]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone)]",
        // Active hover: 2px underline + tone gradient
        "data-[state=active]:hover:bg-linear-to-b data-[state=active]:hover:from-transparent data-[state=active]:hover:to-(--tab-glow) data-[state=active]:hover:shadow-[inset_0_calc(-1*var(--tabs-line-stroke-hover))_0_var(--tab-tone)]",
        "data-[state=active]:data-[visual=hover]:bg-linear-to-b data-[state=active]:data-[visual=hover]:from-transparent data-[state=active]:data-[visual=hover]:to-(--tab-glow) data-[state=active]:data-[visual=hover]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke-hover))_0_var(--tab-tone)]",
        // Focus (keyboard): 2% fill, 4px radius, 3px ring outside; active keeps its underline
        "focus-visible:rounded-(--tabs-line-focus-radius) focus-visible:bg-(--tabs-line-focus-bg) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-[visual=focus]:rounded-(--tabs-line-focus-radius) data-[visual=focus]:bg-(--tabs-line-focus-bg) data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "data-[state=active]:focus-visible:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone),0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=active]:data-[visual=focus]:shadow-[inset_0_calc(-1*var(--tabs-line-stroke))_0_var(--tab-tone),0_0_0_var(--focus-spread)_var(--focus-ring)]",
        // Disabled: label at 32%, tone and underline unchanged
        "disabled:pointer-events-none disabled:text-(color:--content-disabled) data-[state=active]:disabled:text-(color:--content-disabled)",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex text-(color:--tabs-line-icon-inactive) group-data-[state=active]/line:text-(color:--tab-tone)">{icon}</span>
      )}
      {children}
      {count !== undefined && (
        <Badge color="gray" size="sm" className={t.badgeActive}>
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
export type { TabsPillListProps, TabsPillSize, TabsPillTriggerProps, TabsLineTriggerProps, TabsLineTone }
