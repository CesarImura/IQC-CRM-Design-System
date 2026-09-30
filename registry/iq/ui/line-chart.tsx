"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DeltaBadge, type DeltaTone } from "@/registry/iq/ui/badge"
import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"

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

type ChartStatusContent = { title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode }

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

// Figma "Information" icon (IBM Carbon), recolored with currentColor.
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M8.5 11V7H6.5V8H7.5V11H6V12H10V11H8.5Z" />
      <path d="M8 4C7.85166 4 7.70666 4.04398 7.58332 4.12639C7.45998 4.20881 7.36385 4.32594 7.30709 4.46298C7.25032 4.60003 7.23547 4.75083 7.26441 4.89631C7.29335 5.0418 7.36478 5.17544 7.46967 5.28033C7.57456 5.38522 7.70819 5.45665 7.85368 5.48559C7.99916 5.51452 8.14996 5.49967 8.28701 5.44291C8.42405 5.38614 8.54119 5.29001 8.6236 5.16667C8.70601 5.04334 8.75 4.89833 8.75 4.75C8.75 4.55108 8.67098 4.36032 8.53033 4.21967C8.38967 4.07901 8.19891 4 8 4Z" />
      <path d="M8 15C6.61553 15 5.26215 14.5895 4.111 13.8203C2.95986 13.0511 2.06265 11.9579 1.53284 10.6788C1.00303 9.3997 0.864403 7.99223 1.1345 6.63436C1.4046 5.2765 2.07128 4.02922 3.05025 3.05025C4.02922 2.07128 5.2765 1.4046 6.63436 1.1345C7.99223 0.864403 9.3997 1.00303 10.6788 1.53284C11.9579 2.06265 13.0511 2.95986 13.8203 4.111C14.5895 5.26215 15 6.61553 15 8C15 9.85651 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85651 15 8 15ZM8 2C6.81331 2 5.65327 2.35189 4.66658 3.01118C3.67988 3.67047 2.91085 4.60754 2.45672 5.7039C2.00259 6.80025 1.88377 8.00665 2.11529 9.17054C2.3468 10.3344 2.91824 11.4035 3.75736 12.2426C4.59647 13.0818 5.66557 13.6532 6.82946 13.8847C7.99334 14.1162 9.19974 13.9974 10.2961 13.5433C11.3925 13.0891 12.3295 12.3201 12.9888 11.3334C13.6481 10.3467 14 9.18668 14 8C14 6.4087 13.3679 4.88257 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z" />
    </svg>
  )
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

function ChartStatus({ status, content, height }: { status: "empty" | "error"; content?: ChartStatusContent; height: number }) {
  const error = status === "error"
  return (
    <div
      role={error ? "alert" : "status"}
      style={{ minHeight: height }}
      className="flex flex-col items-center justify-center gap-6 rounded-(--table-status-radius) border border-dashed border-(--table-status-border) p-6 text-center"
    >
      <div className="flex w-full flex-col items-center gap-2">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-(--chart-tooltip-radius) border",
            error
              ? "border-(--chart-status-error-border) bg-(--chart-status-error-bg) text-(color:--table-status-title-error)"
              : "border-(--table-status-border) bg-(--table-status-media-bg) text-white/50"
          )}
        >
          <InfoIcon />
        </div>
        <div className="flex w-full flex-col items-center gap-2 pt-2">
          <p
            className={cn(
              "w-full text-base leading-[normal] font-medium",
              error ? "text-(color:--table-status-title-error)" : "text-(color:--table-status-title)"
            )}
          >
            {content?.title ?? (error ? "Couldn’t load" : "No data")}
          </p>
          <p className="w-full text-sm leading-normal text-(color:--content-muted)">
            {content?.description ?? (error ? "Something went wrong. Try again." : "Nothing to show yet.")}
          </p>
        </div>
      </div>
      {content?.action && <div className="flex items-center gap-2">{content.action}</div>}
    </div>
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
    <section
      data-slot="line-chart"
      data-size={size}
      aria-labelledby={titleId}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-(--chart-card-radius) border border-(--chart-card-border) bg-(--surface-raised)",
        className
      )}
      {...props}
    >
      {/* _Chart / Header */}
      <header className="flex items-start justify-between gap-4 p-(--chart-padding)">
        <div className="flex min-w-0 flex-col gap-2 leading-[normal]">
          <div className="flex items-center gap-1.5 text-base leading-[normal] text-(color:--chart-title)">
            <h3 id={titleId} className="truncate text-base leading-[normal] font-normal">
              {title}
            </h3>
            {info &&
              (typeof info === "string" ? (
                <span role="img" aria-label={info} title={info}>
                  <InfoIcon />
                </span>
              ) : (
                info
              ))}
          </div>
          {value !== undefined && (
            <div className="flex items-center gap-2">
              <p className="text-lg leading-[normal] text-(color:--chart-value) tabular-nums">{value}</p>
              {delta !== undefined && <DeltaBadge tone={deltaTone}>{delta}</DeltaBadge>}
            </div>
          )}
          {!small && timestamp && <p className="text-base leading-[normal] text-(color:--chart-title)">{timestamp}</p>}
        </div>
        {!small && ranges && ranges.length > 0 && (
          <Tabs value={range} defaultValue={defaultRange ?? ranges[0]} onValueChange={onRangeChange}>
            <TabsPillList aria-label="Range">
              {ranges.map((r) => (
                <TabsPillTrigger key={r} value={r}>
                  {r}
                </TabsPillTrigger>
              ))}
            </TabsPillList>
          </Tabs>
        )}
      </header>

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
    </section>
  )
}

export { LineChart }
export type { LineChartProps, LineSeries, LineChartSize }
