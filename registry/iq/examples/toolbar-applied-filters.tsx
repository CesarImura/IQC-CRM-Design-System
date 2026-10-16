"use client"

import * as React from "react"

import { SearchBar } from "@/registry/iq/ui/search-bar"
import { Toolbar } from "@/registry/iq/ui/toolbar"
import { ToolbarFilters, type ToolbarFilterDef, type ToolbarFiltersValue } from "@/registry/iq/ui/toolbar-filters"

// The Accounts filters (Product rules: markets and status values).
const filters: ToolbarFilterDef[] = [
  { id: "market", label: "Market", options: ["Futures", "CFD + Crypto"] },
  { id: "phase", label: "Phase", options: ["Challenge", "Funded"] },
  { id: "status", label: "Status", options: ["Active", "Challenge Passed", "Breached", "Reset", "Disabled", "Initialized"] },
  { id: "strikes", label: "Strikes", options: ["0", "1", "2", "3"] },
]

export default function ToolbarAppliedFilters() {
  const [value, setValue] = React.useState<ToolbarFiltersValue>({
    market: [],
    phase: [],
    status: ["Active", "Breached", "Reset"],
    strikes: [],
  })

  return (
    <Toolbar
      className="w-full"
      filters={
        <>
          <div className="w-64">
            <SearchBar placeholder="Search accounts" />
          </div>
          <ToolbarFilters className="ml-auto justify-end" filters={filters} value={value} onValueChange={setValue} />
        </>
      }
    />
  )
}
