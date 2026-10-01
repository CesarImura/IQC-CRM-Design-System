"use client"

import { DatePicker } from "@/registry/iq/ui/date-picker"

export default function DatePickerDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <DatePicker label="Close date" />
      <DatePicker mode="range" label="Period" placeholder="Select range" />
    </div>
  )
}
