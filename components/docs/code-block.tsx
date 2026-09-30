import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
}) {
  const html = await codeToHtml(code.trim(), { lang, theme: "github-dark-default" })

  return (
    <div className={cn("relative overflow-hidden rounded-[2px] border border-grid bg-[#0a0c0b]", className)}>
      {title && (
        <div className="border-b border-grid px-4 py-2 font-mono text-xs text-white/50">{title}</div>
      )}
      <CopyButton value={code.trim()} className="absolute top-1.5 right-1.5" />
      <div
        className="max-h-[480px] overflow-auto px-4 py-3.5 pr-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
