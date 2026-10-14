"use client"

import * as React from "react"

import { FilterButton, FilterChip, FilterChipApplied, FilterGroup, FilterPanel, FilterResultsBar } from "@/registry/iq/ui/filter"
import { SearchBar } from "@/registry/iq/ui/search-bar"

const roles = ["Client", "Owner", "Admin", "Affiliate"]
const sources = ["Google", "Meta", "YouTube", "TikTok", "X", "Discord", "Newsletter", "No UTM"]
const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

// More filters: edit a draft in the panel, Apply commits it, the Results Bar shows what's applied.
export default function FilterDemo() {
  const [open, setOpen] = React.useState(false)
  const [applied, setApplied] = React.useState<{ roles: string[]; utm: string[] }>({ roles: [], utm: [] })
  const [draft, setDraft] = React.useState(applied)
  const count = (applied.roles.length ? 1 : 0) + (applied.utm.length ? 1 : 0)

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <FilterPanel
        open={open}
        onOpenChange={(o) => {
          if (o) setDraft(applied)
          setOpen(o)
        }}
        trigger={<FilterButton count={count} open={open} />}
        onClear={() => setDraft({ roles: [], utm: [] })}
        onCancel={() => setOpen(false)}
        applyLabel="Show 1,204 results"
        onApply={() => {
          setApplied(draft)
          setOpen(false)
        }}
      >
        <FilterGroup label="Roles">
          <FilterChip neutral selected={draft.roles.length === 0} onClick={() => setDraft({ ...draft, roles: [] })}>
            Any role
          </FilterChip>
          {roles.map((r) => (
            <FilterChip key={r} selected={draft.roles.includes(r)} onClick={() => setDraft({ ...draft, roles: toggle(draft.roles, r) })}>
              {r}
            </FilterChip>
          ))}
        </FilterGroup>
        <FilterGroup label="UTM Source" search={<SearchBar placeholder="Search source" aria-label="Search source" />}>
          <FilterChip neutral selected={draft.utm.length === 0} onClick={() => setDraft({ ...draft, utm: [] })}>
            Any source
          </FilterChip>
          {sources.map((s) => (
            <FilterChip key={s} selected={draft.utm.includes(s)} onClick={() => setDraft({ ...draft, utm: toggle(draft.utm, s) })}>
              {s}
            </FilterChip>
          ))}
        </FilterGroup>
      </FilterPanel>

      <FilterResultsBar count="63,989 users" onClearAll={() => setApplied({ roles: [], utm: [] })} className="w-full border border-(--border-panel) px-4">
        {applied.roles.length > 0 && (
          <FilterChipApplied label="Roles" value={applied.roles.join(", ")} onRemove={() => setApplied({ ...applied, roles: [] })} />
        )}
        {applied.utm.length > 0 && <FilterChipApplied label="UTM" value={applied.utm.join(", ")} onRemove={() => setApplied({ ...applied, utm: [] })} />}
      </FilterResultsBar>
    </div>
  )
}
