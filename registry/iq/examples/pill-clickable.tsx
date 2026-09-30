"use client"

import { useState } from "react"
import { Filter } from "@carbon/icons-react"

import { Pill } from "@/registry/iq/ui/pill"

export default function PillClickable() {
  const [log, setLog] = useState("Click a filter label, or its ×.")

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {["Stage: Diligence", "Owner: Ana", "Sector: Fintech"].map((filter) => (
          <Pill
            key={filter}
            color="blue"
            icon={<Filter />}
            onClick={() => setLog(`Edit “${filter}”`)}
            onDismiss={() => setLog(`Removed “${filter}”`)}
          >
            {filter}
          </Pill>
        ))}
      </div>
      <p className="text-sm text-white/50" aria-live="polite">
        {log}
      </p>
    </div>
  )
}
