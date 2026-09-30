"use client"

import * as React from "react"

import { LineChart, type LineChartSize, type LineSeries } from "@/registry/iq/ui/line-chart"
import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"
import {
  categories,
  formatY,
  newOrders,
  newOrdersSmall,
  oldOrders,
  oldOrdersSmall,
  ranges,
  returns,
  returnsSmall,
  xLabels,
} from "@/registry/iq/examples/line-chart-data"

const widths: Record<LineChartSize, number> = { sm: 364, md: 520, lg: 744 }
const types = ["Single", "Comparison", "Multi"] as const
const states = ["Default", "Hover", "Empty", "Error"] as const

function seriesFor(type: (typeof types)[number], small: boolean): LineSeries[] {
  const all = [
    { label: "New Orders", data: small ? newOrdersSmall : newOrders },
    { label: "Old Orders", data: small ? oldOrdersSmall : oldOrders },
    { label: "Returns", data: small ? returnsSmall : returns },
  ]
  return all.slice(0, type === "Single" ? 1 : type === "Comparison" ? 2 : 3)
}

/** Mirrors the Figma "LineChart" matrix: Type × State, one size at a time. Hover is forced on point 9. */
export function LineChartMatrix() {
  const [size, setSize] = React.useState<LineChartSize>("sm")
  const small = size === "sm"

  return (
    <div className="my-6 flex flex-col gap-4">
      <Tabs value={size} onValueChange={(v) => setSize(v as LineChartSize)}>
        <TabsPillList aria-label="Size">
          <TabsPillTrigger value="sm">Small</TabsPillTrigger>
          <TabsPillTrigger value="md">Medium</TabsPillTrigger>
          <TabsPillTrigger value="lg">Large</TabsPillTrigger>
        </TabsPillList>
      </Tabs>
      <div className="overflow-x-auto rounded-[2px] border border-grid">
        <table className="border-collapse text-sm">
          <thead>
            <tr className="border-b border-grid">
              <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">
                Type
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
                {states.map((state) => (
                  <td key={state} className="border-l border-grid p-6 align-top">
                    <LineChart
                      size={size}
                      style={{ width: widths[size] }}
                      title="Orders"
                      info="Orders placed in the selected range."
                      value={state === "Default" || state === "Hover" || !small ? "2,300" : undefined}
                      delta="+18%"
                      timestamp="Sep 21 2026, 08:13AM"
                      ranges={ranges}
                      categories={categories}
                      xLabels={small ? ["1 Jul", "Today"] : xLabels}
                      formatY={formatY}
                      series={seriesFor(type, small)}
                      status={state === "Empty" ? "empty" : state === "Error" ? "error" : "ready"}
                      activeIndex={state === "Hover" ? 9 : null}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
