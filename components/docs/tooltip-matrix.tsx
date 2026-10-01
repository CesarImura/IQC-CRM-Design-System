"use client"

import { Information } from "@carbon/icons-react"

import { TooltipBubble, type TooltipSide } from "@/registry/iq/ui/tooltip"

const sides: { label: string; side: TooltipSide }[] = [
  { label: "Bottom", side: "bottom" },
  { label: "Top", side: "top" },
  { label: "Left", side: "left" },
  { label: "Right", side: "right" },
]
const rows = [
  { label: "Default", icon: false, close: false },
  { label: "Icon", icon: true, close: false },
  { label: "Close", icon: false, close: true },
  { label: "Icon + Close", icon: true, close: true },
]
const noop = undefined

/** Mirrors the Figma "Tooltip" matrix: Content × Placement. Placement names where the bubble sits relative to the trigger. */
export function TooltipMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-36 px-4 py-3 text-left text-xs font-medium text-white/50">Content</th>
            {sides.map((s) => (
              <th key={s.side} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="h-20 border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{row.label}</th>
              {sides.map((s) => (
                <td key={s.side} className="border-l border-grid text-center">
                  <TooltipBubble side={s.side} icon={row.icon ? <Information /> : undefined} onClose={row.close ? () => {} : noop}>
                    Add to library
                  </TooltipBubble>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
