import { ScrollArea } from "@/registry/iq/ui/scroll-area"

const deals = Array.from({ length: 24 }, (_, i) => ({
  name: ["Acme Robotics", "Northwind Labs", "Globex Capital", "Initech", "Umbrella Bio", "Hooli"][i % 6],
  round: ["Seed", "Series A", "Series B"][i % 3],
  amount: `$${(1.2 + i * 0.35).toFixed(1)}M`,
}))

export default function ScrollAreaDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-6">
      <ScrollArea type="always" className="h-64 w-72 rounded-[2px] border border-grid bg-(--surface-raised)">
        <ul className="divide-y divide-grid">
          {deals.map((d, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-white">{d.name}</span>
              <span className="text-white/50">
                {d.round} · {d.amount}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <ScrollArea type="always" orientation="horizontal" className="w-72 rounded-[2px] border border-grid bg-(--surface-raised)">
        <div className="flex gap-3 p-4 pb-5">
          {deals.slice(0, 12).map((d, i) => (
            <div key={i} className="w-36 shrink-0 rounded-[2px] border border-grid p-3 text-sm">
              <p className="text-white">{d.name}</p>
              <p className="text-white/50">{d.amount}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
