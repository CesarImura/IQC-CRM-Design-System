"use client"

import { OverflowMenuVertical } from "@carbon/icons-react"

import { Dropdown } from "@/registry/iq/ui/combobox"

const owners = [
  { value: "ana", label: "Ana Souza", secondary: "Sales", group: "Owner" },
  { value: "bruno", label: "Bruno Lima", secondary: "Sales", group: "Owner" },
  { value: "diego", label: "Diego Rocha", secondary: "Partnerships", group: "Owner" },
]
const actions = [
  { value: "edit", label: "Edit" },
  { value: "duplicate", label: "Duplicate" },
  { value: "archive", label: "Archive" },
  { value: "delete", label: "Delete", tone: "danger" as const },
]

export default function DropdownDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-6">
      <Dropdown multiple label="Owner" placeholder="All owners" options={owners} />
      <Dropdown label="Stage" placeholder="Any stage" align="end" search={false} options={[
        { value: "lead", label: "Lead" },
        { value: "qualified", label: "Qualified" },
        { value: "won", label: "Won" },
      ]} />
      <Dropdown label="Row actions" iconOnly={<OverflowMenuVertical />} align="end" search={false} options={actions} />
    </div>
  )
}
