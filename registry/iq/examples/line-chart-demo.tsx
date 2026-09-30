"use client"

import { LineChart } from "@/registry/iq/ui/line-chart"

import { categories, formatY, newOrders, ranges, xLabels } from "./line-chart-data"

export default function LineChartDemo() {
  return (
    <LineChart
      size="lg"
      className="max-w-[744px]"
      title="Orders"
      info="Orders placed in the selected range."
      value="2,300"
      delta="+18%"
      timestamp="Sep 21 2026, 08:13AM"
      ranges={ranges}
      categories={categories}
      xLabels={xLabels}
      formatY={formatY}
      series={[{ label: "New Orders", data: newOrders }]}
    />
  )
}
