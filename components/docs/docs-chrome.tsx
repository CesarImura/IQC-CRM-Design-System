"use client"

import * as React from "react"

// Docs chrome controls: IQ logo, menu toggle (hides the side menu on desktop) and the light / dark switch.
// Light mode only changes the docs chrome; component previews keep the dark IQ look (.ds-keep-dark, app/docs-theme.css).
// The choice is applied before paint by DOCS_PREFS_SCRIPT (lib/docs-prefs.ts) in app/layout.tsx.

import { SIDEBAR_KEY, THEME_KEY } from "@/lib/docs-prefs"

const icon = "size-4 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.4]"

/** IQ Capital logo, from the Top Menu in Figma (Navigation → Logo). */
export function IqLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <rect width="40" height="40" rx="2" fill="var(--primitive-accent)" fillOpacity="0.1" />
      <path d="M30.3282 25.2731C27.407 25.2731 25.0297 22.9073 25.0297 20.0003H20.2798C20.2798 25.5142 24.7874 30 30.3282 30V25.2731Z" fill="var(--primitive-accent)" />
      <path d="M19.7194 10C14.1787 10 9.67163 14.4852 9.67163 19.9991C9.67163 25.513 14.1787 29.9989 19.7194 29.9989V25.272C16.7983 25.272 14.4215 22.9068 14.4215 19.9991C14.4215 17.0915 16.7983 14.7269 19.7194 14.7269C22.6406 14.7269 25.018 17.0921 25.018 19.9991H29.7678C29.7678 14.4852 25.2602 10 19.7194 10Z" fill="var(--primitive-accent)" />
    </svg>
  )
}

/** Shows or hides the side menu on desktop (the mobile menu has its own button). */
export function SidebarToggle() {
  const toggle = () => {
    const d = document.documentElement
    const hidden = d.getAttribute("data-docs-sidebar") !== "hidden"
    if (hidden) d.setAttribute("data-docs-sidebar", "hidden")
    else d.removeAttribute("data-docs-sidebar")
    try { localStorage.setItem(SIDEBAR_KEY, hidden ? "hidden" : "open") } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Show or hide the menu"
      title="Menu"
      className="hidden size-8 cursor-pointer place-items-center rounded-[2px] text-white/60 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:shadow-[0_0_0_2px_var(--focus-ring)] lg:grid"
    >
      <svg viewBox="0 0 16 16" aria-hidden className={icon}>
        <rect x="2" y="3" width="12" height="10" rx="1" />
        <path d="M6 3v10" />
      </svg>
    </button>
  )
}

/** Light / dark switch for the docs chrome. */
export function ThemeSwitch() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark")
  React.useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-docs-theme") === "light" ? "light" : "dark")
  }, [])
  const choose = (t: "dark" | "light") => {
    const d = document.documentElement
    if (t === "light") d.setAttribute("data-docs-theme", "light")
    else d.removeAttribute("data-docs-theme")
    try { localStorage.setItem(THEME_KEY, t) } catch {}
    setTheme(t)
  }
  const item = (t: "dark" | "light", label: string, children: React.ReactNode) => (
    <button
      type="button"
      onClick={() => choose(t)}
      aria-label={label}
      aria-pressed={theme === t}
      title={label}
      className="grid h-6 w-8 cursor-pointer place-items-center rounded-[2px] text-white/50 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:shadow-[0_0_0_2px_var(--focus-ring)] aria-pressed:bg-white/[0.14] aria-pressed:text-white"
    >
      {children}
    </button>
  )
  return (
    <div role="group" aria-label="Theme" className="flex gap-1 rounded-[2px] border border-grid p-1">
      {item("dark", "Dark theme",
        <svg viewBox="0 0 16 16" aria-hidden className={icon}><path d="M13.5 9.6A5.6 5.6 0 0 1 6.4 2.5a5.6 5.6 0 1 0 7.1 7.1z" /></svg>)}
      {item("light", "Light theme",
        <svg viewBox="0 0 16 16" aria-hidden className={icon}><circle cx="8" cy="8" r="3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" /></svg>)}
    </div>
  )
}
