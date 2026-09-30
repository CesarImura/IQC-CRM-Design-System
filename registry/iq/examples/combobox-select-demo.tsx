"use client"

import { Select } from "@/registry/iq/ui/combobox"

import { owners } from "./combobox-data"

export default function ComboboxSelectDemo() {
  return (
    <div className="w-80">
      <Select label="Deal owner" placeholder="Choose an owner" options={owners} defaultValue="ana" />
    </div>
  )
}
