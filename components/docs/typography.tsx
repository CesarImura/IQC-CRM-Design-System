import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="mb-10 border-b border-grid pb-8">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium tracking-wider text-brand uppercase">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>
      )}
      {children && <div className="mt-6 flex flex-wrap gap-2">{children}</div>}
    </header>
  )
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function H2({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slug(children)
  return (
    <h2 id={anchor} className="group mt-14 mb-4 scroll-mt-20 text-xl font-semibold tracking-tight text-white">
      <a href={`#${anchor}`} className="outline-none focus-visible:underline">
        {children}
        <span aria-hidden className="ml-2 text-white/20 opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
      </a>
    </h2>
  )
}

export function H3({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slug(children)
  return (
    <h3 id={anchor} className="mt-10 mb-3 scroll-mt-20 text-base font-semibold text-white">
      {children}
    </h3>
  )
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("my-4 leading-7 text-white/70", className)}>{children}</p>
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[2px] border border-grid bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.85em] text-white/90">
      {children}
    </code>
  )
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="my-4 ml-5 list-disc space-y-2 leading-7 text-white/70 marker:text-white/30">{children}</ul>
}

export function Callout({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warning" }) {
  return (
    <div
      className={cn(
        "my-6 rounded-[2px] border-l-2 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/70",
        tone === "info" ? "border-brand" : "border-[#e5a13a]"
      )}
    >
      {children}
    </div>
  )
}
