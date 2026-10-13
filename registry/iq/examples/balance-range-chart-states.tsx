"use client"

import { BalanceRangeChart } from "@/registry/iq/ui/balance-range-chart"
import { MAX_LOSS, START, TARGET, breachedRun, seed, winningRun } from "@/registry/iq/examples/balance-range-chart-data"

const states = [
  { title: "In range", caption: "Above the start, below the target.", sessions: seed("profit") },
  { title: "Below start", caption: "The line and the area turn coral under the start balance.", sessions: seed("drawdown") },
  { title: "Target reached", caption: "The first session at or above the target gets a ringed point and a tag.", sessions: winningRun().sessions },
  { title: "Breached", caption: "The balance closes under the max-loss line.", sessions: breachedRun() },
]

/** The four situations a Challenge run can be in. */
export default function BalanceRangeChartStates() {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      {states.map((s) => (
        <section
          key={s.title}
          className="flex min-w-0 flex-col gap-3 rounded-(--chart-card-radius) border border-(--chart-card-border) bg-(--surface-raised) p-(--chart-padding)"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-base leading-normal text-(color:--content-default)">{s.title}</span>
            <span className="text-sm leading-normal text-(color:--chart-title)">{s.caption}</span>
          </div>
          <BalanceRangeChart start={START} sessions={s.sessions} maxLoss={MAX_LOSS} target={TARGET} height={300} />
        </section>
      ))}
    </div>
  )
}
