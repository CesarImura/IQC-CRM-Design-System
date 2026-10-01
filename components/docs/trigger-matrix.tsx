"use client"

import { Calendar } from "@carbon/icons-react"

import { Trigger, type TriggerSize } from "@/registry/iq/ui/trigger"

const states = ["Default", "Focus", "Error", "Disabled"] as const
const cols = [
  { label: "Default", open: false, hover: false },
  { label: "Hover", open: false, hover: true },
  { label: "Active", open: true, hover: false },
  { label: "Active + Hover", open: true, hover: true },
]

/** Mirrors the Figma "Trigger" matrix: Size × State by Default / Hover / Active / Active + Hover. */
export function TriggerMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-36 px-4 py-3 text-left text-xs font-medium text-white/50">Size · State</th>
            {cols.map((c) => (
              <th key={c.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["sm", "md", "lg"] as TriggerSize[]).flatMap((size) =>
            states.map((state) => (
              <tr key={`${size}-${state}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-white/50">
                  {{ sm: "Small", md: "Medium", lg: "Large" }[size]} · {state}
                </th>
                {cols.map((c) => (
                  <td key={c.label} className="border-l border-grid px-5 py-5 text-center">
                    {state === "Disabled" && (c.open || c.hover) ? (
                      <span className="text-xs text-white/30">—</span>
                    ) : (
                      <Trigger
                        size={size}
                        tabIndex={-1}
                        icon={<Calendar />}
                        value="Value/Label"
                        open={c.open}
                        error={state === "Error"}
                        disabled={state === "Disabled"}
                        visualState={state === "Focus" ? "focus" : c.hover ? "hover" : undefined}
                        className="mx-auto"
                      />
                    )}
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
