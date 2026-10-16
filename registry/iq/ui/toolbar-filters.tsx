"use client"

import * as React from "react"
import { Close, TrashCan } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"
import { FilterButton, FilterChip, FilterGroup, FilterPanel } from "@/registry/iq/ui/filter"

// Toolbar variant "Applied filters" (code test, not in Figma yet). A Filter button opens the Filter Panel; every
// option picked there shows up right away as a removable chip next to the button, grouped under its filter name.
// Remove all clears everything. The Figma Toolbar only has Filters = Inline | More filters (with the Results Bar).

type ToolbarFilterDef = {
  id: string
  label: string
  options: string[]
}

type ToolbarFiltersValue = Record<string, string[]>

type ToolbarFiltersProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  filters: ToolbarFilterDef[]
  value: ToolbarFiltersValue
  onValueChange: (value: ToolbarFiltersValue) => void
  /** Button text. "Filter" by default. */
  label?: string
  /** Panel side. "end" when the button sits on the right of the toolbar. */
  align?: "start" | "end"
}

/** Applied filters: Filter button + one removable chip per picked option + Remove all. */
function ToolbarFilters({ filters, value, onValueChange, label = "Filter", align = "end", className, ...props }: ToolbarFiltersProps) {
  const [open, setOpen] = React.useState(false)
  const active = filters.filter((f) => (value[f.id] ?? []).length > 0)
  const set = (id: string, list: string[]) => onValueChange({ ...value, [id]: list })
  const toggle = (id: string, option: string) => {
    const list = value[id] ?? []
    set(id, list.includes(option) ? list.filter((o) => o !== option) : [...list, option])
  }
  const clear = () => onValueChange(Object.fromEntries(filters.map((f) => [f.id, []])))

  return (
    <div data-slot="toolbar-filters-applied" className={cn("flex min-w-0 flex-wrap items-center gap-2", className)} {...props}>
      <FilterPanel
        open={open}
        onOpenChange={setOpen}
        align={align}
        title="Filters"
        onClear={active.length ? clear : undefined}
        trigger={<FilterButton label={label} count={active.length} open={open} />}
      >
        {filters.map((f) => {
          const picked = value[f.id] ?? []
          return (
            <FilterGroup key={f.id} label={f.label}>
              <FilterChip neutral selected={picked.length === 0} onClick={() => set(f.id, [])}>
                Any
              </FilterChip>
              {f.options.map((o) => (
                <FilterChip key={o} selected={picked.includes(o)} onClick={() => toggle(f.id, o)}>
                  {o}
                </FilterChip>
              ))}
            </FilterGroup>
          )
        })}
      </FilterPanel>

      {active.map((f) => (
        <div
          key={f.id}
          role="group"
          aria-label={f.label}
          data-slot="toolbar-filter-group"
          className="flex flex-wrap items-center gap-1 rounded-(--button-radius-control) bg-(--surface-muted) py-1 pr-1 pl-2.5"
        >
          <span className="mr-1 text-sm text-(color:--content-muted)">{f.label}</span>
          {value[f.id].map((o) => (
            <span
              key={o}
              data-slot="toolbar-filter-chip"
              className="inline-flex h-6 items-center gap-1 rounded-(--button-radius-control) border border-(--filter-chip-border) bg-(--filter-chip-bg) pr-0.5 pl-2 text-sm leading-5 text-(color:--content-default)"
            >
              {o}
              <button
                type="button"
                aria-label={`Remove ${f.label}: ${o}`}
                onClick={() => toggle(f.id, o)}
                className="inline-flex size-5 cursor-pointer items-center justify-center rounded-(--button-radius-control) text-(color:--content-muted) outline-none hover:text-(color:--content-default) focus-visible:shadow-[0_0_0_2px_var(--focus-ring)] [&_svg]:size-3.5"
              >
                <Close aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      ))}

      {active.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clear} className="text-(color:--danger) hover:text-(color:--danger)">
          <TrashCan />
          Remove all
        </Button>
      )}
    </div>
  )
}

export { ToolbarFilters }
export type { ToolbarFilterDef, ToolbarFiltersProps, ToolbarFiltersValue }
