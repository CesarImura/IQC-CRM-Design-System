"use client"

import { LineChart } from "@/registry/iq/ui/line-chart"

import { categories, formatY, newOrdersSmall } from "./line-chart-data"

const colors = [
  { name: "Series 1", token: "chart-series-1" },
  { name: "Series 2", token: "chart-series-2" },
  { name: "Series 3", token: "chart-series-3" },
  { name: "Series 4", token: "chart-series-4" },
  { name: "Series 5", token: "chart-series-5" },
  { name: "Series 6", token: "chart-series-6" },
  { name: "Series 7", token: "chart-series-7" },
  { name: "Series 8", token: "chart-series-8" },
]

// Every series color as a Single sm chart, line and area fill in that color.
export default function LineChartColors() {
  return (
    <div className="grid w-full gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
      {colors.map((c) => (
        <LineChart
          key={c.token}
          size="sm"
          title={c.name}
          value={`--${c.token}`}
          categories={categories}
          xLabels={["1 Jul", "Today"]}
          formatY={formatY}
          series={[{ label: "New Orders", data: newOrdersSmall, color: `var(--${c.token})` }]}
        />
      ))}
    </div>
  )
}
