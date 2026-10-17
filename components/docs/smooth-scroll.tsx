"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

// Smooth scrolling (Lenis) for the page and for the side menu, kept barely noticeable (Davi, 17 Oct): lerp 0.3
// follows the wheel almost 1:1, just without the stepped jumps. Content is static:
// no entrance animations. Off with prefers-reduced-motion.

export function SmoothScroll() {
  const pathname = usePathname()
  const pageRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const page = new Lenis({
      autoRaf: true,
      lerp: 0.3,
      anchors: { offset: -80 },
      allowNestedScroll: true,
      // Menus, popovers, modals and the side menu (it has its own instance) keep their own scrolling.
      prevent: (node) => !!node.closest("[data-lenis-prevent], [role=dialog], [role=listbox], [data-radix-popper-content-wrapper]"),
      // Sideways scroll belongs to the browser: Lenis only drives the vertical page scroll. When the wheel is horizontal
      // (trackpad swipe, mouse tilt wheel) or Shift is held, and a card under the pointer scrolls sideways (preview
      // cards, state matrices, tables), skip Lenis so the event isn't cancelled and the card scrolls natively.
      virtualScroll: ({ deltaX, deltaY, event }) => {
        if (!event.type.includes("wheel")) return true
        if (!event.shiftKey && Math.abs(deltaX) < Math.abs(deltaY)) return true
        return !event.composedPath().some((n) => n instanceof HTMLElement && n.scrollWidth > n.clientWidth + 1 && /^(auto|scroll|overlay)$/.test(getComputedStyle(n).overflowX))
      },
    })
    pageRef.current = page

    const aside = document.querySelector<HTMLElement>("[data-docs-aside]")
    const menu =
      aside?.firstElementChild instanceof HTMLElement
        ? new Lenis({ wrapper: aside, content: aside.firstElementChild, autoRaf: true, lerp: 0.3 })
        : null

    // Radix locks the page with data-scroll-locked on <body>; pause Lenis while it's there.
    const lock = new MutationObserver(() => (document.body.hasAttribute("data-scroll-locked") ? page.stop() : page.start()))
    lock.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] })
    return () => {
      lock.disconnect()
      page.destroy()
      menu?.destroy()
      pageRef.current = null
    }
  }, [])

  React.useEffect(() => {
    if (!window.location.hash) pageRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
