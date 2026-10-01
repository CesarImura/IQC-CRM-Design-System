import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { FIGMA_FILE } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { Toaster } from "@/registry/iq/ui/toast"
import { MobileNav } from "@/components/docs/mobile-nav"
import { SidebarNav } from "@/components/docs/sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-grid bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 lg:px-6">
          <MobileNav />
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-[2px] outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
          >
            <span aria-hidden className="grid size-6 place-items-center rounded-[2px] bg-brand text-[11px] font-bold text-black">
              IQ
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-white">
              CRM Design System
            </span>
          </Link>
          <span className="hidden rounded-full border border-grid px-2 py-0.5 font-mono text-[11px] text-white/50 sm:inline">
            v0.1
          </span>
          <div className="ml-auto">
            <Button asChild variant="ghost" size="sm">
              <a href={FIGMA_FILE} target="_blank" rel="noreferrer">
                Figma
                <Launch />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-grid px-4 py-8 lg:block">
          <SidebarNav />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
