"use client"

import { ConditionPoint } from "@carbon/icons-react"
import { Command } from "cmdk"

import { OptionItem, type OptionSelection, type OptionSize, type OptionTone } from "@/registry/iq/ui/option-panel"

const columns: { selection: OptionSelection; tone: OptionTone }[] = (["none", "checkbox", "checkmark"] as OptionSelection[]).flatMap(
  (selection) => (["neutral", "warning", "danger"] as OptionTone[]).map((tone) => ({ selection, tone }))
)
const rows = [
  { label: "Default", hover: false, disabled: false, checked: false },
  { label: "Hover", hover: true, disabled: false, checked: false },
  { label: "Disabled", hover: false, disabled: true, checked: false },
  { label: "Selected", hover: false, disabled: false, checked: true },
]

/** Mirrors the Figma "_Option Panel / Item" matrix: Selection × Tone by State, per size. */
export function OptionItemMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">
              Size · State
            </th>
            {columns.map((c) => (
              <th key={`${c.selection}-${c.tone}`} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium whitespace-nowrap text-white/80 capitalize">
                {c.selection} · {c.tone}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["sm", "md"] as OptionSize[]).flatMap((size) =>
            rows.map((row) => (
              <tr key={`${size}-${row.label}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-white/50">
                  {size === "sm" ? "Small" : "Medium"} · {row.label}
                </th>
                {columns.map((c) => (
                  <td key={`${c.selection}-${c.tone}`} className="border-l border-grid px-3 py-3">
                    <Command className="relative w-[260px]" value="-">
                      <Command.List>
                        <OptionItem
                          size={size}
                          tone={c.tone}
                          selection={c.selection}
                          checked={row.checked}
                          disabled={row.disabled}
                          visualState={row.hover ? "hover" : undefined}
                          icon={<ConditionPoint />}
                          label="Option Label"
                          secondary="Option Label"
                        />
                      </Command.List>
                    </Command>
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
