import { ArrowRight, Download } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">
        <Download />
        Download CSV
      </Button>
      <Button>
        Continue
        <ArrowRight />
      </Button>
    </div>
  )
}
