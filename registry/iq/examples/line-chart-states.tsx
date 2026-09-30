"use client"

import { Button } from "@/registry/iq/ui/button"
import { LineChart } from "@/registry/iq/ui/line-chart"

import { categories, ranges } from "./line-chart-data"

const common = {
  size: "md" as const,
  className: "w-full max-w-[520px]",
  title: "Orders",
  info: "Orders placed in the selected range.",
  timestamp: "Sep 21 2026, 08:13AM",
  ranges,
  categories,
  series: [],
}

export default function LineChartStates() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <LineChart {...common} status="empty" />
      <LineChart
        {...common}
        status="error"
        errorState={{ action: <Button variant="secondary" size="sm">Try again</Button> }}
      />
    </div>
  )
}
