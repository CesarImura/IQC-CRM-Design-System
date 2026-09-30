"use client"

import { useState } from "react"
import { Tag } from "@carbon/icons-react"

import { Badge } from "@/registry/iq/ui/badge"

export default function BadgeAnatomy() {
  const [tags, setTags] = useState(["Fintech", "Series A", "LatAm"])

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="green" dot>
        Live
      </Badge>
      <Badge color="purple">
        <Tag />
        Priority
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          color="white"
          variant="outline"
          onDismiss={() => setTags((t) => t.filter((x) => x !== tag))}
          dismissLabel={`Remove ${tag}`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
