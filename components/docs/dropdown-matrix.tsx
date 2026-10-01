"use client"

import { OverflowMenuVertical } from "@carbon/icons-react"

import { Dropdown, type ComboboxOption } from "@/registry/iq/ui/combobox"

const options: ComboboxOption[] = [
  { value: "a", label: "Option Label", secondary: "Option Label", group: "Option label" },
  { value: "b", label: "Option Label", secondary: "Option Label", group: "Option label" },
]
const states = ["Default", "Focus", "Error", "Disabled"] as const

/** Dropdown matrix: State by Closed / Hover / Open, left and right aligned, plus Icon Only. Small size; Medium is the same with the 40px trigger. */
export function DropdownMatrix({ iconOnly = false }: { iconOnly?: boolean }) {
  const cols = [
    { label: "Closed", open: false, hover: false, align: "start" as const },
    { label: "Hover", open: false, hover: true, align: "start" as const },
    { label: "Open · Left", open: true, hover: false, align: "start" as const },
    { label: "Open · Right", open: true, hover: false, align: "end" as const },
  ]
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">State</th>
            {cols.map((c) => (
              <th key={c.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left align-top text-xs font-medium text-white/50">{state}</th>
              {cols.map((c) => (
                <td key={c.label} className="w-[330px] border-l border-grid px-4 py-5 align-top">
                  {state === "Disabled" && (c.open || c.hover) ? (
                    <span className="text-xs text-white/30">—</span>
                  ) : (
                    <div className={c.align === "end" ? "flex justify-end" : "flex"}>
                      <Dropdown
                        multiple
                        label="Label"
                        placeholder="Value/Label"
                        options={options}
                        iconOnly={iconOnly ? <OverflowMenuVertical /> : undefined}
                        align={c.align}
                        error={state === "Error"}
                        disabled={state === "Disabled"}
                        visualState={state === "Focus" ? "focus" : c.hover ? "hover" : undefined}
                        open={c.open}
                        inlinePanel
                        searchPlaceholder="Placeholder text"
                      />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
