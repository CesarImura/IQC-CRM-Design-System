"use client"

import { Autocomplete, Select } from "@/registry/iq/ui/combobox"

import { domains, owners } from "./combobox-data"

export default function ComboboxSizes() {
  return (
    <div className="grid w-full max-w-[680px] gap-6 sm:grid-cols-2">
      <Select size="sm" label="Small" placeholder="Choose an owner" options={owners} />
      <Select size="md" label="Medium" placeholder="Choose an owner" options={owners} />
      <Autocomplete size="sm" label="Small" defaultValue="gmail.com" options={domains} />
      <Autocomplete size="md" label="Medium" defaultValue="gmail.com" options={domains} />
    </div>
  )
}
