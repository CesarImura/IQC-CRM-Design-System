import { RingChartItem } from "@/registry/iq/ui/ring-chart"

// _Chart / Meter Item: Tone × Status.
export default function RingChartItems() {
  return (
    <div className="grid grid-cols-[repeat(3,140px)] justify-center gap-x-10 gap-y-8">
      <RingChartItem label="Platform Uptime" value={99.94} tone="positive" />
      <RingChartItem label="Platform Uptime" value={55} tone="warning" />
      <RingChartItem label="Platform Uptime" value={32} tone="negative" />
      <RingChartItem tone="positive" empty />
      <RingChartItem tone="warning" empty />
      <RingChartItem tone="negative" empty />
    </div>
  )
}
