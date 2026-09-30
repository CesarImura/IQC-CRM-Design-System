"use client"

import { UserAvatar } from "@carbon/icons-react"

import { Pill } from "@/registry/iq/ui/pill"

export default function PillDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Pill icon={<UserAvatar />} onDismiss={() => {}} disabled>
        user@email.com
      </Pill>
      <Pill color="green" icon={<UserAvatar />} onDismiss={() => {}} disabled>
        Locked owner
      </Pill>
    </div>
  )
}
