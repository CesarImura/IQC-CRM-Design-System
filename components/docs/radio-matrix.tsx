"use client"

import { RadioGroup, RadioGroupItem } from "@/registry/iq/ui/radio-group"

const interactions = [
  { label: "Default" },
  { label: "Hover", visual: "hover" as const },
  { label: "Focus", visual: "focus" as const },
  { label: "Pressed", visual: "pressed" as const },
  { label: "Disabled", disabled: true },
]
const selections = [
  { label: "Unselected", value: "" },
  { label: "Selected", value: "on" },
]

/** Mirrors the Figma "Radio" matrix: Selection × Interaction. Hover, Focus and Pressed are forced. */
export function RadioMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-white/50">Selection</th>
            {interactions.map((i) => (
              <th key={i.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {i.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selections.map((s) => (
            <tr key={s.label} className="h-20 border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{s.label}</th>
              {interactions.map((i) => (
                <td key={i.label} className="border-l border-grid px-6">
                  <RadioGroup value={s.value} aria-label={`${s.label}, ${i.label}`} className="items-center">
                    <RadioGroupItem value="on" visualState={i.visual} disabled={i.disabled} tabIndex={-1}>
                      Label
                    </RadioGroupItem>
                  </RadioGroup>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
