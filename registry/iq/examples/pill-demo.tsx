"use client"

import { useState } from "react"
import { UserAvatar } from "@carbon/icons-react"

import { Pill } from "@/registry/iq/ui/pill"

export default function PillDemo() {
  const [emails, setEmails] = useState(["user@email.com", "ana@iqcapital.com", "joao@iqcapital.com"])

  return (
    <div className="flex flex-wrap items-center gap-2">
      {emails.map((email) => (
        <Pill
          key={email}
          icon={<UserAvatar />}
          onDismiss={() => setEmails((list) => list.filter((e) => e !== email))}
        >
          {email}
        </Pill>
      ))}
      {emails.length === 0 && <span className="text-sm text-white/40">All removed. Reload to reset.</span>}
    </div>
  )
}
