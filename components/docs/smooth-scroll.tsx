"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

// Scroll feel borrowed from getartcraft.com/apps: Lenis smooth scrolling, and each block of the page
// rises 28px out of an 8px blur as it enters the viewport. H2s draw a hairline from the left.
// Off with prefers-reduced-motion. Styles live in globals.css (.ds-reveal).

const REVEAL = "[data-docs-content] > *"

export function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -80 },
      allowNestedScroll: true,
      // Menus, popovers, modals and the sidebar keep native scrolling.
      prevent: (node) => !!node.closest("[data-lenis-prevent], [role=dialog], [role=listbox], [data-radix-popper-content-wrapper]"),
    })
    lenisRef.current = lenis
    // Radix locks the page with data-scroll-locked on <body>; pause Lenis while it's there.
    const lock = new MutationObserver(() => (document.body.hasAttribute("data-scroll-locked") ? lenis.stop() : lenis.start()))
    lock.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] })
    return () => {
      lock.disconnect()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true })
    const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL))
    let order = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          // Blocks that enter together cascade 70ms apart.
          el.style.transitionDelay = `${Math.min(order++, 6) * 70}ms`
          el.classList.add("is-in")
          io.unobserve(el)
        }
        order = 0
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    for (const el of items) {
      el.classList.add("ds-reveal")
      io.observe(el)
    }
    return () => {
      io.disconnect()
      for (const el of items) el.classList.remove("ds-reveal", "is-in")
    }
  }, [pathname])

  return null
}
