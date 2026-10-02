"use client"

import { Button } from "@/registry/iq/ui/button"
import { DonutChart } from "@/registry/iq/ui/donut-chart"

const segments = [
  { label: "dxFeed", value: 10485 },
  { label: "MT5", value: 2621 },
  { label: "Tradovate", value: 3495 },
  { label: "VolumetricaFX", value: 874 },
]

export default function DonutChartDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <DonutChart className="max-w-[491px]" title="Connections" info="Active platform connections by provider." segments={segments} value="17,475" centerLabel="Connections" />
      <DonutChart className="max-w-[491px]" title="Connections" segments={segments} status="empty" />
      <DonutChart
        className="max-w-[491px]"
        title="Connections"
        segments={segments}
        status="error"
        errorState={{ action: <Button size="sm" variant="danger">Try again</Button> }}
      />
    </div>
  )
}
