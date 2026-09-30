"use client"

import { useState } from "react"

import { CheckboxGroupField, RadioGroupField } from "@/registry/iq/ui/choice-field"

const stages = [
  { value: "sourcing", label: "Sourcing" },
  { value: "diligence", label: "Diligence" },
  { value: "closed", label: "Closed" },
]

export default function ChoiceFieldDemo() {
  const [type, setType] = useState("")
  const [notify, setNotify] = useState<string[]>(["email"])

  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-8 sm:grid-cols-2">
      <RadioGroupField
        label="Deal stage"
        required
        options={stages}
        value={type}
        onValueChange={setType}
        status={type === "" ? "warning" : undefined}
        helper={type === "" ? "Pick a stage before saving." : "Stage moves the deal in the pipeline."}
      />
      <CheckboxGroupField
        label="Notify me by"
        options={[
          { value: "email", label: "Email" },
          { value: "slack", label: "Slack" },
          { value: "sms", label: "SMS", disabled: true },
        ]}
        value={notify}
        onValueChange={setNotify}
        helper="SMS is available on the Pro plan."
      />
    </div>
  )
}
