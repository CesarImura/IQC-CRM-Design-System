import { RingChartItem } from "@/registry/iq/ui/ring-chart"

// How the arc reads across the range.
export default function RingChartValues() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {[0, 10, 25, 50, 75, 90, 100].map((v) => (
        <RingChartItem key={v} label={`${v}%`} value={v} tone={v >= 75 ? "positive" : v >= 50 ? "warning" : "negative"} />
      ))}
    </div>
  )
}
