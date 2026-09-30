"use client"

import { Button } from "@/registry/iq/ui/button"
import { RingChart } from "@/registry/iq/ui/ring-chart"

import { ranges } from "./line-chart-data"

const common = {
  className: "w-full max-w-[490px]",
  title: "Orders",
  info: "Share of target reached in the selected range.",
  value: "2,300",
  delta: "+18%",
  timestamp: "Sep 21 2026, 08:13AM",
  ranges,
  items: [],
}

export default function RingChartStates() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <RingChart {...common} status="empty" emptyState={{ description: "Nothing to show yet. Create one to get started." }} />
      <RingChart {...common} status="error" errorState={{ action: <Button variant="secondary" size="sm">Try again</Button> }} />
    </div>
  )
}
