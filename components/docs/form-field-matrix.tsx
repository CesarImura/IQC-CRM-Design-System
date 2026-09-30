"use client"

import { CurrencyField, FieldInput, FormField, PasswordField, TextareaField } from "@/registry/iq/ui/form-field"

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

/** Mirrors the Figma Form Field / Input matrix: all eight states, with Hover, Focus and Active forced. */
export function FormFieldMatrix() {
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
              {states.map((s) => (
                <td key={s.label} className="border-l border-grid p-4 align-top">
                  <div className="w-[240px]">
                    <FormField
                      label="Field label"
                      required
                      size={row.size}
                      helper="Helpful information"
                      {...s.props}
                    >
                      <FieldInput placeholder="Placeholder" defaultValue={row.filled ? "Value" : undefined} />
                    </FormField>
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

/** One of each field type, filled, for comparison with the Figma sets. */
export function FormFieldTypes() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <PasswordField label="Password" required size="md" defaultValue="hunter2hunter2" helper="Helpful information" />
      <CurrencyField label="Amount" required size="md" defaultValue={1250} helper="Helpful information" />
      <TextareaField label="Description" required size="md" defaultValue="Value" helper="Helpful information" />
      <CurrencyField label="Amount" required size="sm" placeholder="0.00" helper="Helpful information" />
    </div>
  )
}
