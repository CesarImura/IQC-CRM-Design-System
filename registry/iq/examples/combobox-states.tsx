"use client"

import { Autocomplete, Select } from "@/registry/iq/ui/combobox"

import { domains, owners } from "./combobox-data"

export default function ComboboxStates() {
  return (
    <div className="grid w-full max-w-[680px] gap-6 sm:grid-cols-2">
      <Select error label="Error" placeholder="Choose an owner" options={owners} />
      <Select disabled label="Disabled" placeholder="Choose an owner" options={owners} />
      <Select label="Loading" placeholder="Choose an owner" options={[]} status="loading" />
      <Select label="Couldn’t load" placeholder="Choose an owner" options={[]} status="error" onRetry={() => {}} />
      <Autocomplete error label="Error" defaultValue="gmail" options={domains} />
      <Autocomplete disabled label="Disabled" defaultValue="gmail.com" options={domains} />
    </div>
  )
}
