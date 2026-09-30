"use client"

import { useState } from "react"

import { Button } from "@/registry/iq/ui/button"
import { createDataTableColumnHelper, DataTable } from "@/registry/iq/ui/data-table"

type Row = { name: string; company: string; email: string }
const col = createDataTableColumnHelper<Row>()
const columns = col.columns([
  col.accessor("name", { header: "Name" }),
  col.accessor("company", { header: "Company" }),
  col.accessor("email", { header: "Email" }),
])

const states = ["empty", "loading", "error"] as const

export default function DataTableStates() {
  const [state, setState] = useState<(typeof states)[number]>("empty")

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-2" role="group" aria-label="Body state">
        {states.map((s) => (
          <Button key={s} size="sm" variant={s === state ? "primary" : "secondary"} onClick={() => setState(s)}>
            {s[0].toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={[]}
        status={state === "loading" ? "loading" : state === "error" ? "error" : "ready"}
        onRetry={() => setState("loading")}
        emptyState={{ action: <Button size="sm">Add contact</Button> }}
        pagination={false}
      />
    </div>
  )
}
