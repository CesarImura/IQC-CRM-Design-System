"use client"

import { Add } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { Dropdown } from "@/registry/iq/ui/combobox"
import { PageHeader } from "@/registry/iq/ui/page-header"
import { Toolbar } from "@/registry/iq/ui/toolbar"

export default function PageHeaderDemo() {
  return (
    <div className="w-full border border-grid">
      <PageHeader
        title="Pipeline"
        info="All open deals across your funds."
        actions={
          <Toolbar
            surface={false}
            filters={
              <>
                <Dropdown label="Fund" hideLabel placeholder="IQ Capital Fund II" search={false} options={[{ value: "ii", label: "IQ Capital Fund II" }, { value: "iii", label: "IQ Capital Fund III" }]} />
                <Dropdown label="Period" hideLabel placeholder="This year" search={false} options={[{ value: "y", label: "This year" }, { value: "q", label: "This quarter" }]} />
              </>
            }
            actions={
              <Button size="sm">
                <Add />
                New deal
              </Button>
            }
          />
        }
      />
    </div>
  )
}
