"use client"

import { MeterGauge, type MeterTone } from "@/registry/iq/ui/meter"

const rows: { value: number; tone: MeterTone }[] = [
  { value: 0, tone: "positive" },
  { value: 25, tone: "positive" },
  { value: 50, tone: "warning" },
  { value: 75, tone: "warning" },
  { value: 100, tone: "negative" },
]

export default function MeterValues() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-x-6 gap-y-8">
      {rows.map((r) => (
        <div key={r.value} className="flex flex-col items-center gap-1">
          <MeterGauge value={r.value} tone={r.tone}>
            {r.value}%
          </MeterGauge>
          <span className="text-xs text-white/50 capitalize">{r.tone}</span>
        </div>
      ))}
    </div>
  )
}
