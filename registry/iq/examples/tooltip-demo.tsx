"use client"

import { Add, Information, OverflowMenuVertical, TrashCan } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { Tooltip } from "@/registry/iq/ui/tooltip"

// Hover or Tab to an icon button. The last one has a close button, so it opens on click.
export default function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Tooltip content="Add to library" side="top">
        <Button variant="secondary" size="icon-sm" aria-label="Add to library">
          <Add />
        </Button>
      </Tooltip>
      <Tooltip content="More actions" side="bottom">
        <Button variant="secondary" size="icon-sm" aria-label="More actions">
          <OverflowMenuVertical />
        </Button>
      </Tooltip>
      <Tooltip content="Delete deal" side="right" icon={<Information />}>
        <Button variant="secondary" size="icon-sm" aria-label="Delete deal">
          <TrashCan />
        </Button>
      </Tooltip>
      <Tooltip content="New: filter by owner" side="bottom" icon={<Information />} closable>
        <Button variant="secondary" size="sm">
          What’s new
        </Button>
      </Tooltip>
    </div>
  )
}
