"use client"

import { useState } from "react"

import { RadioGroup, RadioGroupItem } from "@/registry/iq/ui/radio-group"

export default function RadioGroupDemo() {
  const [plan, setPlan] = useState("monthly")

  return (
    <RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing">
      <RadioGroupItem value="monthly" description="Pay as you go, cancel anytime">
        Monthly
      </RadioGroupItem>
      <RadioGroupItem value="yearly" description="Two months free">
        Yearly
      </RadioGroupItem>
      <RadioGroupItem value="custom" disabled description="Talk to sales">
        Custom
      </RadioGroupItem>
    </RadioGroup>
  )
}
