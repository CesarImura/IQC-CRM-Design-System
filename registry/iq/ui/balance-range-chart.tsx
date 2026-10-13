"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital Platform File → Accounts → "F · Line Chart style" (4589:40541 Challenge, 4589:40829 Funded).
// The balance runs between the max-loss level (bottom) and the profit target (top). Funded accounts have no target:
// the top band is replaced by a dashed high-water mark.
// Level tags (profit target, max loss, high-water mark) are square and sit centred on their dashed line.
// Trailing max loss (EoD): at each New York close the line moves up to the same % below the highest intraday equity
// so far and never moves down, so it is drawn as a step line. After the first payout it locks at the start balance.
// Drawn in the Line Chart language of the DS:
// green line with a 10% area fill, dashed 2/2 grid, X axis track with ticks, crosshair + 13px point on hover,
// and the _Chart / Tooltip anchored to the hovered point (below it in the top half, above it in the bottom half).

type BalanceSession = {
  /** Axis label, e.g. "#10". */
  label: string
  /** Shown in the tooltip, e.g. "29 Sep 2026 · 21:00 UTC". */
  date: string
  /** Balance at the session close. */
  balance: number
  equity: number
  /** Net P&L of the session. */
  pnl: number
  trades: number
  /** Highest intraday equity of the session. Drives the trailing max loss; defaults to max(balance, equity). */
  high?: number
  /** Withdrawn at the session close (Funded). The first payout locks the max loss at the start balance. */
  payout?: number
}

type BalanceRangeChartProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  /** Balance before the first session. */
  start: number
  sessions: BalanceSession[]
  /** The breach level before the first session. */
  maxLoss: number
  /** Trail the max loss below the highest intraday equity (step line). Off = a fixed level. */
  trailing?: boolean
  /** Show only the last N sessions (the max loss still counts the whole history). Undefined = all. */
  range?: number
  /** Challenge only. Leave undefined for Funded accounts. */
  target?: number
  /** Plot height in px, axis labels included. */
  height?: number
  /** Force the hovered session (docs, screenshots). null = no hover. */
  activeIndex?: number | null
  /** Click or Enter on a session. */
  onSessionSelect?: (index: number) => void
  formatValue?: (value: number) => string
}

const Y_LABEL_WIDTH = 44
const PLOT_LEFT = Y_LABEL_WIDTH + 12
const AXIS_GAP = 8 // plot bottom → axis baseline
const AXIS_HEIGHT = 8 + 21 // tick + label row
const PAD_TOP = 12
const TOOLTIP_OFFSET = 16
const TOOLTIP_ANCHOR = 14

const money = (v: number) =>
  `${v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`
const signed = (v: number) => `${v >= 0 ? "+" : "−"}${money(Math.abs(v))}`
const compact = (v: number) => (v >= 1000 ? `${+(v / 1000).toFixed(1)}k` : String(v))

/** Max-loss level in force at each close (index 0 = before the first session) and the highest equity so far. */
function maxLossLevels(start: number, sessions: BalanceSession[], maxLoss: number, trailing = false) {
  const ratio = maxLoss / start
  let peak = start
  let level = maxLoss
  let locked = false
  const levels = [maxLoss]
  for (const s of sessions) {
    if (trailing) {
      peak = Math.max(peak, s.high ?? Math.max(s.balance, s.equity))
      if (s.payout) locked = true
      level = locked ? start : Math.max(level, Math.round(peak * ratio * 100) / 100)
    }
    levels.push(level)
  }
  return { levels, peak, locked }
}

function niceStep(range: number) {
  const steps = [250, 500, 1000, 2000, 4000, 5000, 10000, 20000, 50000]
  return steps.find((s) => range / s <= 5) ?? 100000
}

function BalanceRangeChart({
  start,
  sessions: allSessions,
  range,
  maxLoss,
  trailing = false,
  target,
  height = 440,
  activeIndex,
  onSessionSelect,
  formatValue = money,
  className,
  ...props
}: BalanceRangeChartProps) {
  const uid = React.useId().replace(/:/g, "")
  const plotRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const [hover, setHover] = React.useState<number | null>(null)

  React.useLayoutEffect(() => {
    const el = plotRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [])

  const active = activeIndex !== undefined ? activeIndex : hover
  const [tooltipWidth, setTooltipWidth] = React.useState(0)
  React.useLayoutEffect(() => {
    if (tooltipRef.current) setTooltipWidth(tooltipRef.current.offsetWidth)
  }, [active, width])

  const funded = target === undefined
  const goal = target ?? 0
  // Range: the window opens on the close before its first session.
  const offset = range ? Math.max(0, allSessions.length - range) : 0
  const sessions = allSessions.slice(offset)
  const values = [offset ? allSessions[offset - 1].balance : start, ...sessions.map((s) => s.balance)]
  const { levels: allLevels, peak: highest, locked } = maxLossLevels(start, allSessions, maxLoss, trailing)
  const levels = allLevels.slice(offset)
  const peak = trailing ? highest : Math.max(start, ...allSessions.map((s) => s.balance))
  const last = values[values.length - 1]
  const lastLevel = levels[levels.length - 1]

  const rawMin = Math.min(...levels, ...values)
  const rawMax = Math.max(funded ? peak : goal, ...values)
  const step = niceStep(rawMax - rawMin)
  const min = Math.floor((rawMin - step / 2) / step) * step
  const max = Math.ceil((rawMax + step / 2) / step) * step
  const ticks: number[] = []
  for (let v = min; v <= max; v += step) ticks.push(v)

  const plotHeight = height - AXIS_GAP - AXIS_HEIGHT
  const plotWidth = Math.max(0, width - PLOT_LEFT)
  const top = PAD_TOP
  const bottom = plotHeight
  const count = values.length
  const x = (i: number) => (count === 1 ? plotWidth / 2 : (i / (count - 1)) * plotWidth)
  const y = (v: number) => bottom - ((v - min) / (max - min)) * (bottom - top)
  const ys = y(start)
  const pts = values.map((v, i) => [x(i), y(v)] as const)
  // Step line: each close holds the level until the next close moves it.
  const levelPath = `M0,${y(levels[0])}${levels.slice(1).map((l, i) => `H${x(i + 1)}V${y(l)}`).join("")}`
  const levelArea = `${levelPath}V${bottom}H0Z`

  let upPath = ""
  let downPath = ""
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    const a1 = y1 <= ys
    const a2 = y2 <= ys
    if (a1 === a2) {
      const seg = `M${x1},${y1}L${x2},${y2}`
      if (a1) upPath += seg
      else downPath += seg
    } else {
      const xm = x1 + ((x2 - x1) * (ys - y1)) / (y2 - y1)
      const s1 = `M${x1},${y1}L${xm},${ys}`
      const s2 = `M${xm},${ys}L${x2},${y2}`
      if (a1) {
        upPath += s1
        downPath += s2
      } else {
        downPath += s1
        upPath += s2
      }
    }
  }
  // Areas sit between the balance and the start line: green above it, coral below it.
  // Crossings are inserted so both shapes meet exactly on the start line.
  const crossed: [number, number][] = []
  pts.forEach(([px, py], i) => {
    if (i > 0) {
      const [x0, y0] = pts[i - 1]
      if ((y0 < ys && py > ys) || (y0 > ys && py < ys)) crossed.push([x0 + ((px - x0) * (ys - y0)) / (py - y0), ys])
    }
    crossed.push([px, py])
  })
  const first = crossed[0][0]
  const lastX = crossed[crossed.length - 1][0]
  const areaPath = `M${first},${ys}${crossed.map(([px, py]) => `L${px},${Math.min(py, ys)}`).join("")}L${lastX},${ys}Z`
  const lossPath = `M${first},${ys}${crossed.map(([px, py]) => `L${px},${Math.max(py, ys)}`).join("")}L${lastX},${ys}Z`
  const areaTop = Math.min(ys - 1, ...pts.map((p) => p[1]))
  const lowest = Math.max(...pts.map((p) => p[1]))
  const hasGain = areaTop < ys - 0.5
  const hasLoss = lowest > ys + 0.5

  // Current-balance tag: above the line, even when the line comes down into the last point.
  const TAG_W = 104
  const tagLeftX = Math.max(0, x(count - 1) - 12 - TAG_W)
  const lineYAt = (px: number) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[i + 1]
      if (px >= x1 && px <= x2) return y1 + ((y2 - y1) * (px - x1)) / Math.max(1, x2 - x1)
    }
    return y(last)
  }
  const tagBottom = Math.min(y(last), lineYAt(tagLeftX), lineYAt((tagLeftX + x(count - 1)) / 2)) - 10
  // The start label (bottom-right of the start line) gives way to the current-balance and trailing max-loss tags.
  const showStart = Math.abs(tagBottom - 11 - (ys + 13)) >= 22 && !(trailing && Math.abs(y(lastLevel) - (ys + 13)) < 22)

  // Challenge: the first session that closes at or above the target.
  const passIndex = funded ? -1 : values.findIndex((v, i) => i > 0 && v >= goal)
  const passed = passIndex > 0

  // One label per session while they fit (about 44px each), then every 2nd, 3rd…
  const maxLabels = Math.max(2, Math.floor(plotWidth / 44))
  const labelEvery = Math.max(1, Math.ceil(sessions.length / Math.min(15, maxLabels)))
  // Always show the last session; drop the label before it when the two would collide.
  const shownLabels = sessions.map((_, i) => i).filter((i) => i % labelEvery === 0)
  const lastLabel = sessions.length - 1
  if (lastLabel >= 0 && !shownLabels.includes(lastLabel)) {
    const prev = shownLabels[shownLabels.length - 1]
    if (prev !== undefined && x(lastLabel + 1) - x(prev + 1) < 40) shownLabels.pop()
    shownLabels.push(lastLabel)
  }

  function indexAt(clientX: number) {
    const rect = plotRef.current?.getBoundingClientRect()
    if (!rect || plotWidth === 0 || count < 2) return null
    const px = clientX - rect.left - PLOT_LEFT
    return Math.min(count - 1, Math.max(1, Math.round((px / plotWidth) * (count - 1))))
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && hover !== null) {
      onSessionSelect?.(offset + hover - 1)
      return
    }
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End", "Escape"]
    if (!keys.includes(event.key)) return
    event.preventDefault()
    setHover((current) => {
      if (event.key === "Escape") return null
      if (event.key === "Home") return 1
      if (event.key === "End") return count - 1
      if (event.key === "ArrowRight") return current === null ? 1 : Math.min(count - 1, current + 1)
      return current === null ? count - 1 : Math.max(1, current - 1)
    })
  }

  const hasActive = active !== null && active !== undefined && active >= 1 && active < count
  const session = hasActive ? sessions[active - 1] : null
  const activeX = hasActive ? PLOT_LEFT + x(active) : 0
  const anchorY = hasActive ? y(values[active]) : top
  const below = anchorY < plotHeight / 2
  const flip = hasActive && activeX + TOOLTIP_OFFSET + tooltipWidth > width
  const activeUp = hasActive && values[active] >= start

  return (
    <div data-slot="balance-range-chart" data-variant="line" data-mode={funded ? "funded" : "challenge"} className={cn("w-full", className)} {...props}>
      <div
        ref={plotRef}
        role="group"
        aria-roledescription="chart"
        aria-label={`Balance by session. Start ${formatValue(start)}, ${trailing ? "trailing " : ""}max loss ${formatValue(lastLevel)}${funded ? "" : `, profit target ${formatValue(goal)}`}. Use the arrow keys to read sessions and Enter to open one.`}
        tabIndex={0}
        onPointerMove={(e) => setHover(indexAt(e.clientX))}
        onPointerLeave={() => setHover(null)}
        onClick={() => hasActive && onSessionSelect?.(offset + active - 1)}
        onKeyDown={onKeyDown}
        onBlur={() => setHover(null)}
        className={cn(
          "relative rounded-[2px] outline-none select-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-4 focus-visible:ring-offset-(--surface-raised)",
          onSessionSelect && hasActive && "cursor-pointer"
        )}
        style={{ height }}
      >
        {/* _Chart / Grid: Y labels */}
        {ticks.map((t) => (
          <span
            key={t}
            aria-hidden="true"
            className="absolute left-0 -translate-y-1/2 text-right text-sm leading-normal text-(color:--chart-axis-label) tabular-nums"
            style={{ top: y(t), width: Y_LABEL_WIDTH }}
          >
            {compact(t)}
          </span>
        ))}

        {width > 0 && (
          <svg aria-hidden="true" className="absolute top-0 overflow-visible" style={{ left: PLOT_LEFT }} width={plotWidth} height={height}>
            <defs>
              <pattern id={`${uid}-hatch-target`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="9" strokeWidth="1" style={{ stroke: "var(--balance-range-target)" }} />
              </pattern>
              <pattern id={`${uid}-hatch-loss`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="9" strokeWidth="1" style={{ stroke: "var(--balance-range-max-loss)" }} />
              </pattern>
              <linearGradient id={`${uid}-area`} x1="0" x2="0" y1={areaTop} y2={ys} gradientUnits="userSpaceOnUse">
                <stop offset="0" style={{ stopColor: "var(--chart-series-1)" }} />
                <stop offset="1" style={{ stopColor: "var(--chart-series-1)", stopOpacity: 0 }} />
              </linearGradient>
              <linearGradient id={`${uid}-loss`} x1="0" x2="0" y1={ys} y2={Math.max(lowest, ys + 1)} gradientUnits="userSpaceOnUse">
                <stop offset="0" style={{ stopColor: "var(--balance-range-down)", stopOpacity: 0 }} />
                <stop offset="1" style={{ stopColor: "var(--balance-range-down)" }} />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            {ticks.map((t) => (
              <line key={t} x1={0} x2={plotWidth} y1={Math.round(y(t)) + 0.5} y2={Math.round(y(t)) + 0.5} strokeDasharray="2 2" style={{ stroke: "var(--chart-gridline)" }} />
            ))}

            {/* Bands */}
            {!funded ? (
              <>
                <rect x={0} y={top} width={plotWidth} height={Math.max(0, y(goal) - top)} fill={`url(#${uid}-hatch-target)`} style={{ opacity: "var(--balance-range-hatch-opacity)" }} />
                <line x1={0} x2={plotWidth} y1={y(goal)} y2={y(goal)} strokeWidth={1.5} strokeDasharray="6 4" style={{ stroke: "var(--balance-range-target)" }} />
              </>
            ) : (
              <line x1={0} x2={plotWidth} y1={y(peak)} y2={y(peak)} strokeDasharray="2 3" style={{ stroke: "var(--balance-range-target)", opacity: 0.7 }} />
            )}
            <path d={levelArea} fill={`url(#${uid}-hatch-loss)`} style={{ opacity: "var(--balance-range-hatch-opacity)" }} />
            <path d={levelPath} fill="none" strokeWidth={1.5} strokeDasharray={trailing ? undefined : "6 4"} style={{ stroke: "var(--balance-range-max-loss)" }} />

            {/* Start */}
            <line x1={0} x2={plotWidth} y1={ys} y2={ys} style={{ stroke: "var(--chart-baseline)" }} />

            {/* Area + line */}
            {hasGain && <path d={areaPath} fill={`url(#${uid}-area)`} style={{ opacity: "var(--balance-range-gain-area-opacity)" }} />}
            {hasLoss && <path d={lossPath} fill={`url(#${uid}-loss)`} style={{ opacity: "var(--balance-range-loss-area-opacity)" }} />}
            {upPath && <path d={upPath} fill="none" strokeLinejoin="round" strokeLinecap="round" style={{ stroke: "var(--chart-series-1)", strokeWidth: "var(--chart-line-width)" }} />}
            {downPath && <path d={downPath} fill="none" strokeLinejoin="round" strokeLinecap="round" style={{ stroke: "var(--balance-range-down)", strokeWidth: "var(--chart-line-width)" }} />}

            {/* Target reached */}
            {passed && (
              <g>
                <circle cx={pts[passIndex][0]} cy={pts[passIndex][1]} r={10} style={{ fill: "var(--chart-series-1)", opacity: 0.18 }} />
                <circle cx={pts[passIndex][0]} cy={pts[passIndex][1]} r={5} strokeWidth={2} style={{ fill: "var(--chart-series-1)", stroke: "var(--surface-raised)" }} />
              </g>
            )}

            {/* Current balance */}
            {!hasActive && !(passed && passIndex === count - 1) && <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={4.5} style={{ fill: last >= start ? "var(--chart-series-1)" : "var(--balance-range-down)" }} />}

            {/* Crosshair + point */}
            {hasActive && (
              <g>
                <line x1={Math.round(x(active)) + 0.5} x2={Math.round(x(active)) + 0.5} y1={top} y2={bottom + AXIS_GAP} style={{ stroke: "var(--chart-crosshair)" }} />
                {trailing && <rect x={x(active) - 3.5} y={y(levels[active]) - 3.5} width={7} height={7} style={{ fill: "var(--balance-range-max-loss)" }} />}
                <circle
                  cx={x(active)}
                  cy={y(values[active])}
                  r={5.5}
                  strokeWidth={2}
                  style={{ fill: "var(--chart-point-fill)", stroke: activeUp ? "var(--chart-series-1)" : "var(--balance-range-down)" }}
                />
              </g>
            )}
          </svg>
        )}

        {/* _Chart / Axis / X Track */}
        {width > 0 && (
          <div aria-hidden="true" className="absolute right-0" style={{ left: PLOT_LEFT, top: bottom + AXIS_GAP }}>
            <span className="absolute inset-x-0 top-0 h-px bg-(--chart-axis-line)" />
            {sessions.map((s, i) =>
              shownLabels.includes(i) ? (
                <span key={s.label} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: x(i + 1) }}>
                  <span className="h-2 w-px bg-(--chart-axis-tick)" />
                  <span className="text-sm leading-normal whitespace-nowrap text-(color:--chart-axis-label)">{s.label}</span>
                </span>
              ) : null
            )}
          </div>
        )}

        {/* Level tags */}
        {width > 0 && (
          <>
            {!funded ? (
              <LevelTag tone="target" style={{ left: PLOT_LEFT, top: y(goal) }}>
                Profit target <span className="ml-2">{formatValue(goal)}</span>
              </LevelTag>
            ) : (
              <LevelTag tone="target" outline style={{ left: PLOT_LEFT, top: y(peak) }}>
                High-water mark <span className="ml-2">{formatValue(peak)}</span>
              </LevelTag>
            )}
            {trailing ? (
              <LevelTag tone="loss" className="-translate-x-full" style={{ left: PLOT_LEFT + plotWidth, top: y(lastLevel) }}>
                {locked ? "Max loss · locked" : "Max loss · trailing"} <span className="ml-2">{formatValue(lastLevel)}</span>
              </LevelTag>
            ) : (
              <LevelTag tone="loss" style={{ left: PLOT_LEFT, top: y(maxLoss) }}>
                Max loss <span className="ml-2">{formatValue(maxLoss)}</span>
              </LevelTag>
            )}
            {showStart && (
            <span className="absolute -translate-x-full text-xs leading-[18px] whitespace-nowrap text-(color:--chart-axis-label)" style={{ left: PLOT_LEFT + plotWidth - 6, top: ys + 4 }}>
              Start {formatValue(start).replace(" $", "")}
            </span>
            )}
            {passed && (
              <span
                className="absolute inline-flex -translate-y-full items-center gap-1 px-1.5 py-0.5 text-xs leading-[18px] font-medium whitespace-nowrap"
                style={{
                  left: PLOT_LEFT + x(passIndex),
                  top: y(values[passIndex]) - 16,
                  transform: `translate(${x(passIndex) > plotWidth - 140 ? "calc(-100% + 8px)" : "-50%"}, -100%)`,
                  color: "var(--surface-canvas)",
                  background: "var(--chart-series-1)",
                }}
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" className="shrink-0">
                  <path d="M6.5 12 2 7.5l1.1-1.1 3.4 3.4 6.4-6.4L14 4.5z" fill="currentColor" />
                </svg>
                Target reached · {sessions[passIndex - 1].label}
              </span>
            )}
            {!hasActive && !(passed && passIndex === count - 1) && (
              <span
                aria-hidden="true"
                className="absolute inline-flex -translate-x-full -translate-y-full items-center rounded-[2px] px-1.5 py-0.5 text-xs leading-[18px] font-medium whitespace-nowrap"
                style={{
                  left: PLOT_LEFT + x(count - 1) - 12,
                  top: tagBottom,
                  color: last >= start ? "var(--chart-series-1)" : "var(--balance-range-down)",
                  background: `color-mix(in srgb, ${last >= start ? "var(--chart-series-1)" : "var(--balance-range-down)"} 14%, transparent)`,
                }}
              >
                {formatValue(last)}
              </span>
            )}
          </>
        )}

        {/* _Chart / Tooltip: anchored to the point */}
        {hasActive && session && width > 0 && (
          <div
            ref={tooltipRef}
            aria-hidden="true"
            className="pointer-events-none absolute z-10 flex min-w-[195px] flex-col gap-1.5 rounded-(--chart-tooltip-radius) bg-(--chart-tooltip-bg) px-4 py-3.5"
            style={{
              left: activeX,
              top: below ? anchorY + TOOLTIP_ANCHOR : anchorY - TOOLTIP_ANCHOR,
              transform: `translate(${flip ? `calc(-100% - ${TOOLTIP_OFFSET}px)` : `${TOOLTIP_OFFSET}px`}, ${below ? "0" : "-100%"})`,
            }}
          >
            <p className="text-base leading-normal whitespace-nowrap text-(color:--chart-tooltip-date)">
              Session {session.label} · {session.date.split(" · ")[0]}
            </p>
            <TooltipItem color={activeUp ? "var(--chart-series-1)" : "var(--balance-range-down)"} label="Balance" value={formatValue(session.balance)} />
            <TooltipItem color="var(--content-default)" label="Equity" value={formatValue(session.equity)} />
            <TooltipItem color={session.pnl >= 0 ? "var(--chart-series-1)" : "var(--balance-range-down)"} label="Session P&L" value={signed(session.pnl)} />
            {session.payout ? <TooltipItem color="var(--content-muted)" label="Payout" value={`−${formatValue(session.payout)}`} /> : null}
            {!funded && <TooltipItem color="var(--balance-range-target)" label="To target" value={formatValue(Math.max(0, goal - session.balance))} />}
            {trailing && <TooltipItem color="var(--balance-range-max-loss)" label="Max loss" value={formatValue(levels[active])} />}
            <TooltipItem color="var(--balance-range-max-loss)" label="Above max loss" value={formatValue((trailing ? session.equity : session.balance) - levels[active])} />
          </div>
        )}
        <span className="sr-only" aria-live="polite">
          {session ? `Session ${session.label}: balance ${formatValue(session.balance)}, session P&L ${signed(session.pnl)}` : ""}
        </span>
      </div>
    </div>
  )
}

// _Chart / Tooltip Item: 4px tick, label at 32%, value at 80%.
function TooltipItem({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-base leading-normal whitespace-nowrap">
      <span aria-hidden="true" className="h-[21px] w-1 shrink-0 rounded-[2px]" style={{ background: color }} />
      <span className="text-(color:--chart-tooltip-label)">{label}</span>
      <span className="font-medium text-(color:--chart-tooltip-value)">{value}</span>
    </div>
  )
}

function LevelTag({ tone, outline, className, children, ...props }: React.ComponentProps<"span"> & { tone: "target" | "loss"; outline?: boolean }) {
  const color = tone === "target" ? "var(--balance-range-target)" : "var(--balance-range-max-loss)"
  return (
    <span
      aria-hidden="true"
      className={cn("absolute inline-flex -translate-y-1/2 items-center px-1.5 py-0.5 text-xs leading-[18px] font-medium whitespace-nowrap", className)}
      style={
        outline
          ? { color, border: `1px solid ${color}`, background: "var(--surface-raised)", ...props.style }
          : { color: "var(--surface-canvas)", background: color, ...props.style }
      }
    >
      {children}
    </span>
  )
}

// _Chart / Legend: 12px squares, 12px labels at 32%, kept on one line so it shares a row with the time range.
// Level bands get a hatched swatch so they read as zones.
function HatchSwatch({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14" className="shrink-0 overflow-hidden rounded-[2px]">
      <rect width="14" height="14" style={{ fill: color, opacity: 0.16 }} />
      <path d="M-2,6L6,-2M-2,11L11,-2M-2,16L16,-2M3,16L16,3M8,16L16,8" strokeWidth="1.25" style={{ stroke: color }} />
      <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" fill="none" style={{ stroke: color, opacity: 0.6 }} />
    </svg>
  )
}

function BalanceRangeLegend({ funded, trailing, className }: { funded?: boolean; trailing?: boolean; className?: string }) {
  const items: [string, string, boolean][] = [
    ["Balance", "var(--chart-series-1)", false],
    ["Below start", "var(--balance-range-down)", false],
    [funded ? "High-water mark" : "Profit target", "var(--balance-range-target)", true],
    [trailing ? "Max loss (trailing)" : "Max loss", "var(--balance-range-max-loss)", true],
  ]
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {items.map(([label, color, hatched]) => (
        <li key={label} className="flex items-center gap-1.5 text-xs leading-[18px] whitespace-nowrap text-(color:--chart-legend-label)">
          {hatched ? <HatchSwatch color={color} /> : <span aria-hidden="true" className="size-3 shrink-0 rounded-[2px]" style={{ background: color }} />}
          {label}
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Rail: progress blocks with segmented bars
 * -----------------------------------------------------------------------------------------------*/

function ProgressBar({ value, color, label }: { value: number; color: string; label: string }) {
  const pct = Math.min(1, Math.max(0, value)) * 100
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="h-1 overflow-hidden rounded-[1px] bg-(--balance-range-segment-empty)"
    >
      <span className="block h-full rounded-[1px]" style={{ width: `max(${pct}%, 3px)`, background: color }} />
    </div>
  )
}

function BalanceRangeRailBlock({
  title,
  value,
  valueTone = "default",
  progress,
  progressColor,
  caption,
}: {
  title: string
  value: string
  valueTone?: "default" | "up"
  progress?: number
  progressColor?: string
  caption: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs leading-[18px] text-(color:--content-muted)">{title}</span>
      <span className={cn("text-xl leading-[26px] font-medium", valueTone === "up" ? "text-(color:--balance-range-up)" : "text-(color:--content-default)")}>
        {value}
      </span>
      {progress !== undefined && progressColor && <ProgressBar value={progress} color={progressColor} label={title} />}
      <span className="text-xs leading-[18px] text-(color:--content-muted)">{caption}</span>
    </div>
  )
}

function BalanceRangeRail({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="balance-range-rail" className={cn("flex flex-col gap-7 border-l border-(--border-grid) pl-6", className)} {...props} />
}

export { BalanceRangeChart, BalanceRangeLegend, BalanceRangeRail, BalanceRangeRailBlock, ProgressBar, maxLossLevels }
export type { BalanceRangeChartProps, BalanceSession }
