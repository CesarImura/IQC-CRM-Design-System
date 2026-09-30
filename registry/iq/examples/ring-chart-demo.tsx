"use client"

import { RingChart } from "@/registry/iq/ui/ring-chart"

import { ranges } from "./line-chart-data"

export default function RingChartDemo() {
  return (
    <RingChart
      className="max-w-[520px]"
      title="Orders"
      info="Share of target reached in the selected range."
      value="2,300"
      delta="+18%"
      timestamp="Sep 21 2026, 08:13AM"
      ranges={ranges}
      items={[
        { label: "Platform Uptime", value: 99.94, tone: "positive" },
        { label: "Deal Coverage", value: 55, tone: "warning" },
        { label: "Quota", value: 32, tone: "negative" },
      ]}
    />
  )
}
