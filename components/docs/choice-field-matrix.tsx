"use client"

import { CheckboxGroupField, RadioGroupField } from "@/registry/iq/ui/choice-field"

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
]

const states = [
  { label: "Default", props: {} },
  { label: "Warning", props: { status: "warning" as const } },
  { label: "Error", props: { status: "error" as const } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Read-only", props: { readOnly: true } },
]

/** Mirrors the Figma Radio group / Checkbox group matrices. Hover, press and Tab for the other states. */
export function ChoiceFieldMatrix({ type }: { type: "radio" | "checkbox" }) {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">Content</th>
            {states.map((s) => (
              <th key={s.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["Empty", "Filled"] as const).map((content) => (
            <tr key={content} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">{content}</th>
              {states.map((s) => (
                <td key={s.label} className="border-l border-grid px-6 py-4 align-top">
                  <div className="w-[180px]">
                    {type === "radio" ? (
                      <RadioGroupField
                        label="Field label"
                        required
                        options={options}
                        defaultValue={content === "Filled" ? "1" : undefined}
                        helper="Helpful information"
                        {...s.props}
                      />
                    ) : (
                      <CheckboxGroupField
                        label="Field label"
                        required
                        options={options}
                        defaultValue={content === "Filled" ? ["1"] : []}
                        helper="Helpful information"
                        {...s.props}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
