"use client"

import { LineChart } from "@/registry/iq/ui/line-chart"

import { categories, formatY, newOrders, oldOrders, ranges, returns, xLabels } from "./line-chart-data"

const common = {
  size: "md" as const,
  className: "max-w-[520px]",
  title: "Orders",
  info: "Orders placed in the selected range.",
  value: "2,300",
  delta: "+18%",
  timestamp: "Sep 21 2026, 08:13AM",
  ranges,
  categories,
  xLabels,
  formatY,
}

export default function LineChartTypes() {
  return (
    <div className="grid w-full justify-items-center gap-6">
      <LineChart {...common} series={[{ label: "New Orders", data: newOrders }]} />
      <LineChart
        {...common}
        series={[
          { label: "New Orders", data: newOrders },
          { label: "Old Orders", data: oldOrders },
        ]}
      />
      <LineChart
        {...common}
        series={[
          { label: "New Orders", data: newOrders },
          { label: "Old Orders", data: oldOrders },
          { label: "Returns", data: returns },
        ]}
      />
    </div>
  )
}
