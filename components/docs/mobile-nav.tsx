"use client"

import { useState } from "react"
import { Close, Menu } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { SidebarNav } from "./sidebar"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Close /> : <Menu />}
      </Button>
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-grid bg-canvas px-4 py-6"
        >
          <SidebarNav onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
