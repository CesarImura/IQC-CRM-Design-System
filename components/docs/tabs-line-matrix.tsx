"use client"

import { ListBulleted } from "@carbon/icons-react"

import { Tabs, TabsLineList, TabsLineTrigger, type TabsLineTone } from "@/registry/iq/ui/tabs"

const tones: TabsLineTone[] = ["neutral", "accent", "danger", "warning", "info"]
const rows = [
  { label: "Active", active: true, trailing: false },
  { label: "Inactive", active: false, trailing: false },
  { label: "Active + Trailing", active: true, trailing: true },
  { label: "Inactive + Trailing", active: false, trailing: true },
]
const states = ["Default", "Hover", "Focus", "Disabled"] as const

/** Mirrors the Figma "_Tabs / Line Item" matrix: Tone × Active × Trailing by State. */
export function TabsLineMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-48 px-4 py-3 text-left text-xs font-medium text-white/50">Tone · Item</th>
            {states.map((s) => (
              <th key={s} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tones.flatMap((tone) =>
            rows.map((row) => (
              <tr key={`${tone}-${row.label}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-2 text-left text-xs font-medium whitespace-nowrap text-white/50 capitalize">
                  {tone} · {row.label}
                </th>
                {states.map((state) => (
                  <td key={state} className="border-l border-grid px-4 py-3 text-center">
                    <Tabs value={row.active ? "item" : "other"} className="inline-flex">
                      <TabsLineList aria-label={`${tone} ${row.label} ${state}`} className="border-0 px-0">
                        <TabsLineTrigger
                          value="item"
                          tone={tone}
                          icon={<ListBulleted />}
                          count={row.trailing ? 2 : undefined}
                          disabled={state === "Disabled"}
                          visualState={state === "Hover" ? "hover" : state === "Focus" ? "focus" : undefined}
                          tabIndex={-1}
                        >
                          Tab item
                        </TabsLineTrigger>
                      </TabsLineList>
                    </Tabs>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
