"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { nav } from "@/lib/docs"

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-8">
      {nav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-2 text-xs font-medium tracking-wider text-white/40 uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-[2px] px-2 py-1.5 text-sm text-white/60 outline-none transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]",
                      active && "bg-white/[0.06] text-white"
                    )}
                  >
                    {active && (
                      <span aria-hidden className="mr-2 size-1.5 rounded-full bg-brand" />
                    )}
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
