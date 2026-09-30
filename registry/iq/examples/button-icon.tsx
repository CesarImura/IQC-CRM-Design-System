import { Edit, Filter, TrashCan } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-sm" variant="ghost" aria-label="Filter">
        <Filter />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Edit">
        <Edit />
      </Button>
      <Button size="icon-lg" variant="danger-outline" aria-label="Delete">
        <TrashCan />
      </Button>
    </div>
  )
}
