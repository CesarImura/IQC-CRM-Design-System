"use client"

import { UserAvatar } from "@carbon/icons-react"

import { Pill, type PillColor } from "@/registry/iq/ui/pill"

const colors: PillColor[] = ["gray", "white", "blue", "green", "yellow", "red", "purple"]
const sizes = ["sm", "md", "lg"] as const
const states = ["Default", "Disabled"] as const

/** Mirrors the Figma Pill matrix. Hover, press and Tab through the pills for the other states. */
export function PillMatrix() {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[980px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-white/50">Size · State</th>
            {colors.map((c) => (
              <th key={c} scope="col" className="border-l border-grid px-3 py-3 text-xs font-medium text-white/80 capitalize">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.flatMap((size) =>
            states.map((state, i) => (
              <tr key={`${size}-${state}`} className={i === 0 ? "border-t border-grid" : undefined}>
                <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">
                  <span className="text-white/80 uppercase">{size}</span> · {state}
                </th>
                {colors.map((color) => (
                  <td key={color} className="border-l border-grid px-3 py-3 text-center">
                    <Pill
                      color={color}
                      size={size}
                      icon={<UserAvatar />}
                      onDismiss={() => {}}
                      dismissLabel={`Remove ${color} pill`}
                      disabled={state === "Disabled"}
                    >
                      Pill label
                    </Pill>
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
