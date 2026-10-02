"use client"

import { Autocomplete, Select, type ComboboxOption, type ComboboxSize } from "@/registry/iq/ui/combobox"

const options: ComboboxOption[] = [
  { value: "a", label: "Option Label", secondary: "Option Label", group: "Option label" },
  { value: "b", label: "Option Label", secondary: "Option Label", group: "Option label" },
]

const domainOptions: ComboboxOption[] = [
  { value: "gmail.com", label: "gmail.com", secondary: "Personal", group: "Option label" },
  { value: "gmail.com.br", label: "gmail.com.br", secondary: "Personal", group: "Option label" },
]

const selectStates = ["Default", "Focus", "Error", "Disabled"] as const
const autocompleteStates = ["Default", "Focus", "Active", "Error", "Disabled"] as const
const columns = [
  { label: "Closed", open: false, hover: false },
  { label: "Closed + Hover", open: false, hover: true },
  { label: "Open", open: true, hover: false },
  { label: "Open + Hover", open: true, hover: true },
]

/** Mirrors the Figma Combo Box matrix: Size × State by Closed / Hover / Open (Autocomplete adds Active). Panels are drawn in place. */
export function ComboboxMatrix({ type }: { type: "select" | "autocomplete" }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-white/50">
              Size · State
            </th>
            {columns.map((c) => (
              <th key={c.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["sm", "md"] as ComboboxSize[]).flatMap((size) =>
            (type === "select" ? selectStates : autocompleteStates).map((state) => (
              <tr key={`${size}-${state}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-3 text-left align-top text-xs font-medium text-white/50">
                  {size === "sm" ? "Small" : "Medium"} · {state}
                </th>
                {columns.map((c) => {
                  if (state === "Disabled" && (c.open || c.hover)) {
                    return <td key={c.label} className="border-l border-grid px-6 py-5 text-center text-xs text-white/30">—</td>
                  }
                  const common = {
                    size,
                    label: "Label",
                    options,
                    error: state === "Error",
                    disabled: state === "Disabled",
                    visualState: state === "Focus" ? ("focus" as const) : state === "Active" ? ("active" as const) : c.hover ? ("hover" as const) : undefined,
                    open: c.open,
                    inlinePanel: true,
                  }
                  return (
                    <td key={c.label} className="w-[368px] border-l border-grid px-6 py-5 align-top">
                      <div className="w-80">
                        {type === "select" ? (
                          <Select {...common} visualState={common.visualState === "active" ? undefined : common.visualState} placeholder="Placeholder Text" defaultValue="a" searchPlaceholder="Placeholder text" />
                        ) : (
                          <Autocomplete {...common} defaultValue={state === "Active" ? "gma" : "gmail.com"} options={domainOptions} />
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
