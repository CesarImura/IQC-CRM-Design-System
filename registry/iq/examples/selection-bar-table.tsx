"use client"

import * as React from "react"

import { Button } from "@/registry/iq/ui/button"
import { createDataTableColumnHelper, DataTable, type DataTableProps } from "@/registry/iq/ui/data-table"
import { SelectionBar } from "@/registry/iq/ui/selection-bar"
import { toast } from "@/registry/iq/ui/toast"
import { ValueMono, ValueText } from "@/registry/iq/ui/value-slot"

type Deal = { code: string; company: string; stage: string; owner: string }
const col = createDataTableColumnHelper<Deal>()
const columns = col.columns([
  col.accessor("code", { header: "Code", cell: (i) => <ValueMono>{i.getValue()}</ValueMono> }),
  col.accessor("company", { header: "Company", cell: (i) => <ValueText>{i.getValue()}</ValueText> }),
  col.accessor("stage", { header: "Stage", cell: (i) => <ValueText>{i.getValue()}</ValueText> }),
  col.accessor("owner", { header: "Owner", cell: (i) => <ValueText>{i.getValue()}</ValueText> }),
])
const data: Deal[] = [
  { code: "DL-2041", company: "Nimbus", stage: "Diligence", owner: "Ana Souza" },
  { code: "DL-2042", company: "Ferro Labs", stage: "Term sheet", owner: "João Lima" },
  { code: "DL-2043", company: "Atlas Capital", stage: "Sourcing", owner: "Marina Costa" },
  { code: "DL-2044", company: "Yunicorn", stage: "Closed", owner: "Cesar Imura" },
]

// Select rows: the bar slides in with the count. Clear (or unchecking everything) slides it out.
export default function SelectionBarTable() {
  const [selection, setSelection] = React.useState<NonNullable<DataTableProps<Deal>["rowSelection"]>>({})
  const count = Object.values(selection).filter(Boolean).length
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="min-h-16">
        <SelectionBar count={count} onClear={() => setSelection({})}>
          <Button variant="secondary" size="sm" onClick={() => toast.success(`Exported ${count} deals`)}>
            Export
          </Button>
          <Button variant="danger" size="sm" onClick={() => toast.warning(`${count} deals deactivated`, { action: { label: "Undo", onClick: () => {} } })}>
            Deactivate
          </Button>
        </SelectionBar>
      </div>
      <DataTable
        className="w-full"
        variant="compact"
        size="md"
        columns={columns}
        data={data}
        pagination={false}
        enableRowSelection
        getRowId={(row) => row.code}
        rowSelection={selection}
        onRowSelectionChange={setSelection}
      />
    </div>
  )
}
