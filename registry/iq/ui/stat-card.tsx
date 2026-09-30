import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { DeltaBadge, inferDeltaTone } from "@/registry/iq/ui/badge"
import { StatusDot } from "@/registry/iq/ui/status-dot"

// Figma: IQ Capital CRM Design System → Stat Card (2089:3440), _Chart / Sparkline (2088:3122),
// _Stat / Split Bar (2088:3125). Uses Badge / Delta and Status Dot.

type StatTone = "positive" | "negative" | "neutral"
type StatLayout = "compact" | "stacked" | "spark" | "compare" | "split"

/* -------------------------------------------------------------------------------------------------
 * Sparkline (_Chart / Sparkline)
 * -----------------------------------------------------------------------------------------------*/

const chartTone: Record<StatTone, { line: string; area: string; gradient: boolean; point: string }> = {
  positive: {
    line: "var(--chart-positive-line)",
    area: "var(--chart-positive-area)",
    gradient: true,
    point: "border-(--chart-positive-line)",
  },
  negative: {
    line: "var(--chart-negative-line)",
    area: "var(--chart-negative-area)",
    gradient: true,
    point: "border-(--chart-negative-line)",
  },
  neutral: {
    line: "var(--chart-neutral-line)",
    area: "var(--chart-neutral-area)",
    gradient: false,
    point: "border-(--chart-neutral-line)",
  },
}

type SparklineProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Series values, oldest first. At least two points. */
  data: number[]
  tone?: StatTone
  /** Draws a dashed reference line at this value (Compare layout). */
  average?: number
  /** Index of the point to mark with a crosshair (Compare layout). */
  highlightIndex?: number
  /** Space kept above and below the line, as a fraction of the height. */
  inset?: { top: number; bottom: number }
}

// Rendered in a 100×100 viewBox stretched to the container. Strokes use non-scaling-stroke so they
// stay 1.5px, and the point, crosshair and baseline are HTML so they never distort.
function Sparkline({
  data,
  tone = "neutral",
  average,
  highlightIndex,
  inset = { top: 0.04, bottom: 0.18 },
  className,
  ...props
}: SparklineProps) {
  const gradientId = React.useId()
  const colors = chartTone[tone]

  const values = average === undefined ? data : [...data, average]
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const x = (i: number) => (data.length > 1 ? (i / (data.length - 1)) * 100 : 50)
  const y = (v: number) => inset.top * 100 + (1 - (v - min) / span) * (1 - inset.top - inset.bottom) * 100

  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ")
  const area = `${line} L100 100 L0 100 Z`
  const point = highlightIndex !== undefined && data[highlightIndex] !== undefined
    ? { left: x(highlightIndex), top: y(data[highlightIndex]) }
    : null

  return (
    <div data-slot="sparkline" aria-hidden="true" className={cn("relative h-10 w-full", className)} {...props}>
      {point && (
        <span
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-(--chart-crosshair)"
          style={{ left: `${point.left}%` }}
        />
      )}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        {colors.gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={colors.area} />
              <stop offset="1" stopColor={colors.area} stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        <path
          d={area}
          fill={colors.gradient ? `url(#${gradientId})` : colors.area}
          opacity={colors.gradient ? 0.1 : 1}
        />
        <path
          d={line}
          fill="none"
          stroke={colors.line}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {average !== undefined && (
        <span
          className="absolute inset-x-0 h-px bg-[repeating-linear-gradient(90deg,var(--chart-baseline)_0_2px,transparent_2px_4px)]"
          style={{ top: `${y(average)}%` }}
        />
      )}
      {point && (
        <span
          className={cn(
            "absolute size-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-(--surface-raised)",
            colors.point
          )}
          style={{ left: `${point.left}%`, top: `${point.top}%` }}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Split bar (_Stat / Split Bar)
 * -----------------------------------------------------------------------------------------------*/

type SplitPart = { label: React.ReactNode; value: number }

// Figma draws the stripes with a WebGPU shader (Stripe overlay, 45°). A CSS gradient reproduces it
// exactly: stripes at 25% of the part color, 2px + 7px gap on the lead, 1px + 7px on the trail.
function SplitBar({ lead, trail }: { lead: SplitPart; trail: SplitPart }) {
  const total = lead.value + trail.value || 1
  return (
    <div data-slot="stat-split-bar" className="flex h-14 w-full" aria-hidden="true">
      <div
        className="h-full min-w-px border-x border-(--chart-split-lead) bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--chart-split-lead)_25%,transparent)_0_2px,transparent_2px_9px),linear-gradient(color-mix(in_srgb,var(--chart-split-lead)_15%,transparent))]"
        style={{ flexBasis: `${(lead.value / total) * 100}%` }}
      />
      <div
        className="h-full min-w-px border-x border-(--chart-split-trail) bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--chart-split-trail)_25%,transparent)_0_1px,transparent_1px_8px),linear-gradient(color-mix(in_srgb,var(--chart-split-trail)_15%,transparent))]"
        style={{ flexBasis: `${(trail.value / total) * 100}%` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Stat Card
 * -----------------------------------------------------------------------------------------------*/

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

const cardVariants = cva(
  "flex overflow-hidden bg-(--surface-raised) p-(--stat-card-padding) text-base leading-[normal] font-normal",
  {
    variants: {
      layout: {
        compact: "flex-row items-end gap-4",
        stacked: "flex-col items-center justify-center gap-4 text-center",
        spark: "flex-col items-stretch gap-6",
        compare: "flex-col items-stretch gap-4",
        split: "flex-col items-stretch gap-4",
      },
    },
  }
)

type StatCardProps = Omit<React.ComponentProps<"section">, "title"> & {
  layout?: StatLayout
  /** Defaults to the sign of `delta`: "+" → positive, "-" → negative, otherwise neutral. */
  tone?: StatTone
  title: React.ReactNode
  /** Formatted metric, e.g. "$1,949,190.70". Formatting (currency, locale) is up to you. */
  value: React.ReactNode
  /** Formatted change, e.g. "+18%". Omit to hide the badge. */
  delta?: React.ReactNode
  /** Text after the delta, e.g. "last 30d" or "vs average at timeframe". */
  caption?: React.ReactNode
  /** Adds the info icon after the title. A string also becomes its tooltip and accessible name. */
  info?: React.ReactNode
  /** Series for the compact, spark and compare layouts. */
  data?: number[]
  /** Compare layout: dashed reference value. */
  average?: number
  /** Compare layout: index of the highlighted point. */
  highlightIndex?: number
  /** Split layout: the two proportions and their legend labels. */
  split?: { lead: SplitPart; trail: SplitPart }
}

function StatCard({
  layout = "compact",
  tone: toneProp,
  title,
  value,
  delta,
  caption,
  info,
  data,
  average,
  highlightIndex,
  split,
  className,
  ...props
}: StatCardProps) {
  const tone = toneProp ?? inferDeltaTone(delta)
  const titleId = React.useId()

  const titleRow = (
    <div className="flex items-center gap-1.5 text-(color:--stat-card-title)">
      <h3 id={titleId} className="truncate">
        {title}
      </h3>
      {info !== undefined && info !== false && (
        typeof info === "string" ? (
          <span role="img" aria-label={info} title={info} className="inline-flex">
            <InfoIcon />
          </span>
        ) : (
          info === true ? <InfoIcon /> : info
        )
      )}
    </div>
  )

  const valueEl = (
    <p
      className={cn(
        "font-medium whitespace-nowrap text-(color:--stat-card-value) tabular-nums",
        layout === "stacked"
          ? "text-(length:--stat-card-value-size-lg)"
          : "text-(length:--stat-card-value-size)"
      )}
    >
      {value}
    </p>
  )

  const meta = (delta !== undefined || caption !== undefined) && (
    <div className="flex min-w-0 items-center gap-1">
      {delta !== undefined && <DeltaBadge tone={tone}>{delta}</DeltaBadge>}
      {caption !== undefined && <span className="truncate text-(color:--stat-card-caption)">{caption}</span>}
    </div>
  )

  const content = (withMeta: boolean) => (
    <div className={cn("flex min-w-0 flex-col gap-2", layout === "compact" && "flex-1", layout === "stacked" && "contents")}>
      {titleRow}
      {valueEl}
      {withMeta && meta}
    </div>
  )

  return (
    <section
      data-slot="stat-card"
      data-layout={layout}
      data-tone={tone}
      aria-labelledby={titleId}
      className={cn(cardVariants({ layout }), className)}
      {...props}
    >
      {layout === "compact" && (
        <>
          {content(true)}
          {data && <Sparkline data={data} tone={tone} className="w-24 shrink-0" />}
        </>
      )}

      {layout === "stacked" && content(true)}

      {layout === "spark" && (
        <>
          {content(true)}
          {data && <Sparkline data={data} tone={tone} />}
        </>
      )}

      {layout === "compare" && (
        <>
          {content(false)}
          {data && (
            <Sparkline
              data={data}
              tone={tone}
              average={average}
              highlightIndex={highlightIndex}
              inset={{ top: 0.3, bottom: 0.05 }}
              className="h-20"
            />
          )}
          {meta}
        </>
      )}

      {layout === "split" && (
        <>
          {content(false)}
          {split && (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <StatusDot tone="positive">{split.lead.label}</StatusDot>
                <StatusDot tone="negative">{split.trail.label}</StatusDot>
              </div>
              <SplitBar lead={split.lead} trail={split.trail} />
            </>
          )}
          {meta}
        </>
      )}
    </section>
  )
}

export { StatCard, Sparkline }
export type { StatCardProps, StatTone, StatLayout }
