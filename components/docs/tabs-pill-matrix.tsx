"use client"

import { ListBulleted } from "@carbon/icons-react"

import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"

const rows = [
  { label: "Active", active: true, trailing: false },
  { label: "Inactive", active: false, trailing: false },
  { label: "Active + Trailing", active: true, trailing: true },
  { label: "Inactive + Trailing", active: false, trailing: true },
]
const states = ["Default", "Hover", "Focus", "Disabled"] as const

/** Mirrors the Figma "_Tabs / Pill Item" matrix: Active × State × Trailing. */
export function TabsPillMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-40 px-4 py-3 text-left text-xs font-medium text-white/50">
              Item
            </th>
            {states.map((s) => (
              <th key={s} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-medium text-white/50">
                {row.label}
              </th>
              {states.map((state) => (
                <td key={state} className="border-l border-grid px-6 py-5 text-center">
                  <Tabs value={row.active ? "item" : "other"}>
                    <TabsPillList aria-label={`${row.label}, ${state}`} className="border-0 bg-transparent p-0">
                      <TabsPillTrigger
                        value="item"
                        icon={<ListBulleted />}
                        count={row.trailing ? 2 : undefined}
                        disabled={state === "Disabled"}
                        visualState={state === "Hover" ? "hover" : state === "Focus" ? "focus" : undefined}
                        tabIndex={-1}
                      >
                        Tab item
                      </TabsPillTrigger>
                    </TabsPillList>
                  </Tabs>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
