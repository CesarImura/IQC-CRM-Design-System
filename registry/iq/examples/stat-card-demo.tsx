import { StatCard } from "@/registry/iq/ui/stat-card"

const orders = [12, 11, 12, 12, 13, 14, 15, 17, 20, 19, 19, 20, 23, 22, 22, 21, 21, 22, 26, 25, 22, 23, 21, 21]

export default function StatCardDemo() {
  return (
    <StatCard
      className="w-full max-w-[364px]"
      title="Orders"
      value="$1,949,190.70"
      delta="+18%"
      caption="last 30d"
      data={orders}
    />
  )
}
