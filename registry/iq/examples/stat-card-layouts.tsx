import { StatCard } from "@/registry/iq/ui/stat-card"

const orders = [12, 11, 12, 12, 13, 14, 15, 17, 20, 19, 19, 20, 23, 22, 22, 21, 21, 22, 26, 25, 22, 23, 21, 21]

export default function StatCardLayouts() {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-4">
      <StatCard layout="compact" title="Orders" value="$1,949,190.70" delta="+18%" caption="last 30d" data={orders} />
      <StatCard layout="stacked" title="Platform connections" value="17,475" delta="+18%" caption="last 30d" />
      <StatCard layout="spark" title="Orders" value="$1,949,190.70" delta="+18%" caption="last 30d" data={orders} />
      <StatCard
        layout="compare"
        title="Orders"
        value="$1,949,190.70"
        delta="+18%"
        caption="vs average at timeframe"
        data={orders}
        average={17}
        highlightIndex={11}
      />
      <StatCard
        layout="split"
        title="Risk to profit"
        value="8:1 Factor"
        delta="+18%"
        caption="vs average at timeframe"
        split={{ lead: { label: "Profit 70%", value: 70 }, trail: { label: "Risk 30%", value: 30 } }}
      />
    </div>
  )
}
