"use client"

import { BalanceRangeChart, BalanceRangeLegend } from "@/registry/iq/ui/balance-range-chart"
import { MAX_LOSS, START, TARGET, seed } from "@/registry/iq/examples/balance-range-chart-data"

const sessions = seed("profit")

/** Challenge (target band on top) next to Funded (no ceiling, high-water mark). */
export default function BalanceRangeChartTypes() {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      {(["challenge", "funded"] as const).map((mode) => (
        <section
          key={mode}
          className="flex min-w-0 flex-col gap-4 rounded-(--chart-card-radius) border border-(--chart-card-border) bg-(--surface-raised) p-(--chart-padding)"
        >
          <span className="text-base leading-normal text-(color:--chart-title)">{mode === "challenge" ? "Challenge" : "Funded"}</span>
          <BalanceRangeChart start={START} sessions={sessions} maxLoss={MAX_LOSS} target={mode === "challenge" ? TARGET : undefined} height={320} />
          <BalanceRangeLegend funded={mode === "funded"} />
        </section>
      ))}
    </div>
  )
}
