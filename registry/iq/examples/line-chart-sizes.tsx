"use client"

import { LineChart } from "@/registry/iq/ui/line-chart"

import { categories, formatY, newOrders, newOrdersSmall, ranges, xLabels } from "./line-chart-data"

export default function LineChartSizes() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <LineChart
        size="sm"
        className="w-[364px]"
        title="Orders"
        info="Orders placed in the selected range."
        value="2,300"
        delta="+18%"
        categories={categories}
        xLabels={["1 Jul", "Today"]}
        formatY={formatY}
        series={[{ label: "New Orders", data: newOrdersSmall }]}
      />
      <LineChart
        size="md"
        className="w-[520px]"
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
    </div>
  )
}
