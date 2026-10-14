"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Checkmark, Close, Filter as FilterIcon } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/iq/ui/badge"
import { Button } from "@/registry/iq/ui/button"

// Figma: IQ Capital CRM Design System → Filter Chip (Type Option | Applied), Filter Group, Filter Panel and
// Filter Results Bar; Filter Button from the IQ Capital Platform file (Users screen).
// The library masters weren't readable from code; sizes come from the Users screen, the Selected (green) colors
// follow the component description ("Selected = verde com check", "tokens secondary/primary").

/* -------------------------------------------------------------------------------------------------
 * Filter Button
 * -----------------------------------------------------------------------------------------------*/

type FilterButtonProps = React.ComponentProps<"button"> & {
  /** Desktop: "More filters"; mobile: "Filters". */
  label?: React.ReactNode
  /** Number of applied filters. Above 0 the button turns Active: accent border and a green count. */
  count?: number
  /** The panel is open. */
  open?: boolean
}

/** Filter Button: opens the Filter Panel (desktop) or the Tray (mobile). */
const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  { label = "More filters", count = 0, open, className, ...props },
  ref
) {
  const active = count > 0
  return (
    <button
      ref={ref}
      type="button"
      data-slot="filter-button"
      data-active={active || undefined}
      data-open={open || undefined}
      className={cn(
        "inline-flex h-(--button-size-sm-height) shrink-0 cursor-pointer items-center gap-(--button-spacing-gap) rounded-(--button-radius-control) border px-(--button-size-sm-padding-x) text-sm leading-[21px] font-medium whitespace-nowrap backdrop-blur-(--trigger-blur) outline-none",
        "border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-(color:--trigger-value)",
        "hover:border-(--button-secondary-border-active) data-open:border-(--button-secondary-border-active) data-open:bg-(--button-secondary-bg-hover) data-open:text-(color:--trigger-value-active)",
        "data-active:border-(--filter-chip-border-selected)",
        "focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        "disabled:pointer-events-none disabled:border-(--button-secondary-border-disabled) disabled:text-(color:--button-neutral-content-disabled)",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <FilterIcon aria-hidden="true" />
      {label}
      {active && (
        <Badge color="green" size="sm" aria-label={`${count} applied`}>
          {count}
        </Badge>
      )}
    </button>
  )
})

/* -------------------------------------------------------------------------------------------------
 * Filter Chip
 * -----------------------------------------------------------------------------------------------*/

const chipBase =
  "inline-flex h-(--filter-chip-height) shrink-0 items-center gap-(--filter-chip-gap) rounded-(--button-radius-control) border px-(--filter-chip-px) text-sm leading-5 whitespace-nowrap outline-none transition-colors duration-100 focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] [&_svg]:size-4 [&_svg]:shrink-0"

type FilterChipProps = Omit<React.ComponentProps<"button">, "type"> & {
  /** The option is on. */
  selected?: boolean
  /**
   * The "Any…" option: Selected neutral (white with a check) instead of green.
   * It's the default and doesn't count as a filter.
   */
  neutral?: boolean
}

/** Filter Chip, Type=Option: a toggle inside a Filter Group. */
function FilterChip({ selected = false, neutral = false, className, children, ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-slot="filter-chip"
      data-selected={selected || undefined}
      data-neutral={neutral || undefined}
      className={cn(
        chipBase,
        "cursor-pointer border-(--filter-chip-border) bg-(--filter-chip-bg) text-(color:--filter-chip-content)",
        "hover:border-(--filter-chip-border-hover) hover:bg-(--filter-chip-bg-hover)",
        // Selected: a check, medium weight. Neutral stays white; a real filter turns green.
        "data-selected:pl-[calc(var(--filter-chip-px)-2px)] data-selected:font-medium",
        "data-selected:data-neutral:text-(color:--filter-chip-content-neutral-selected)",
        "data-selected:not-data-neutral:border-(--filter-chip-border-selected) data-selected:not-data-neutral:bg-(--filter-chip-bg-selected) data-selected:not-data-neutral:text-(color:--filter-chip-content-selected)",
        "disabled:pointer-events-none disabled:text-(color:--content-disabled)",
        className
      )}
      {...props}
    >
      {selected && <Checkmark aria-hidden="true" />}
      {children}
    </button>
  )
}

type FilterChipAppliedProps = Omit<React.ComponentProps<"span">, "children"> & {
  /** Filter name, e.g. "Status". */
  label: React.ReactNode
  /** Applied value, e.g. "Active". */
  value: React.ReactNode
  onRemove: () => void
  removeLabel?: string
}

/** Filter Chip, Type=Applied: "Status: Active ×" in the Filter Results Bar. */
function FilterChipApplied({ label, value, onRemove, removeLabel, className, ...props }: FilterChipAppliedProps) {
  return (
    <span
      data-slot="filter-chip-applied"
      className={cn(chipBase, "border-(--filter-chip-border) bg-(--filter-chip-bg) pr-1 text-(color:--filter-chip-content-neutral-selected)", className)}
      {...props}
    >
      <span className="text-(color:--filter-chip-content)">{label}:</span>
      <span className="font-medium">{value}</span>
      <button
        type="button"
        aria-label={removeLabel ?? `Remove ${typeof label === "string" ? label : "filter"}`}
        onClick={onRemove}
        className="inline-flex size-6 cursor-pointer items-center justify-center rounded-(--button-radius-control) text-(color:--content-muted) outline-none hover:text-(color:--content-default) focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
      >
        <Close aria-hidden="true" />
      </button>
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Filter Group
 * -----------------------------------------------------------------------------------------------*/

type FilterGroupProps = Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode
  /** Filter Chips; they wrap. */
  children: React.ReactNode
  /** Optional control under the chips, e.g. a Search Bar for affiliate emails. */
  search?: React.ReactNode
}

/** Filter Group: label, wrapping chips and an optional search. Goes in the Filter Panel or the Tray. */
function FilterGroup({ label, children, search, className, ...props }: FilterGroupProps) {
  const id = React.useId()
  return (
    <div role="group" aria-labelledby={id} data-slot="filter-group" className={cn("flex flex-col gap-(--filter-group-gap)", className)} {...props}>
      <p id={id} className="text-sm leading-5 font-medium text-(color:--filter-chip-content)">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
      {search}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Filter Panel
 * -----------------------------------------------------------------------------------------------*/

type FilterPanelProps = {
  /** Usually a FilterButton. */
  trigger: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  /** Clears the panel's groups only. */
  onClear?: () => void
  /** Apply button text, e.g. "Show 1,204 results". */
  applyLabel?: React.ReactNode
  onApply?: () => void
  /** Shows a Cancel button before Apply. */
  onCancel?: () => void
  align?: "start" | "end"
  /** Filter Groups. */
  children: React.ReactNode
  className?: string
}

/** Filter Panel: the More filters overlay with Filter Groups, Clear and Apply. */
function FilterPanel({
  trigger,
  open,
  onOpenChange,
  title = "More filters",
  onClear,
  applyLabel = "Show results",
  onApply,
  onCancel,
  align = "start",
  children,
  className,
}: FilterPanelProps) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={8}
          collisionPadding={16}
          aria-label={typeof title === "string" ? title : undefined}
          className={cn(
            "z-50 flex max-h-(--radix-popover-content-available-height) w-[min(var(--filter-panel-width),calc(100vw-32px))] flex-col overflow-hidden rounded-(--option-panel-radius) border border-(--filter-panel-border) bg-(--filter-panel-bg) shadow-(--filter-panel-shadow) outline-none",
            className
          )}
        >
          <div className="flex items-center gap-2 pt-3 pr-2 pb-2 pl-(--filter-panel-px)">
            <p className="flex-1 text-base leading-6 font-medium text-(color:--content-default)">{title}</p>
            {onClear && (
              <Button variant="ghost" size="sm" onClick={onClear}>
                Clear
              </Button>
            )}
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-(--filter-panel-groups-gap) overflow-y-auto px-(--filter-panel-px) pt-1 pb-5">
            {children}
          </div>
          {(onApply || onCancel) && (
            <div className="flex items-center justify-end gap-2 border-t border-(--border-panel) px-(--filter-panel-px) py-3">
              {onCancel && (
                <Button variant="ghost" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              {onApply && (
                <Button size="sm" onClick={onApply}>
                  {applyLabel}
                </Button>
              )}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Filter Results Bar
 * -----------------------------------------------------------------------------------------------*/

type FilterResultsBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Applied Filter Chips. With none, only the count shows. */
  children?: React.ReactNode
  onClearAll?: () => void
  /** Always visible on the right, e.g. "63,989 users". */
  count: React.ReactNode
}

/** Filter Results Bar: applied filters and Clear all on the left, the result count on the right. */
function FilterResultsBar({ children, onClearAll, count, className, ...props }: FilterResultsBarProps) {
  const hasFilters = React.Children.toArray(children).length > 0
  return (
    <div
      data-slot="filter-results-bar"
      aria-label="Active filters"
      role="region"
      className={cn("flex min-h-14 items-center gap-4 px-(--filter-results-bar-px) py-(--filter-results-bar-py)", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {children}
        {hasFilters && onClearAll && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>
      <p aria-live="polite" className="shrink-0 text-sm leading-5 whitespace-nowrap text-(color:--filter-results-count) tabular-nums">
        {count}
      </p>
    </div>
  )
}

export { FilterButton, FilterChip, FilterChipApplied, FilterGroup, FilterPanel, FilterResultsBar }
export type { FilterButtonProps, FilterChipProps, FilterChipAppliedProps, FilterGroupProps, FilterPanelProps, FilterResultsBarProps }
