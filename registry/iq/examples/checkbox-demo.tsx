"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/iq/ui/checkbox"

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)}>
      Email me weekly deal updates
    </Checkbox>
  )
}
