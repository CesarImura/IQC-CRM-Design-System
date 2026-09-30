import { StatCard } from "@/registry/iq/ui/stat-card"

const orders = [12, 11, 12, 12, 13, 14, 15, 17, 20, 19, 19, 20, 23, 22, 22, 21, 21, 22, 26, 25, 22, 23, 21, 21]
const ordersDown = [21, 21, 23, 22, 25, 26, 22, 21, 21, 22, 22, 23, 20, 19, 19, 20, 17, 15, 14, 13, 12, 12, 11, 12]

export default function StatCardTones() {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-4">
      <StatCard title="Orders" value="$1,949,190.70" delta="+18%" caption="last 30d" data={orders} />
      <StatCard title="Orders" value="$1,648,410.12" delta="-5%" caption="last 30d" data={ordersDown} />
      <StatCard title="Orders" value="$1,801,002.00" delta="0%" caption="last 30d" data={orders} />
    </div>
  )
}
