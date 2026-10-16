import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { FIGMA_FILE, PROTOTYPE_URL } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { Toaster } from "@/registry/iq/ui/toast"
import { PageGrid } from "@/registry/iq/ui/page-grid"
import { MobileNav } from "@/components/docs/mobile-nav"
import { SidebarNav } from "@/components/docs/sidebar"
import { IqLogo, SidebarToggle, ThemeSwitch } from "@/components/docs/docs-chrome"
import { SmoothScroll } from "@/components/docs/smooth-scroll"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-grid bg-canvas/90 backdrop-blur">
        <div className="flex h-12 items-center gap-3 px-4 lg:px-6">
          <MobileNav />
          <SidebarToggle />
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-[2px] outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
          >
            <IqLogo className="size-8 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap text-white">
              CRM Design System
            </span>
          </Link>
          <span className="hidden rounded-full border border-grid px-2 py-0.5 font-mono text-[11px] text-white/50 sm:inline">
            v0.1
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="secondary" size="sm">
              <a href={PROTOTYPE_URL} target="_blank" rel="noreferrer">
                Prototype
                <Launch />
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href={FIGMA_FILE} target="_blank" rel="noreferrer">
                Figma
                <Launch />
              </a>
            </Button>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      {/* Menu pinned to the left edge; the middle follows the Page Grid, Reduced width (1120 centered). */}
      <div className="flex w-full flex-1">
        <aside data-docs-aside data-lenis-prevent className="sticky top-12 hidden h-[calc(100vh-3rem)] w-60 shrink-0 overflow-y-auto border-r border-grid px-4 py-8 lg:block">
          <SidebarNav />
        </aside>
        <div className="flex min-w-0 flex-1 justify-center">
          <PageGrid width="reduced" contentClassName="min-w-0">
            <div className="min-w-0">{children}</div>
          </PageGrid>
        </div>
      </div>
      <Toaster />
      <SmoothScroll />
    </div>
  )
}
