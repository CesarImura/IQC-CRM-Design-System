"use client"

import { AutocompleteField, DateField, SelectField } from "@/registry/iq/ui/select-field"

const options = [
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
]

const states = [
  { label: "Default", props: {} },
  { label: "Hover", props: { visualState: "hover" as const } },
  { label: "Focus", props: { visualState: "focus" as const } },
  { label: "Active", props: { visualState: "active" as const } },
  { label: "Warning", props: { status: "warning" as const } },
  { label: "Error", props: { status: "error" as const } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Read-only", props: { readOnly: true } },
]

const rows = [
  { label: "Small / Empty", size: "sm" as const, filled: false },
  { label: "Small / Filled", size: "sm" as const, filled: true },
  { label: "Medium / Empty", size: "md" as const, filled: false },
  { label: "Medium / Filled", size: "md" as const, filled: true },
]

/**
 * Mirrors the Figma Form Field / Select, / Autocomplete and / Date matrices: all eight states with Hover, Focus and
 * Active forced. Active here is the control only; open the live demo to see the panel.
 */
export function PickerFieldMatrix({ type }: { type: "select" | "autocomplete" | "date" }) {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-white/50">Size · Content</th>
            {states.map((s) => (
              <th key={s.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">{row.label}</th>
              {states.map((s) => {
                const common = { label: "Field label", required: true, size: row.size, helper: "Helpful information", ...s.props }
                return (
                  <td key={s.label} className="border-l border-grid p-4 align-top">
                    <div className="w-[240px]">
                      {type === "select" ? (
                        <SelectField {...common} options={options} defaultValue={row.filled ? "series-a" : null} />
                      ) : type === "autocomplete" ? (
                        <AutocompleteField {...common} options={options} defaultValue={row.filled ? "Series A" : ""} open={false} />
                      ) : (
                        <DateField {...common} defaultValue={row.filled ? new Date(2026, 8, 29) : null} />
                      )}
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
