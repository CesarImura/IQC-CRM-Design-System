"use client"

import * as React from "react"

import { Calendar, type DateRange } from "@/registry/iq/ui/date-picker"

// The calendar on its own, fixed to April 2025 like Figma (today = Apr 6).
export default function CalendarDemo() {
  const [single, setSingle] = React.useState<Date | null>(new Date(2025, 3, 16))
  const [range, setRange] = React.useState<DateRange>({ from: new Date(2025, 3, 8), to: new Date(2025, 3, 13) })
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Calendar mode="single" value={single} onValueChange={(v) => setSingle(v as Date)} today={new Date(2025, 3, 6)} />
      <Calendar mode="range" value={range} onValueChange={(v) => setRange(v as DateRange)} today={new Date(2025, 3, 6)} />
      <Calendar mode="single" weekStartsOn={0} today={new Date(2025, 3, 6)} defaultMonth={new Date(2025, 3, 1)} minDate={new Date(2025, 3, 3)} maxDate={new Date(2025, 3, 25)} />
    </div>
  )
}
