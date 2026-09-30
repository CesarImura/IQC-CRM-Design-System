"use client"

import { UserAvatar } from "@carbon/icons-react"

import { Pill } from "@/registry/iq/ui/pill"

export default function PillSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Pill size="sm" icon={<UserAvatar />} onDismiss={() => {}}>Small</Pill>
      <Pill size="md" icon={<UserAvatar />} onDismiss={() => {}}>Medium</Pill>
      <Pill size="lg" icon={<UserAvatar />} onDismiss={() => {}}>Large</Pill>
    </div>
  )
}
