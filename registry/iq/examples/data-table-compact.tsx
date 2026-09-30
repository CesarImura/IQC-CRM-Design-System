"use client"

import { createDataTableColumnHelper, DataTable } from "@/registry/iq/ui/data-table"
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

export default function DataTableCompact() {
  return <DataTable className="w-full" variant="compact" size="md" columns={columns} data={data} pagination={false} />
}
