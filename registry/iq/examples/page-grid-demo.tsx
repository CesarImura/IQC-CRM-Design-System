"use client"

import * as React from "react"

import { PageGrid, type PageGridWidth } from "@/registry/iq/ui/page-grid"
import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"

const widths: { value: PageGridWidth; label: string; use: string }[] = [
  { value: "full", label: "Full", use: "Only full-width tables" },
  { value: "default", label: "Default", use: "Default use case" },
  { value: "reduced", label: "Reduced", use: "No data analytics" },
  { value: "narrow", label: "Narrow", use: "Settings / sensitive" },
]
const screens = [1920, 1440, 1280]
const SHELL_TOP = 48
const SHELL_NAV = 304

function Block({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-[2px] border border-dashed border-white/15 bg-white/[0.04] text-[28px] text-white/40 ${className ?? ""}`}>
      {children}
    </div>
  )
}

// A real 1920×1080 (or smaller) screen, scaled to fit: placeholder top bar and nav, the Page Grid in the column.
export default function PageGridDemo() {
  const [width, setWidth] = React.useState<PageGridWidth>("default")
  const [screen, setScreen] = React.useState(1920)
  const boxRef = React.useRef<HTMLDivElement>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.4)
  const [measure, setMeasure] = React.useState("")
  const height = 1080

  React.useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / screen)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [screen])

  React.useLayoutEffect(() => {
    const slot = gridRef.current?.querySelector<HTMLElement>("[data-slot=page-grid-content]")
    if (slot) setMeasure(`${Math.round(slot.offsetWidth)}px content`)
  }, [width, screen])

  const current = widths.find((w) => w.value === width)!

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={width} onValueChange={(v) => setWidth(v as PageGridWidth)}>
          <TabsPillList aria-label="Width">
            {widths.map((w) => (
              <TabsPillTrigger key={w.value} value={w.value}>
                {w.label}
              </TabsPillTrigger>
            ))}
          </TabsPillList>
        </Tabs>
        <Tabs value={String(screen)} onValueChange={(v) => setScreen(Number(v))}>
          <TabsPillList aria-label="Screen width">
            {screens.map((s) => (
              <TabsPillTrigger key={s} value={String(s)}>
                {s}
              </TabsPillTrigger>
            ))}
          </TabsPillList>
        </Tabs>
      </div>
      <p className="text-sm text-white/60">
        <span className="text-white">{current.label}</span> · {current.use} · {measure} on a {screen}px screen
      </p>
      <div ref={boxRef} className="w-full overflow-hidden rounded-[2px] border border-grid" style={{ height: height * scale }}>
        <div className="origin-top-left bg-(--surface-canvas)" style={{ width: screen, height, transform: `scale(${scale})` }}>
          <div className="border-b border-(--border-panel) bg-(--surface-raised)" style={{ height: SHELL_TOP }} />
          <div className="flex" style={{ height: height - SHELL_TOP }}>
            <div className="flex shrink-0 border-r border-(--border-panel)" style={{ width: SHELL_NAV }}>
              <div className="w-12 border-r border-(--border-panel) bg-(--surface-raised)" />
              <div className="flex-1 bg-(--surface-raised)/60" />
            </div>
            <div ref={gridRef} className="flex min-w-0 flex-1 justify-center overflow-hidden outline outline-1 -outline-offset-1 outline-(--focus-ring)/25">
              <PageGrid width={width} className="h-full">
                {width === "full" && <Block className="h-20 shrink-0">Toolbar</Block>}
                <Block className="flex-1">Block</Block>
                <Block className="flex-1">Block</Block>
              </PageGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
