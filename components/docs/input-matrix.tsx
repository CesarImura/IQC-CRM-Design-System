"use client"

import { Input, TextArea } from "@/registry/iq/ui/input"

const states = ["Default", "Focus", "Error", "Disabled", "Read-only", "Active"] as const

/** Mirrors the Figma "Input" (or "Text Area") matrix: Size × State by Rest / Hover. */
export function InputMatrix({ kind = "input" }: { kind?: "input" | "textarea" }) {
  const Field = kind === "textarea" ? TextArea : Input
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-36 px-4 py-3 text-left text-xs font-medium text-white/50">
              Size · State
            </th>
            {["Rest", "Hover"].map((h) => (
              <th key={h} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["sm", "md"] as const).flatMap((size) =>
            states.map((state) => (
              <tr key={`${size}-${state}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-white/50">
                  {size === "sm" ? "Small" : "Medium"} · {state}
                </th>
                {[false, true].map((hover) => (
                  <td key={String(hover)} className="border-l border-grid px-6 py-5">
                    {hover && (state === "Disabled" || state === "Read-only") ? (
                      <span className="text-xs text-white/30">—</span>
                    ) : (
                      <Field
                        size={size}
                        tabIndex={-1}
                        aria-label={`${state}${hover ? " hover" : ""}`}
                        placeholder="Placeholder text"
                        error={state === "Error"}
                        disabled={state === "Disabled"}
                        readOnly={state === "Read-only"}
                        visualState={state === "Focus" ? "focus" : state === "Active" ? "active" : hover ? "hover" : undefined}
                        visualHover={hover}
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
