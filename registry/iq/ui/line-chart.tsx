"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type DeltaTone } from "@/registry/iq/ui/badge"
import { ChartCard, ChartHeader, ChartStatus, type ChartStatusContent } from "@/registry/iq/ui/chart"

// Figma: IQ Capital CRM Design System → Chart / Line → LineChart (2577:34859).
// Type (Single | Comparison | Multi) follows the number of series. Size sm | md | lg. State Default | Hover | Empty | Error.
// Parts from _Chart Components: Header, Grid, Axis / X Track, Gridline, Point, Tooltip, Tooltip Item, Legend.

type LineChartSize = "sm" | "md" | "lg"

type LineSeries = {
  label: string
  data: number[]
  /** Defaults to chart-series-1…8 by position. */
  color?: string
}

type LineChartProps = Omit<React.ComponentProps<"section">, "title"> & {
  size?: LineChartSize
  title: React.ReactNode
  /** Adds the info icon after the title. A string also becomes its tooltip and accessible name. */
  info?: React.ReactNode
  /** Formatted headline value, e.g. "2,300". */
  value?: React.ReactNode
  /** Formatted change, e.g. "+18%". */
  delta?: React.ReactNode
  deltaTone?: DeltaTone
  /** md and lg only. */
  timestamp?: React.ReactNode
  /** md and lg only: the range tabs, e.g. ["24h", "30d", "3m", "1y"]. */
  ranges?: string[]
  range?: string
  defaultRange?: string
  onRangeChange?: (range: string) => void
  /** One label per data point, shown in the tooltip (e.g. "16 Sep 2026"). */
  categories: string[]
  /** Axis labels, evenly spaced. Defaults to first/last on sm and up to 10 categories on md/lg. */
  xLabels?: string[]
  series: LineSeries[]
  /** Gridline values. Defaults to 4 (sm) or 6 (md, lg) rounded steps from 0. */
  yTicks?: number[]
  formatY?: (value: number) => string
  formatValue?: (value: number) => string
  status?: "ready" | "empty" | "error"
  emptyState?: ChartStatusContent
  errorState?: ChartStatusContent
  /** Force the hovered point (documentation, screenshots). null = no hover. */
  activeIndex?: number | null
  /** Plot height in px, including the 8px gap above the axis. */
  plotHeight?: number
}

const sizeConfig: Record<LineChartSize, { plotHeight: number; ticks: number }> = {
  sm: { plotHeight: 147, ticks: 4 },
  md: { plotHeight: 141, ticks: 6 },
  lg: { plotHeight: 267, ticks: 6 },
}

// Layout constants from Figma.
const Y_LABEL_WIDTH = 29
const Y_LABEL_GAP = 8
const PLOT_LEFT = Y_LABEL_WIDTH + Y_LABEL_GAP // 37
const ROW = 21 // 14px label × 1.5 line height
const GRID_BOTTOM_GAP = 8
const TOOLTIP_OFFSET = 16

const defaultNumber = new Intl.NumberFormat("en-US")
const compactNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

function niceStep(raw: number) {
  if (raw <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const residual = raw / magnitude
  const nice = [1, 2, 2.5, 5, 10].find((n) => residual <= n) ?? 10
  return nice * magnitude
}

function defaultTicks(series: LineSeries[], count: number) {
  const max = Math.max(0, ...series.flatMap((s) => s.data))
  const step = niceStep(max / (count - 1))
  return Array.from({ length: count }, (_, i) => i * step)
}

function seriesColor(series: LineSeries, index: number) {
  return series.color ?? `var(--chart-series-${(index % 8) + 1})`
}

/* -------------------------------------------------------------------------------------------------
 * Parts
 * -----------------------------------------------------------------------------------------------*/

// _Chart / Tooltip Item: 4px tick, label at 32%, value at 80%.
function ChartTooltipItem({ color, label, value }: { color: string; label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-base leading-[normal] whitespace-nowrap">
      <span aria-hidden="true" className="h-[21px] w-1 shrink-0 rounded-[2px]" style={{ background: color }} />
      <span className="text-(color:--chart-tooltip-label)">{label}</span>
      <span className="font-medium text-(color:--chart-tooltip-value)">{value}</span>
    </div>
  )
}

// _Chart / Legend + Legend Item.
function ChartLegend({ series }: { series: LineSeries[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 px-(--chart-padding) pb-(--chart-padding)">
      {series.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2 text-sm leading-[normal] text-(color:--chart-legend-label)">
          <span aria-hidden="true" className="size-3.5 shrink-0 rounded-[2px]" style={{ background: seriesColor(s, i) }} />
          {s.label}
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Line Chart
 * -----------------------------------------------------------------------------------------------*/

function LineChart({
  size = "md",
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
  categories,
  xLabels,
  series,
  yTicks,
  formatY = (v) => compactNumber.format(v),
  formatValue = (v) => defaultNumber.format(v),
  status = "ready",
  emptyState,
  errorState,
  activeIndex,
  plotHeight,
  className,
  ...props
}: LineChartProps) {
  const titleId = React.useId()
  const gradientId = React.useId()
  const config = sizeConfig[size]
  const gridHeight = plotHeight ?? config.plotHeight
  const small = size === "sm"

  const plotRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = plotRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [status])

  const [hover, setHover] = React.useState<number | null>(null)
  const active = activeIndex !== undefined ? activeIndex : hover

  // Measure the tooltip so it can flip to the left of the crosshair when it would overflow.
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [tooltipWidth, setTooltipWidth] = React.useState(0)
  React.useLayoutEffect(() => {
    if (tooltipRef.current) setTooltipWidth(tooltipRef.current.offsetWidth)
  }, [active, width])

  const ticks = yTicks ?? defaultTicks(series, config.ticks)
  const min = Math.min(...ticks)
  const max = Math.max(...ticks)
  const top = ROW / 2
  const bottom = gridHeight - GRID_BOTTOM_GAP - ROW / 2
  const count = Math.max(1, ...series.map((s) => s.data.length))
  const plotWidth = Math.max(0, width - PLOT_LEFT)
  const x = (i: number) => (count === 1 ? plotWidth / 2 : (i / (count - 1)) * plotWidth)
  const y = (v: number) => (max === min ? bottom : bottom - ((v - min) / (max - min)) * (bottom - top))
  const tickY = (v: number) => y(v)

  const axisLabels =
    xLabels ??
    (small
      ? [categories[0], categories[categories.length - 1]]
      : categories.length <= 10
        ? categories
        : Array.from({ length: 10 }, (_, i) => categories[Math.round((i / 9) * (categories.length - 1))]))

  const paths = series.map((s) => s.data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(""))
  const first = series[0]
  const areaTop = first ? Math.min(...first.data.map(y)) : top
  const areaPath = first && first.data.length > 1 ? `${paths[0]}L${x(first.data.length - 1)},${bottom}L${x(0)},${bottom}Z` : ""

  function indexAt(clientX: number) {
    const rect = plotRef.current?.getBoundingClientRect()
    if (!rect || plotWidth === 0) return null
    const px = clientX - rect.left - PLOT_LEFT
    return Math.min(count - 1, Math.max(0, Math.round((px / plotWidth) * (count - 1))))
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End", "Escape"]
    if (!keys.includes(event.key)) return
    event.preventDefault()
    setHover((current) => {
      if (event.key === "Escape") return null
      if (event.key === "Home") return 0
      if (event.key === "End") return count - 1
      if (event.key === "ArrowRight") return current === null ? 0 : Math.min(count - 1, current + 1)
      return current === null ? count - 1 : Math.max(0, current - 1)
    })
  }

  const activeX = active !== null && active !== undefined ? PLOT_LEFT + x(active) : 0
  const flip = active !== null && active !== undefined && activeX + TOOLTIP_OFFSET + tooltipWidth > width
  const anchorY = active !== null && active !== undefined && first ? y(first.data[active]) : top
  const below = anchorY < gridHeight / 2
  const announcement =
    active !== null && active !== undefined
      ? `${categories[active]}: ${series.map((s) => `${s.label} ${formatValue(s.data[active])}`).join(", ")}`
      : ""

  return (
    <ChartCard data-slot="line-chart" data-size={size} aria-labelledby={titleId} className={className} {...props}>
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
        compact={small}
      />

      <div className="px-(--chart-padding) pb-(--chart-padding)">
        {status !== "ready" ? (
          <ChartStatus status={status} content={status === "error" ? errorState : emptyState} height={gridHeight + 29} />
        ) : (
          <div
            ref={plotRef}
            role="group"
            aria-roledescription="chart"
            aria-label={`${typeof title === "string" ? title : "Line chart"}: ${series.map((s) => s.label).join(", ")}. Use the arrow keys to read values.`}
            tabIndex={0}
            onPointerMove={(e) => setHover(indexAt(e.clientX))}
            onPointerLeave={() => setHover(null)}
            onKeyDown={onKeyDown}
            onBlur={() => setHover(null)}
            className="relative rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-4 focus-visible:ring-offset-(--surface-raised)"
          >
            {/* _Chart / Grid: Y labels + dashed gridlines */}
            <div className="relative" style={{ height: gridHeight }}>
              {ticks.map((t) => (
                <span
                  key={t}
                  aria-hidden="true"
                  className="absolute left-0 -translate-y-1/2 text-right text-sm leading-normal text-(color:--chart-axis-label) tabular-nums"
                  style={{ top: tickY(t), width: Y_LABEL_WIDTH }}
                >
                  {formatY(t)}
                </span>
              ))}
              {width > 0 && (
                <svg
                  aria-hidden="true"
                  className="absolute top-0 overflow-visible"
                  style={{ left: PLOT_LEFT }}
                  width={plotWidth}
                  height={gridHeight}
                >
                  <defs>
                    <linearGradient id={gradientId} x1="0" x2="0" y1={areaTop} y2={bottom} gradientUnits="userSpaceOnUse">
                      <stop offset="0" style={{ stopColor: first ? seriesColor(first, 0) : "transparent" }} />
                      <stop offset="1" style={{ stopColor: first ? seriesColor(first, 0) : "transparent", stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  {ticks.map((t) => (
                    <line
                      key={t}
                      x1={0}
                      x2={plotWidth}
                      y1={Math.round(tickY(t)) + 0.5}
                      y2={Math.round(tickY(t)) + 0.5}
                      strokeDasharray="2 2"
                      style={{ stroke: "var(--chart-gridline)" }}
                    />
                  ))}
                  {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} style={{ opacity: "var(--chart-area-opacity)" }} />}
                  {paths.map((d, i) => (
                    <path
                      key={series[i].label}
                      d={d}
                      fill="none"
                      style={{ stroke: seriesColor(series[i], i), strokeWidth: "var(--chart-line-width)" }}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  ))}
                  {active !== null && active !== undefined && (
                    <g>
                      <line
                        x1={Math.round(x(active)) + 0.5}
                        x2={Math.round(x(active)) + 0.5}
                        y1={top}
                        y2={gridHeight}
                        style={{ stroke: "var(--chart-crosshair)" }}
                      />
                      {series.map((s, i) => (
                        <circle
                          key={s.label}
                          cx={x(active)}
                          cy={y(s.data[active])}
                          r={5.5}
                          strokeWidth={2}
                          style={{ fill: "var(--chart-point-fill)", stroke: seriesColor(s, i) }}
                        />
                      ))}
                    </g>
                  )}
                </svg>
              )}
            </div>

            {/* _Chart / Axis / X Track: baseline, ticks and evenly spaced labels */}
            <div className="relative flex items-start justify-between" style={{ paddingLeft: PLOT_LEFT }}>
              <span aria-hidden="true" className="absolute top-0 right-0 h-px bg-(--chart-axis-line)" style={{ left: PLOT_LEFT }} />
              {axisLabels.map((label, i) => (
                <span key={`${label}-${i}`} aria-hidden="true" className="flex flex-col items-center">
                  <span className="h-2 w-px bg-(--chart-axis-tick)" />
                  <span className="text-sm leading-normal whitespace-nowrap text-(color:--chart-axis-label)">{label}</span>
                </span>
              ))}
            </div>

            {/* _Chart / Tooltip */}
            {active !== null && active !== undefined && width > 0 && (
              <>
                <div
                  ref={tooltipRef}
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute z-10 flex flex-col gap-1.5 rounded-(--chart-tooltip-radius) bg-(--chart-tooltip-bg)",
                    small ? "px-3 py-2" : "min-w-[195px] px-4 py-3.5"
                  )}
                  style={{
                    left: activeX,
                    top: small ? top : below ? anchorY + 14 : anchorY - 14,
                    transform: `translate(${flip ? `calc(-100% - ${TOOLTIP_OFFSET}px)` : `${TOOLTIP_OFFSET}px`}, ${!small && !below ? "-100%" : "0"})`,
                  }}
                >
                  {!small && (
                    <p className="text-base leading-[normal] whitespace-nowrap text-(color:--chart-tooltip-date)">{categories[active]}</p>
                  )}
                  {series.map((s, i) => (
                    <ChartTooltipItem key={s.label} color={seriesColor(s, i)} label={s.label} value={formatValue(s.data[active])} />
                  ))}
                </div>
                {small && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-(--chart-tooltip-radius) bg-(--chart-tooltip-bg) px-2 py-1 text-sm leading-[normal] whitespace-nowrap text-(color:--chart-tooltip-date)"
                    style={{ left: activeX, top: gridHeight + 7 }}
                  >
                    {categories[active]}
                  </div>
                )}
              </>
            )}
            <span className="sr-only" aria-live="polite">
              {announcement}
            </span>
          </div>
        )}
      </div>

      {series.length > 1 && status === "ready" && <ChartLegend series={series} />}
    </ChartCard>
  )
}

export { LineChart }
export type { LineChartProps, LineSeries, LineChartSize }
