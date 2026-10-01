"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { Close, Menu } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { SidebarNav } from "./sidebar"

// Mobile docs menu: a drawer from the left (Radix Dialog, portalled so the header's backdrop blur can't clip it).
// Focus is trapped, Esc / overlay tap closes, the page behind doesn't scroll, and picking a page closes it.
export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const listRef = React.useRef<HTMLDivElement>(null)

  // Close if the route changes some other way (back button, link in content).
  const [lastPath, setLastPath] = React.useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
          <Menu />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=closed]:animate-[overlay-out_150ms_ease-in_forwards] data-[state=open]:animate-[overlay-in_200ms_ease-out] motion-reduce:animate-none lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            // Start at the current page instead of the first link.
            e.preventDefault()
            const current = listRef.current?.querySelector<HTMLElement>('[aria-current="page"]')
            current?.scrollIntoView({ block: "center" })
            current?.focus()
          }}
          className="fixed inset-y-0 left-0 z-50 flex w-[min(320px,85vw)] flex-col border-r border-grid bg-canvas shadow-2xl outline-none data-[state=closed]:animate-[drawer-out_180ms_ease-in_forwards] data-[state=open]:animate-[drawer-in_240ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none lg:hidden"
        >
          <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-grid px-4">
            <Dialog.Title asChild>
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-[2px] outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]">
                <span aria-hidden className="grid size-6 place-items-center rounded-[2px] bg-brand text-[11px] font-bold text-black">
                  IQ
                </span>
                <span className="text-sm font-medium text-white">CRM Design System</span>
              </Link>
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <Close />
              </Button>
            </Dialog.Close>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
            <SidebarNav touch onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
