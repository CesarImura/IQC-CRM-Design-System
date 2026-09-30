"use client"

import { Restart } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"

const variants = [
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["ghost", "Ghost"],
  ["danger", "Danger Filled"],
  ["danger-outline", "Danger Outline"],
] as const

const sizes = [
  ["sm", "Small"],
  ["md", "Medium"],
  ["lg", "Large"],
] as const

const states = ["Default", "Disabled", "Loading"] as const

/** Mirrors the Figma "Button Default" matrix for side-by-side QA. Hover, pressed and focus are live. */
export function ButtonMatrix() {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-36 px-4 py-3 text-left text-xs font-medium text-white/50">
              Size · State
            </th>
            {variants.map(([, label]) => (
              <th key={label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.flatMap(([size, sizeLabel]) =>
            states.map((state, i) => (
              <tr key={`${size}-${state}`} className={i === 0 ? "border-t border-grid" : undefined}>
                <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">
                  <span className="text-white/80">{sizeLabel}</span> · {state}
                </th>
                {variants.map(([variant]) => (
                  <td key={variant} className="border-l border-grid px-4 py-3 text-center">
                    <Button
                      variant={variant}
                      size={size}
                      disabled={state === "Disabled"}
                      loading={state === "Loading"}
                    >
                      <Restart />
                      Button Label
                      <Restart />
                    </Button>
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
