"use client"

import { Autocomplete } from "@/registry/iq/ui/combobox"

import { domains } from "./combobox-data"

export default function ComboboxAutocompleteDemo() {
  return (
    <div className="w-80">
      <Autocomplete label="Email domain" placeholder="Type a domain, e.g. gm" options={domains} />
    </div>
  )
}
