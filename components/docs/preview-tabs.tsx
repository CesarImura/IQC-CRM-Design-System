"use client"

import { useId, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function PreviewTabs({ preview, code }: { preview: ReactNode; code: ReactNode }) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const id = useId()

  const tabs = [
    { value: "preview", label: "Preview" },
    { value: "code", label: "Code" },
  ] as const

  return (
    <div>
      <div role="tablist" aria-label="Example view" className="mb-3 flex gap-4 border-b border-grid">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            type="button"
            id={`${id}-${t.value}-tab`}
            aria-selected={tab === t.value}
            aria-controls={`${id}-${t.value}`}
            onClick={() => setTab(t.value)}
            className={cn(
              "-mb-px cursor-pointer border-b-2 border-transparent pb-2 text-sm text-white/50 outline-none transition-colors hover:text-white focus-visible:text-white",
              tab === t.value && "border-brand text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-preview`} aria-labelledby={`${id}-preview-tab`} hidden={tab !== "preview"}>
        {preview}
      </div>
      <div role="tabpanel" id={`${id}-code`} aria-labelledby={`${id}-code-tab`} hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  )
}
