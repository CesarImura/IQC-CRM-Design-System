"use client"

import { Search } from "@carbon/icons-react"

import { Input } from "@/registry/iq/ui/input"

export default function InputDemo() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Input placeholder="Placeholder text" aria-label="Example input" />
      <Input placeholder="Search contacts" aria-label="Search contacts" leadingIcon={<Search />} />
    </div>
  )
}
