"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChartCard, ChartHeader, ChartStatus, type ChartHeaderProps, type ChartStatusContent } from "@/registry/iq/ui/chart"

// Figma: IQ Capital CRM Design System → Chart / Ring → Meter (2263:4560), _Chart / Meter (2275:4639),
// _Chart / Meter Item (2261:4704): Tone Positive | Warning | Negative × Status Default | Empty.
// The track's stripes are a Figma WebGPU shader (Stripe pattern: 1px, 42°, density 13.5, 10% white); drawn here as an SVG pattern.

type RingTone = "positive" | "warning" | "negative"

type RingItem = {
  label: React.ReactNode
  /** 0–100. */
  value: number
  /** What's written in the ring. Defaults to the value with a % sign. */
  display?: React.ReactNode
  tone?: RingTone
}

const SIZE = 140
const THICKNESS = 9.8
const GAP = 3
const RADIUS = SIZE / 2 - THICKNESS / 2 // 65.1, the middle of the band
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const STRIPE_PERIOD = 100 / 13.5 // Figma shader density 13.5 → one stripe every ~7.4px

const toneColor: Record<RingTone, string> = {
  positive: "var(--chart-ring-positive)",
  warning: "var(--chart-ring-warning)",
  negative: "var(--chart-ring-negative)",
}

type RingChartItemProps = Omit<React.ComponentProps<"div">, "children"> &
  Partial<RingItem> & {
    /** Track only: no value, no label (Figma Status=Empty). */
    empty?: boolean
  }

/** _Chart / Meter Item: a 140px ring with the value in the middle and a label below. */
function RingChartItem({ label, value = 0, display, tone = "positive", empty = false, className, ...props }: RingChartItemProps) {
  const patternId = React.useId()
  const clamped = Math.min(100, Math.max(0, value))
  const length = (clamped / 100) * CIRCUMFERENCE
  // The value arc carries a 3px outline in the card color, which cuts a gap where it meets the track.
  const outline = Math.min(CIRCUMFERENCE, length + GAP * 2)
  const text = display ?? `${clamped}%`

  return (
    <div
      data-slot="ring-chart-item"
      data-tone={tone}
      role={empty ? undefined : "meter"}
      aria-valuemin={empty ? undefined : 0}
      aria-valuemax={empty ? undefined : 100}
      aria-valuenow={empty ? undefined : clamped}
      aria-valuetext={empty ? undefined : typeof text === "string" ? text : `${clamped}%`}
      aria-label={empty ? undefined : typeof label === "string" ? label : undefined}
      aria-hidden={empty || undefined}
      className={cn("flex w-(--chart-ring-size) shrink-0 flex-col items-center gap-4", className)}
      {...props}
    >
      <div className="relative flex size-(--chart-ring-size) items-center justify-center">
        <svg aria-hidden="true" viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full -rotate-90">
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={STRIPE_PERIOD}
              height={STRIPE_PERIOD}
              patternTransform="rotate(-48)"
            >
              <rect width={STRIPE_PERIOD} height="1" style={{ fill: "var(--chart-ring-stripe)" }} />
            </pattern>
          </defs>
          {/* Track: white 5% + stripes */}
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={THICKNESS} style={{ stroke: "var(--chart-ring-track)" }} />
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={THICKNESS} stroke={`url(#${patternId})`} />
          {!empty && clamped > 0 && (
            <>
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={THICKNESS + GAP * 2}
                strokeDasharray={`${outline} ${CIRCUMFERENCE - outline}`}
                strokeDashoffset={outline < CIRCUMFERENCE ? GAP : 0}
                style={{ stroke: "var(--surface-raised)" }}
              />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={THICKNESS}
                strokeDasharray={`${length} ${CIRCUMFERENCE}`}
                style={{ stroke: toneColor[tone] }}
              />
            </>
          )}
        </svg>
        {!empty && (
          <span className="relative text-2xl leading-[normal] font-medium text-(color:--chart-ring-value) tabular-nums">{text}</span>
        )}
      </div>
      {!empty && label && (
        <p className="w-full text-center text-base leading-[normal] font-medium text-(color:--chart-ring-label)">{label}</p>
      )}
    </div>
  )
}

type RingChartProps = Omit<React.ComponentProps<"section">, "title"> &
  Omit<ChartHeaderProps, "titleId" | "compact"> & {
    items: RingItem[]
    status?: "ready" | "empty" | "error"
    emptyState?: ChartStatusContent
    errorState?: ChartStatusContent
  }

/** Figma "Meter": the chart header over a row of rings. */
function RingChart({
  title,
  info,
  value,
  delta,
  deltaTone,
  timestamp,
  ranges,
  range,
  defaultRange,
  onRangeChange,
  items,
  status = "ready",
  emptyState,
  errorState,
  className,
  ...props
}: RingChartProps) {
  const titleId = React.useId()
  return (
    <ChartCard data-slot="ring-chart" aria-labelledby={titleId} className={className} {...props}>
      <ChartHeader
        titleId={titleId}
        title={title}
        info={info}
        value={value}
        delta={delta}
        deltaTone={deltaTone}
        timestamp={timestamp}
        ranges={ranges}
        range={range}
        defaultRange={defaultRange}
        onRangeChange={onRangeChange}
      />
      {status === "ready" ? (
        <div className="flex flex-1 items-center justify-center px-(--chart-padding) py-15">
          <div className="flex flex-wrap items-start justify-center gap-4">
            {items.map((item, i) => (
              <RingChartItem key={i} {...item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 px-(--chart-padding) pb-(--chart-padding)">
          <ChartStatus status={status} content={status === "error" ? errorState : emptyState} height={294} />
        </div>
      )}
    </ChartCard>
  )
}

export { RingChart, RingChartItem }
export type { RingChartProps, RingChartItemProps, RingItem, RingTone }
