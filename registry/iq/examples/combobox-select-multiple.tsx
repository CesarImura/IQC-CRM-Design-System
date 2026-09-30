"use client"

import { Select } from "@/registry/iq/ui/combobox"

import { stages } from "./combobox-data"

export default function ComboboxSelectMultiple() {
  return (
    <div className="w-80">
      <Select multiple label="Stages" placeholder="All stages" options={stages} defaultValue={["qualified", "stalled"]} />
    </div>
  )
}
