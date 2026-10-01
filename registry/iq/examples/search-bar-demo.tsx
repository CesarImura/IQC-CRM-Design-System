"use client"

import { SearchBar } from "@/registry/iq/ui/search-bar"

export default function SearchBarDemo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-4">
      <SearchBar
        placeholder="Search records"
        aria-label="Search records"
        scope={{
          label: "Search in",
          options: [
            { value: "contacts", label: "Contacts" },
            { value: "deals", label: "Deals" },
            { value: "companies", label: "Companies" },
          ],
        }}
      />
      <SearchBar size="md" placeholder="Search" aria-label="Search" defaultValue="Acme" />
    </div>
  )
}
