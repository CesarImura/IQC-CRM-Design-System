"use client"

import { BalanceRangeChart } from "@/registry/iq/ui/balance-range-chart"
import { MAX_LOSS, START, TARGET, seed, winningRun } from "@/registry/iq/examples/balance-range-chart-data"

const types = ["Challenge", "Funded"] as const
const states = ["Default", "Hover", "Below start", "Target reached"] as const

const profit = seed("profit")
const drawdown = seed("drawdown")
const passed = winningRun().sessions

/** Account type × State. Hover is forced on session #10; Funded has no target, so it has no "Target reached" state. */
export function BalanceRangeChartMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">
              Account
            </th>
            {states.map((s) => (
              <th key={s} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-medium text-white/50">
                {type}
              </th>
              {states.map((state) => {
                const funded = type === "Funded"
                if (funded && state === "Target reached") {
                  return (
                    <td key={state} className="border-l border-grid p-6 align-middle">
                      <span className="block w-[440px] text-center text-xs text-white/40">No target on Funded accounts</span>
                    </td>
                  )
                }
                const sessions = state === "Below start" ? drawdown : state === "Target reached" ? passed : profit
                return (
                  <td key={state} className="border-l border-grid p-6 align-top">
                    <div className="w-[440px] rounded-(--chart-card-radius) border border-(--chart-card-border) bg-(--surface-raised) p-4">
                      <BalanceRangeChart
                        start={START}
                        sessions={sessions}
                        maxLoss={MAX_LOSS}
                        target={funded ? undefined : TARGET}
                        height={260}
                        activeIndex={state === "Hover" ? 10 : null}
                      />
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
