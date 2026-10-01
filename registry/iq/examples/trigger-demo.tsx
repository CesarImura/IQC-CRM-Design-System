"use client"

import { Calendar } from "@carbon/icons-react"

import { Trigger } from "@/registry/iq/ui/trigger"

export default function TriggerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Trigger size="sm" icon={<Calendar />} value="Value/Label" />
      <Trigger size="md" icon={<Calendar />} value="Value/Label" />
      <Trigger size="lg" icon={<Calendar />} value="Value/Label" />
    </div>
  )
}
