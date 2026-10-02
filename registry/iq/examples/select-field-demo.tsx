"use client"

import { useState } from "react"

import { AutocompleteField, DateField, SelectField } from "@/registry/iq/ui/select-field"

const stages = [
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "growth", label: "Growth" },
]

const companies = [
  { value: "acme", label: "Acme Robotics", secondary: "acme.com" },
  { value: "northwind", label: "Northwind Labs", secondary: "northwind.io" },
  { value: "globex", label: "Globex Capital", secondary: "globex.vc" },
  { value: "initech", label: "Initech", secondary: "initech.com" },
]

export default function SelectFieldDemo() {
  const [stage, setStage] = useState<string | null>(null)
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
      <SelectField
        label="Round"
        required
        options={stages}
        value={stage}
        onValueChange={setStage}
        status={stage ? undefined : "warning"}
        helper={stage ? "Shown on the deal card." : "Pick a round before saving."}
      />
      <AutocompleteField label="Company" required options={companies} placeholder="Type a company name" helper="Start typing to see matches." />
      <DateField label="Close date" required defaultValue={new Date(2026, 8, 29)} helper="Expected signing date." />
      <DateField label="Diligence window" mode="range" helper="Pick a start and end date." />
    </div>
  )
}
