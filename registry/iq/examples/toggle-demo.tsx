"use client"

import { useState } from "react"

import { ToggleField } from "@/registry/iq/ui/choice-field"
import { Toggle } from "@/registry/iq/ui/toggle"

export default function ToggleDemo() {
  const [alerts, setAlerts] = useState(true)
  return (
    <div className="flex flex-col items-start gap-6">
      <Toggle checked={alerts} onCheckedChange={setAlerts} description="Email me when a deal changes stage.">
        Deal alerts
      </Toggle>
      <Toggle defaultChecked={false}>Weekly digest</Toggle>
      <Toggle disabled defaultChecked description="Managed by your admin.">
        Two-factor login
      </Toggle>
      <div className="w-72">
        <ToggleField label="Public profile" defaultChecked helper="Visible to founders in the deal room." />
      </div>
    </div>
  )
}
