"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChartCard, ChartHeader, ChartStatus, type ChartHeaderProps, type ChartStatusContent } from "@/registry/iq/ui/chart"
import { Empty } from "@/registry/iq/ui/empty"

// Figma: IQ Capital CRM Design System → Chart / Donut → Donut Chart (2818:5014). Status Default | Empty | Error × Hover.
// A 221px ring (inner radius 86%) cut into segments with 3px gaps, the highlighted segment glowing in its color; labels
// around the ring, the total in the middle, a legend below. Hover dims the other segments and shows a compact tooltip.

type DonutSegment = { label: string; value: number; color?: string }

const SIZE = 221
const R = SIZE / 2
const INNER = R * 0.86
const GAP = 3

const seriesColor = (s: DonutSegment, i: number) => s.color ?? `var(--chart-series-${(i % 8) + 1})`

// Annular sector from angle a0 to a1 (radians, 0 = 12 o'clock, clockwise).
function sector(a0: number, a1: number) {
  const pt = (r: number, a: number) => [R + r * Math.sin(a), R - r * Math.cos(a)]
  const large = a1 - a0 > Math.PI ? 1 : 0
  if (a1 - a0 >= Math.PI * 2 - 1e-6) {
    // Full ring: two half arcs.
    return `M ${R} ${R - R} A ${R} ${R} 0 1 1 ${R} ${R + R} A ${R} ${R} 0 1 1 ${R} ${R - R} M ${R} ${R - INNER} A ${INNER} ${INNER} 0 1 0 ${R} ${R + INNER} A ${INNER} ${INNER} 0 1 0 ${R} ${R - INNER} Z`
  }
  const [ox0, oy0] = pt(R, a0)
  const [ox1, oy1] = pt(R, a1)
  const [ix1, iy1] = pt(INNER, a1)
  const [ix0, iy0] = pt(INNER, a0)
  return `M ${ox0} ${oy0} A ${R} ${R} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${INNER} ${INNER} 0 ${large} 0 ${ix0} ${iy0} Z`
}

type DonutChartProps = Omit<React.ComponentProps<"section">, "title"> &
  Pick<ChartHeaderProps, "title" | "info"> & {
    segments: DonutSegment[]
    /** Big number in the middle. Defaults to the sum of the values. */
    value?: React.ReactNode
    /** Label under the value. */
    centerLabel?: React.ReactNode
    showCenter?: boolean
    /** Name and share around the ring. */
    showLabels?: boolean
    showLegend?: boolean
    /** Segment drawn with the glow when nothing is hovered. Default 0 (the first). */
    highlight?: number
    formatValue?: (value: number) => string
    status?: "ready" | "empty" | "error"
    emptyState?: ChartStatusContent
    errorState?: ChartStatusContent
  }

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

/** Donut Chart: part-to-whole for a handful of categories. */
function DonutChart({
  title,
  info,
  segments,
  value,
  centerLabel,
  showCenter = true,
  showLabels = true,
  showLegend = true,
  highlight = 0,
  formatValue = (v) => compact.format(v).toLowerCase(),
  status = "ready",
  emptyState,
  errorState,
  className,
  ...props
}: DonutChartProps) {
  const titleId = React.useId()
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [pointer, setPointer] = React.useState<{ x: number; y: number } | null>(null)
  const plotRef = React.useRef<HTMLDivElement>(null)

  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0)
  const ends = segments.map((_, i) => segments.slice(0, i + 1).reduce((sum, s) => sum + Math.max(0, s.value), 0))
  const angle = (v: number) => (total ? (v / total) * Math.PI * 2 : 0)
  const arcs = segments.map((s, i) => ({
    ...s,
    i,
    a0: angle(i === 0 ? 0 : ends[i - 1]),
    a1: angle(ends[i]),
    share: total ? s.value / total : 0,
    color: seriesColor(s, i),
  }))
  const active = hovered ?? highlight

  return (
    <ChartCard data-slot="donut-chart" aria-labelledby={titleId} className={className} {...props}>
      <ChartHeader titleId={titleId} title={title} info={info} compact />

      {status === "error" ? (
        <div className="px-(--chart-padding) pb-(--chart-padding)">
          <ChartStatus status="error" content={errorState} height={349} />
        </div>
      ) : status === "empty" ? (
        <div className="flex h-[336px] items-center justify-center px-(--chart-padding) pb-(--chart-padding)">
          <Empty size="compact" title={emptyState?.title} />
        </div>
      ) : (
        <div
          ref={plotRef}
          className="relative flex h-[336px] items-center justify-center"
          onPointerMove={(e) => {
            const box = plotRef.current?.getBoundingClientRect()
            if (box) setPointer({ x: e.clientX - box.left, y: e.clientY - box.top })
          }}
          onPointerLeave={() => {
            setHovered(null)
            setPointer(null)
          }}
        >
          <div className="relative" style={{ width: SIZE, height: SIZE }}>
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="overflow-visible" role="img" aria-label={arcs.map((a) => `${a.label} ${Math.round(a.share * 100)}%`).join(", ")}>
              {/* Track */}
              <path d={sector(0, Math.PI * 2)} fillRule="evenodd" style={{ fill: "var(--chart-ring-track)" }} />
              {arcs.map((a) => (
                <g key={a.label} style={{ opacity: hovered !== null && hovered !== a.i ? 0.3 : 1, transition: "opacity 120ms" }}>
                  {/* Figma glow: drop shadow, spread 6, at 16% of the series color. */}
                  {a.i === active && a.a1 > a.a0 && (
                    <path d={sector(a.a0, a.a1)} style={{ fill: "none", stroke: a.color, strokeOpacity: 0.16, strokeWidth: 12, strokeLinejoin: "round" }} />
                  )}
                  <path
                    d={sector(a.a0, a.a1)}
                    fillRule="evenodd"
                    style={{ fill: a.color, stroke: "var(--surface-raised)", strokeWidth: GAP }}
                    onPointerEnter={() => setHovered(a.i)}
                  />
                </g>
              ))}
            </svg>
            {showCenter && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl leading-[1.3] font-medium text-(color:--chart-value) tabular-nums">{value ?? formatValue(total)}</span>
                {centerLabel && <span className="text-base leading-6 font-medium text-(color:--chart-title)">{centerLabel}</span>}
              </div>
            )}
          </div>

          {showLabels &&
            arcs.map((a) => {
              const mid = (a.a0 + a.a1) / 2
              const dist = R + 40
              const x = Math.sin(mid) * dist + Math.sign(Math.sin(mid)) * 14
              const y = -Math.cos(mid) * dist
              return (
                <span
                  key={a.label}
                  aria-hidden="true"
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center text-sm leading-[18px] whitespace-nowrap text-white"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, opacity: a.i === active ? 0.9 : 0.5 }}
                >
                  {a.label}
                  <br />[{Math.round(a.share * 100)}%]
                </span>
              )
            })}

          {hovered !== null && pointer && (
            // _Chart / Tooltip, Size=Compact: one row, 16px right of the pointer.
            <div
              className="pointer-events-none absolute z-10 flex items-center gap-2 rounded-(--chart-tooltip-radius) bg-(--chart-tooltip-bg) px-3 py-2 text-sm leading-[21px] whitespace-nowrap"
              style={{ left: pointer.x + 16, top: pointer.y - 18 }}
            >
              <span aria-hidden="true" className="h-[18px] w-1 rounded-[2px]" style={{ background: arcs[hovered].color }} />
              <span className="text-(color:--chart-tooltip-label)">{arcs[hovered].label}</span>
              <span className="font-medium text-(color:--chart-tooltip-value)">{formatValue(arcs[hovered].value)}</span>
            </div>
          )}
        </div>
      )}

      {showLegend && status !== "error" && (
        <ul className={cn("flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-(--chart-padding) pb-(--chart-padding)")}>
          {segments.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2 text-sm leading-[21px] text-(color:--chart-legend-label)">
              <span aria-hidden="true" className="size-3.5 shrink-0 rounded-[2px]" style={{ background: seriesColor(s, i) }} />
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  )
}

export { DonutChart }
export type { DonutChartProps, DonutSegment }
