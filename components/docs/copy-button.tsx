"use client"

import { useState } from "react"
import { Checkmark, Copy } from "@carbon/icons-react"

import { cn } from "@/lib/utils"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className={cn(
        "grid size-7 cursor-pointer place-items-center rounded-[2px] text-white/50 outline-none transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]",
        className
      )}
    >
      {copied ? <Checkmark size={16} className="text-brand" /> : <Copy size={16} />}
    </button>
  )
}
