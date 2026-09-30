"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/iq/ui/checkbox"

const stages = ["Sourcing", "Diligence", "Term sheet", "Closed"]

export default function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>(["Diligence"])
  const all = selected.length === stages.length
  const some = selected.length > 0 && !all

  return (
    <fieldset className="flex flex-col">
      <legend className="sr-only">Stages</legend>
      <Checkbox
        checked={all ? true : some ? "indeterminate" : false}
        onCheckedChange={(value) => setSelected(value === true ? stages : [])}
      >
        All stages
      </Checkbox>
      <div className="flex flex-col pl-8">
        {stages.map((stage) => (
          <Checkbox
            key={stage}
            checked={selected.includes(stage)}
            onCheckedChange={(value) =>
              setSelected((current) => (value === true ? [...current, stage] : current.filter((s) => s !== stage)))
            }
          >
            {stage}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  )
}
