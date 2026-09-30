"use client"

import { useMemo, useState } from "react"
import { Add, Download, UserAvatar } from "@carbon/icons-react"

import { Badge } from "@/registry/iq/ui/badge"
import { Button } from "@/registry/iq/ui/button"
import { createDataTableColumnHelper, DataTable } from "@/registry/iq/ui/data-table"
import { StatusDot } from "@/registry/iq/ui/status-dot"
import { ValueDate, ValueLink, ValueMono, ValuePhone, ValueText } from "@/registry/iq/ui/value-slot"

type Contact = {
  id: string
  name: string
  company: string
  email: string
  role: "Customer" | "Partner" | "Lead"
  phone: string
  status: "Active" | "At risk" | "Churned"
  createdAt: string
}

const names = ["Cesar Imura", "Ana Souza", "João Lima", "Marina Costa", "Pedro Alves", "Luiza Rocha", "Rafael Dias", "Beatriz Nunes"]
const companies = ["CI Trades", "Yunicorn", "Atlas Capital", "Nimbus", "Ferro Labs"]
const roles = ["Customer", "Partner", "Lead"] as const
const statuses = ["Active", "At risk", "Churned"] as const

const contacts: Contact[] = Array.from({ length: 64 }, (_, i) => ({
  id: `3083cd1f-cffe-454c-9f30-${String(i).padStart(12, "0")}`,
  name: names[i % names.length],
  company: companies[i % companies.length],
  email: `${names[i % names.length].split(" ")[0].toLowerCase()}@${companies[i % companies.length].toLowerCase().replace(" ", "")}.com`,
  role: roles[i % roles.length],
  phone: `+55 1487${String(3000 + i * 37).slice(0, 4)}-${String(4759 + i).slice(-4)}`,
  status: statuses[i % 3 === 2 && i % 5 === 0 ? 2 : i % 4 === 0 ? 1 : 0],
  createdAt: new Date(Date.UTC(2026, 7, 13, 23, 4) - i * 86_400_000 * 3).toISOString(),
}))

const col = createDataTableColumnHelper<Contact>()

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" })
const timeFormat = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })

export default function DataTableDemo() {
  const [selection, setSelection] = useState({})
  const selectedCount = Object.keys(selection).length

  const columns = useMemo(
    () =>
      col.columns([
        col.accessor("id", {
          header: "ID",
          enableSorting: false,
          cell: (info) => <ValueMono title={info.getValue()}>{info.getValue()}</ValueMono>,
        }),
        col.accessor("name", { header: "Name", cell: (info) => <ValueText>{info.getValue()}</ValueText> }),
        col.accessor("company", { header: "Company", cell: (info) => <ValueText>{info.getValue()}</ValueText> }),
        col.accessor("email", {
          header: "Email",
          cell: (info) => <ValueLink href={`mailto:${info.getValue()}`}>{info.getValue()}</ValueLink>,
        }),
        col.accessor("role", {
          header: "Role",
          cell: (info) => (
            <Badge color={info.getValue() === "Partner" ? "purple" : info.getValue() === "Lead" ? "yellow" : "blue"}>
              {info.getValue()}
            </Badge>
          ),
        }),
        col.accessor("phone", { header: "Phone", enableSorting: false, cell: (info) => <ValuePhone>{info.getValue()}</ValuePhone> }),
        col.accessor("status", {
          header: "Status",
          cell: (info) => (
            <StatusDot tone={info.getValue() === "Active" ? "positive" : info.getValue() === "At risk" ? "warning" : "negative"}>
              {info.getValue()}
            </StatusDot>
          ),
        }),
        col.accessor("createdAt", {
          header: "Created",
          cell: (info) => {
            const date = new Date(info.getValue())
            return <ValueDate date={dateFormat.format(date)} time={timeFormat.format(date)} dateTime={info.getValue()} />
          },
        }),
      ]),
    []
  )

  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={contacts}
      getRowId={(row) => row.id}
      enableRowSelection
      rowSelection={selection}
      onRowSelectionChange={setSelection}
      renderSelectionExtra={() => (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--table-avatar-bg) text-white/60">
          <UserAvatar size={16} />
        </span>
      )}
      toolbar={
        <>
          <p className="text-sm text-white/50">{selectedCount > 0 ? `${selectedCount} selected` : `${contacts.length} contacts`}</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Download />
              Export
            </Button>
            <Button size="sm">
              Add contact
              <Add />
            </Button>
          </div>
        </>
      }
      pagination={{ pageSizeOptions: [10, 25, 50] }}
    />
  )
}
