"use client"

import { Button } from "@/registry/iq/ui/button"
import { Badge } from "@/registry/iq/ui/badge"
import { FieldGrid, FieldGridRow } from "@/registry/iq/ui/field-grid"

const rowStates = [
  { label: "Default" },
  { label: "Hover", visual: "hover" as const },
  { label: "Focus", visual: "focus" as const },
  { label: "Copied", visual: "copied" as const },
]

/** _Field Grid / Row: State × Label width. */
export function FieldGridRowMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">State</th>
            {["Label 160", "Label 120"].map((h) => (
              <th key={h} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowStates.map((s) => (
            <tr key={s.label} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{s.label}</th>
              {(["default", "narrow"] as const).map((w) => (
                <td key={w} className="border-l border-grid p-4">
                  <div className="w-[447px]">
                    <FieldGrid labelWidth={w}>
                      <FieldGridRow label="ID" copyValue="Name" visualState={s.visual} badge={<Badge color="green" size="sm">Label</Badge>}>
                        Name
                      </FieldGridRow>
                    </FieldGrid>
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

const rows = (n: number) =>
  Array.from({ length: n }, (_, i) => (
    <FieldGridRow key={i} label="ID" copyValue="Name">
      Name
    </FieldGridRow>
  ))

/** Field Grid: Columns × State. */
export function FieldGridMatrix() {
  const action = (error: boolean) => (
    <Button size="sm" variant={error ? "danger" : "primary"} tabIndex={-1}>
      {error ? "Try again" : "Add field"}
    </Button>
  )
  return (
    <div className="my-6 grid gap-6 overflow-x-auto rounded-[2px] border border-grid p-6 xl:grid-cols-2">
      {[
        { label: "1 column · Default", node: <FieldGrid>{rows(4)}</FieldGrid> },
        { label: "1 column · Read Only", node: <FieldGrid state="read-only">{rows(4)}</FieldGrid> },
        { label: "Empty", node: <FieldGrid state="empty" statusContent={{ description: "No details for this record yet.", action: action(false) }} /> },
        { label: "Error", node: <FieldGrid state="error" statusContent={{ action: action(true) }} /> },
      ].map((c) => (
        <div key={c.label} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-white/50">{c.label}</p>
          <div className="w-[447px] border border-grid">{c.node}</div>
        </div>
      ))}
      <div className="flex flex-col gap-2 xl:col-span-2">
        <p className="text-xs font-medium text-white/50">Multiple columns (2 on medium screens, 3 on wide)</p>
        <div className="border border-grid">
          <FieldGrid columns={3}>{rows(6)}</FieldGrid>
        </div>
      </div>
    </div>
  )
}
