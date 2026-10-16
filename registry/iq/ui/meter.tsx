"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChartCard } from "@/registry/iq/ui/chart"

// Figma: IQ Capital CRM Design System → page "Meter" (3149:14), Card · Daily drawdown · Ticks (3391:185).
// The gauge is 56 radial ticks over a 200° arc (190px wide, 22.8px long, 3px wide). Ticks up to the value take
// the tone color; the rest are the track. They light up one after another when the value changes.

type MeterTone = "positive" | "warning" | "negative"

const toneColor: Record<MeterTone, string> = {
  positive: "var(--chart-meter-positive)",
  warning: "var(--chart-meter-warning)",
  negative: "var(--chart-meter-negative)",
}

const SIZE = 190
const OUTER = SIZE / 2 // 95
const INNER = OUTER * 0.76 // 72.2
const SWEEP = 200
const HEIGHT = 114 // the arc dips 10° below the centre on each side
const TICK = 3 // chart-meter-tick-width (SVG geometry, so the number lives here)

type MeterGaugeProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** 0–100. */
  value: number
  tone?: MeterTone
  /** Number of ticks. 56 by default. */
  ticks?: number
  /** Written in the middle of the arc. */
  children?: React.ReactNode
}

/** Meter gauge: a 200° arc of radial ticks with the value written in the middle. */
function MeterGauge({ value, tone = "positive", ticks = 56, children, className, ...props }: MeterGaugeProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const filled = Math.round((clamped / 100) * ticks)
  const length = OUTER - INNER

  return (
    <div
      data-slot="meter-gauge"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("relative mx-auto", className)}
      style={{ width: SIZE, height: HEIGHT }}
      {...props}
    >
      <svg viewBox={`0 0 ${SIZE} ${HEIGHT}`} width={SIZE} height={HEIGHT} aria-hidden className="block overflow-visible">
        {Array.from({ length: ticks }, (_, i) => {
          const deg = -SWEEP / 2 + (SWEEP * i) / (ticks - 1)
          const on = i < filled
          return (
            <rect
              key={i}
              x={OUTER - TICK / 2}
              y={0}
              width={TICK}
              height={length}
              transform={`rotate(${deg} ${OUTER} ${OUTER})`}
              className="transition-[fill] duration-200 ease-out motion-reduce:transition-none"
              style={{ fill: on ? toneColor[tone] : "var(--chart-meter-track)", transitionDelay: `${(on ? i : filled) * 12}ms` }}
            />
          )
        })}
      </svg>
      {children != null && (
        <div className="absolute inset-x-0 top-[70px] text-center text-[26px] leading-[34px] font-medium text-(--chart-meter-value) tabular-nums">
          {children}
        </div>
      )}
    </div>
  )
}

type MeterCardProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  /** Top-right slot, usually a Badge. */
  badge?: React.ReactNode
  /** 0–100. */
  value: number
  tone?: MeterTone
  ticks?: number
  /** What's written in the arc (e.g. "320.00 $"). Defaults to the value with a % sign. */
  display?: React.ReactNode
  /** First line under the arc (e.g. "of 1,000.00 $"). */
  caption?: React.ReactNode
  /** Second, smaller line (e.g. when it resets). */
  meta?: React.ReactNode
}

/** Meter card: title and badge, the gauge, and up to two lines of context below. */
function MeterCard({ title, badge, value, tone, ticks, display, caption, meta, className, ...props }: MeterCardProps) {
  return (
    <ChartCard data-slot="meter" className={cn("p-5", className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-[15px] leading-5 font-medium text-white">{title}</h3>
        {badge}
      </div>
      <MeterGauge value={value} tone={tone} ticks={ticks}>
        {display ?? `${Math.round(value)}%`}
      </MeterGauge>
      {(caption || meta) && (
        <div className="flex flex-col gap-0.5 pt-1.5 text-center">
          {caption && <p className="text-sm text-(--chart-meter-caption)">{caption}</p>}
          {meta && <p className="text-xs text-(--chart-meter-meta)">{meta}</p>}
        </div>
      )}
    </ChartCard>
  )
}

export { MeterCard, MeterGauge }
export type { MeterCardProps, MeterGaugeProps, MeterTone }
