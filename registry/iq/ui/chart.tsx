"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DeltaBadge, type DeltaTone } from "@/registry/iq/ui/badge"
import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"
import { Tooltip } from "@/registry/iq/ui/tooltip"

// Shared chart card parts. Figma: _Chart Components (2155:14755) → _Chart / Header, and the chart Empty / Error bodies.

type ChartStatusContent = { title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode }

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

type ChartHeaderProps = {
  titleId: string
  title: React.ReactNode
  /** Adds the info icon after the title. A string shows in a Tooltip on hover / focus and names the icon. */
  info?: React.ReactNode
  /** Formatted headline value, e.g. "2,300". */
  value?: React.ReactNode
  /** Formatted change, e.g. "+18%". */
  delta?: React.ReactNode
  deltaTone?: DeltaTone
  timestamp?: React.ReactNode
  /** Range tabs, e.g. ["24h", "30d", "3m", "1y"]. */
  ranges?: string[]
  range?: string
  defaultRange?: string
  onRangeChange?: (range: string) => void
  /** Small header: title and value only. */
  compact?: boolean
}

// _Chart / Header: title + info, value + delta, timestamp; range tabs on the right.
function ChartHeader({
  titleId,
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
  compact,
}: ChartHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 p-(--chart-padding)">
      <div className="flex min-w-0 flex-col gap-2 leading-6">
        <div className="flex items-center gap-1.5 text-base leading-6 text-(color:--chart-title)">
          <h3 id={titleId} className="truncate text-base leading-6 font-normal">
            {title}
          </h3>
          {info &&
            (typeof info === "string" ? (
<Tooltip content={info}>
                <button type="button" aria-label={info} className="inline-flex cursor-help rounded-[2px] outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]">
                  <InfoIcon />
                </button>
              </Tooltip>
            ) : (
              info
            ))}
        </div>
        {value !== undefined && (
          <div className="flex items-center gap-2">
            <p className="text-lg leading-[1.3] text-(color:--chart-value) tabular-nums">{value}</p>
            {delta !== undefined && <DeltaBadge tone={deltaTone}>{delta}</DeltaBadge>}
          </div>
        )}
        {!compact && timestamp && <p className="text-base leading-6 text-(color:--chart-title)">{timestamp}</p>}
      </div>
      {!compact && ranges && ranges.length > 0 && (
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
  )
}

// Chart card: raised surface, 1px border, 4px radius.
function ChartCard({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-(--chart-card-radius) border border-(--chart-card-border) bg-(--surface-raised)",
        className
      )}
      {...props}
    />
  )
}

/** Empty / Error body: dashed box with icon tile, title and description. */
function ChartStatus({ status, content, height }: { status: "empty" | "error"; content?: ChartStatusContent; height?: number }) {
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
              : "border-(--table-status-border) bg-(--table-status-media-bg) text-(color:--content-muted)"
          )}
        >
          <InfoIcon />
        </div>
        <div className="flex w-full flex-col items-center gap-2 pt-2">
          <p
            className={cn(
              "w-full text-base leading-6 font-medium",
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

export { ChartCard, ChartHeader, ChartStatus, InfoIcon }
export type { ChartHeaderProps, ChartStatusContent }
