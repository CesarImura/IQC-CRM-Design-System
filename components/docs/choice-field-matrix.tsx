"use client"

import { CheckboxGroupField, RadioGroupField, ToggleField } from "@/registry/iq/ui/choice-field"

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

const toggleStates = [
  { label: "Default", props: {} },
  { label: "Hover", props: { visualState: "hover" as const } },
  { label: "Focus", props: { visualState: "focus" as const } },
  { label: "Active", props: { visualState: "pressed" as const } },
  ...states.slice(1),
]

/** Mirrors the Figma Radio group / Checkbox group / Toggle matrices. Toggle forces Hover, Focus and Active (pressed). */
export function ChoiceFieldMatrix({ type }: { type: "radio" | "checkbox" | "toggle" }) {
  const columns = type === "toggle" ? toggleStates : states
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">Content</th>
            {columns.map((s) => (
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
              {columns.map((s) => (
                <td key={s.label} className="border-l border-grid px-6 py-4 align-top">
                  <div className="w-[180px]">
                    {type === "toggle" ? (
                      <ToggleField label="Field label" required defaultChecked={content === "Filled"} helper="Helpful information" {...s.props} />
                    ) : type === "radio" ? (
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
