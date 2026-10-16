"use client"

import * as React from "react"
import { Renew } from "@carbon/icons-react"

import { Badge } from "@/registry/iq/ui/badge"
import { Button } from "@/registry/iq/ui/button"
import { MeterCard } from "@/registry/iq/ui/meter"

const money = (n: number) => `${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`

// Account limits: today's drawdown against the daily allowance, the run toward the profit target, and max loss.
export default function MeterDemo() {
  const [daily, setDaily] = React.useState(320)
  const [profit, setProfit] = React.useState(6800)
  const [loss, setLoss] = React.useState(4300)

  const simulate = () => {
    setDaily(Math.round(Math.random() * 1000))
    setProfit(Math.round(Math.random() * 10000))
    setLoss(Math.round(Math.random() * 5000))
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MeterCard
          title="Daily drawdown"
          badge={<Badge color="red" size="sm">49,000.00 $</Badge>}
          tone="warning"
          value={(daily / 1000) * 100}
          display={money(daily)}
          caption={`of ${money(1000)}`}
          meta="worst session #11 · resets at the NY close"
        />
        <MeterCard
          title="Profit target"
          badge={<Badge color="green" size="sm">Phase 1</Badge>}
          tone="positive"
          value={(profit / 10000) * 100}
          display={money(profit)}
          caption={`of ${money(10000)}`}
          meta="8 trading days left"
        />
        <MeterCard
          title="Max loss"
          badge={<Badge color="gray" size="sm">Trailing</Badge>}
          tone="negative"
          value={(loss / 5000) * 100}
          display={money(loss)}
          caption={`of ${money(5000)}`}
          meta="follows the high-water mark"
        />
      </div>
      <Button variant="secondary" size="sm" onClick={simulate}>
        <Renew />
        Simulate session
      </Button>
    </div>
  )
}
