"use client"

import { Input } from "@/registry/iq/ui/input"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-[680px] gap-4 sm:grid-cols-2">
      <Input size="md" placeholder="Medium" aria-label="Medium" />
      <Input placeholder="Small" aria-label="Small" />
      <Input error placeholder="Error" aria-label="Error" />
      <Input disabled placeholder="Disabled" aria-label="Disabled" />
      <Input readOnly defaultValue="Read-only value" aria-label="Read-only" />
      <Input defaultValue="Has a value" aria-label="Has a value" />
    </div>
  )
}
