"use client"

import { useState } from "react"
import { Restart } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"

export default function ButtonLoading() {
  const [loading, setLoading] = useState(false)

  function sync() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button loading={loading} onClick={sync}>
        <Restart />
        Sync contacts
      </Button>
      <Button variant="secondary" loading>
        Saving
      </Button>
      <Button variant="secondary" size="icon" loading aria-label="Refresh">
        <Restart />
      </Button>
    </div>
  )
}
