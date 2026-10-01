"use client"

import { DatePicker, DayCell } from "@/registry/iq/ui/date-picker"

const statuses = ["Default", "Focus", "Error", "Disabled"] as const
const today = new Date(2025, 3, 6)

/** Mirrors the Figma "Date Picker" matrix: Size × Open by Status. Calendars are drawn in place, fixed to April 2025. */
export function DatePickerMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-36 px-4 py-3 text-left text-xs font-medium text-white/50">Size · Open</th>
            {statuses.map((s) => (
              <th key={s} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["sm", "md"] as const).flatMap((size) =>
            [false, true].map((open) => (
              <tr key={`${size}-${open}`} className="border-t border-grid">
                <th scope="row" className="px-4 py-3 text-left align-top text-xs font-medium whitespace-nowrap text-white/50">
                  {size === "sm" ? "Small" : "Medium"} · {open ? "Open" : "Closed"}
                </th>
                {statuses.map((status) => (
                  <td key={status} className="w-[280px] border-l border-grid px-5 py-5 align-top">
                    {status === "Disabled" && open ? (
                      <span className="text-xs text-white/30">—</span>
                    ) : (
                      <DatePicker
                        mode="range"
                        size={size}
                        label="Date"
                        today={today}
                        defaultValue={open ? { from: new Date(2025, 3, 8), to: new Date(2025, 3, 13) } : undefined}
                        error={status === "Error"}
                        disabled={status === "Disabled"}
                        visualState={status === "Focus" ? "focus" : undefined}
                        open={open}
                        inlinePanel
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

const cellRows = [
  { label: "Default", kind: "default" as const },
  { label: "Today", kind: "today" as const },
  { label: "Single selected", kind: "selected" as const },
  { label: "Range start", kind: "selected" as const, edge: "start" as const },
  { label: "Range middle", kind: "middle" as const },
  { label: "Range end", kind: "selected" as const, edge: "end" as const },
  { label: "Outside month", kind: "default" as const, outside: true },
  { label: "Disabled", kind: "default" as const, disabled: true },
]
const interactions = ["Default", "Hover", "Pressed", "Focus"] as const

/** Mirrors the Figma "_Calendar / Day Cell" matrix: Status / Selection by Interaction. */
export function DayCellMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-40 px-4 py-3 text-left text-xs font-medium text-white/50">Status</th>
            {interactions.map((i) => (
              <th key={i} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cellRows.map((row) => (
            <tr key={row.label} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-medium text-white/50">{row.label}</th>
              {interactions.map((i) => (
                <td key={i} className="border-l border-grid px-4 py-4">
                  {row.disabled && i !== "Default" ? (
                    <span className="block text-center text-xs text-white/30">—</span>
                  ) : (
                    <div className="mx-auto flex w-8">
                      <DayCell
                        tabIndex={-1}
                        aria-label={`${row.label} ${i}`}
                        kind={row.kind}
                        edge={row.edge}
                        outside={row.outside}
                        disabled={row.disabled}
                        visual={i === "Hover" ? "hover" : i === "Pressed" ? "pressed" : i === "Focus" ? "focus" : undefined}
                      >
                        1
                      </DayCell>
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
