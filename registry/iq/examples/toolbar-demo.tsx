"use client"

import { Add, Filter } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { Dropdown } from "@/registry/iq/ui/combobox"
import { DatePicker } from "@/registry/iq/ui/date-picker"
import { SearchBar } from "@/registry/iq/ui/search-bar"
import { Toggle } from "@/registry/iq/ui/toggle"
import { Toolbar, ToolbarDivider } from "@/registry/iq/ui/toolbar"

const stages = [
  { value: "lead", label: "Lead" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
]

function Filters({ wide }: { wide?: boolean }) {
  return (
    <>
      <div className={wide ? "w-[343px]" : "w-64"}>
        <SearchBar placeholder="Search deals" />
      </div>
      <Button variant="secondary" size="icon-sm" aria-label="More filters">
        <Filter />
      </Button>
      <ToolbarDivider />
      <Dropdown label="Stage" hideLabel placeholder="Any stage" search={false} options={stages} />
      <DatePicker placeholder="Close date" />
      <Toggle defaultChecked>Mine only</Toggle>
    </>
  )
}

export default function ToolbarDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Toolbar
        filters={<Filters wide />}
        actions={
          <>
            <Dropdown label="View" hideLabel placeholder="Table" search={false} options={[{ value: "table", label: "Table" }, { value: "board", label: "Board" }]} />
            <Button size="sm">
              <Add />
              New deal
            </Button>
          </>
        }
      />
      <Toolbar
        stack="vertical"
        filters={<Filters />}
        actions={
          <Button size="sm">
            <Add />
            New deal
          </Button>
        }
      />
    </div>
  )
}
