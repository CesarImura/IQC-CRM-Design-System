"use client"

import { Toggle } from "@/registry/iq/ui/toggle"

const states = [
  { label: "Default" },
  { label: "Hover", visual: "hover" as const },
  { label: "Focus", visual: "focus" as const },
  { label: "Pressed", visual: "pressed" as const },
  { label: "Disabled", disabled: true },
]

/** Mirrors the Figma "Toggle" matrix: Active × State. Hover, Focus and Pressed are forced. */
export function ToggleMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">Active</th>
            {states.map((s) => (
              <th key={s.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[true, false].map((on) => (
            <tr key={String(on)} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{on ? "True" : "False"}</th>
              {states.map((s) => (
                <td key={s.label} className="border-l border-grid px-5 py-5">
                  <Toggle checked={on} visualState={s.visual} disabled={s.disabled} tabIndex={-1} description="Toggle description" rowClassName="whitespace-nowrap">
                    Toggle Label
                  </Toggle>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
