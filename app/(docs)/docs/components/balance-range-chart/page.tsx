import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { BalanceRangeChartMatrix } from "@/components/docs/balance-range-chart-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"
import { Button } from "@/registry/iq/ui/button"

export const metadata: Metadata = {
  title: "Balance Range Chart",
  description:
    "An account balance, session by session, inside its range: the max-loss level at the bottom and the profit target on top (Challenge), or no ceiling (Funded).",
}

const PLATFORM_FIGMA = "https://www.figma.com/design/e6LrQzn6vm2XlnHeO3qeOw/IQ-Capital-Platform-File?node-id=4589-40541"

export default function BalanceRangeChartDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Balance Range Chart"
        description="Shows an account balance session by session inside its range: the max-loss level at the bottom and, on Challenge accounts, the profit target on top. Built on the Line Chart: same grid, axes, line, crosshair and tooltip, plus the level bands, a target-reached marker and a progress rail."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={PLATFORM_FIGMA} target="_blank" rel="noreferrer">
            Figma: Platform File
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href="/preview/balance-range-chart" target="_blank" rel="noreferrer">
            Full-width preview
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>
        Hover the chart, or Tab into it and use the arrow keys, to see the crosshair and tooltip. Click a session (or press Enter) to open its
        snapshot. Switch between the Profit run and Drawdown examples, and use Simulate session to play the next sessions: a normal close, the daily
        loss limit, the profit target (with the celebration modal) or a max-loss breach.
      </P>
      <ComponentPreview name="balance-range-chart-demo" className="block p-4 sm:p-6" />

      <H2>Account types</H2>
      <UL>
        <li>
          <strong className="text-white">Challenge:</strong> pass a <code>target</code>. A hatched green band sits above the profit target and the Y range
          always includes it.
        </li>
        <li>
          <strong className="text-white">Funded:</strong> leave <code>target</code> out. There is no ceiling: the top band is replaced by a dashed
          high-water mark (the best close so far), and the rail shows the payout available instead of the target.
        </li>
      </UL>
      <ComponentPreview name="balance-range-chart-types" className="block p-4 sm:p-6" />

      <H2>States</H2>
      <UL>
        <li>
          <strong className="text-white">In range:</strong> between the start and the target. Green line and a green area down to the start line.
        </li>
        <li>
          <strong className="text-white">Below start:</strong> the line turns coral under the start balance and a coral area fills the space between the
          two.
        </li>
        <li>
          <strong className="text-white">Target reached:</strong> the first session at or above the target gets a ringed point and a “Target reached”
          tag. Challenge only.
        </li>
        <li>
          <strong className="text-white">Breached:</strong> the balance closes under the max-loss line. The chart keeps drawing it; the rail and the toast
          say the account is disabled.
        </li>
      </UL>
      <ComponentPreview name="balance-range-chart-states" className="block p-4 sm:p-6" />

      <H2>All variants</H2>
      <P>Account type × State. Hover is forced on session #10 in every card.</P>
      <BalanceRangeChartMatrix />

      <H2>Parts</H2>
      <H3>Grid and axes</H3>
      <UL>
        <li>Same as the Line Chart: Y labels 14px at 50% on the left, gridlines 1px dashed (2 / 2) at white 10%, one per Y label.</li>
        <li>X axis: 1px baseline at white 15%, 1×8 ticks at white 10%, session labels 14px at 50%. Labels thin out (every 2nd, 3rd…) when they don’t fit.</li>
        <li>The Y range always includes the max-loss level and, on Challenge, the target, with half a step of air above and below.</li>
      </UL>
      <H3>Levels</H3>
      <UL>
        <li>Profit target: dashed 1.5px green line (6 / 4) with a 45° hatch band above it (1px every 9px at 12%).</li>
        <li>Max loss: the same in coral, with the band below the line.</li>
        <li>Start balance: a solid 1px line at white 30% with a small “Start” label on the right.</li>
        <li>Level tags: square, 12px medium, centred on their line. Filled for the target and max loss, outlined for the high-water mark.</li>
      </UL>
      <H3>Line and areas</H3>
      <UL>
        <li>2px line in chart-series-1; the stretches below the start balance are coral.</li>
        <li>Areas sit between the line and the start: green above it (fading toward the start), coral below it (fading toward the start).</li>
        <li>Current balance: a 9px point and a tag above the line, hidden while hovering.</li>
        <li>Target reached: 10px halo plus a 5px point at the first session on or above the target, with a square tag.</li>
      </UL>
      <H3>Hover</H3>
      <UL>
        <li>Crosshair 1px at white 50%; point 13px with a 2px ring (green or coral, by the side of the start it is on).</li>
        <li>
          Tooltip: the Line Chart’s _Chart / Tooltip. Session and date, then balance, equity, session P&amp;L, distance to the target (Challenge) and
          distance above the max loss, each with its 4×21 color tick.
        </li>
        <li>It is anchored to the point: below it when the point is in the top half, above it in the bottom half, and flips left near the edge.</li>
      </UL>
      <H3>Legend</H3>
      <UL>
        <li>14px squares, 14px labels at 32%. Balance and Below start are filled; Profit target and Max loss use a hatched swatch so they read as zones.</li>
      </UL>
      <H3>Rail (demo)</H3>
      <UL>
        <li>
          Profit target (or Payout available), Room to max loss and Daily loss limit: title 12px, value 20px medium, a 4px bar and a caption. Exported as{" "}
          <code>BalanceRangeRail</code> and <code>BalanceRangeRailBlock</code>.
        </li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Balance Range Chart"
        rows={[
          ["Positive values", "balance-range-up"],
          ["Below start", "balance-range-down"],
          ["Profit target", "balance-range-target"],
          ["Max loss", "balance-range-max-loss"],
          ["Band hatch opacity", "balance-range-hatch-opacity"],
          ["Gain area opacity", "balance-range-gain-area-opacity"],
          ["Loss area opacity", "balance-range-loss-area-opacity"],
          ["Bar track", "balance-range-segment-empty"],
        ]}
      />
      <TokenTable
        title="Shared with the Line Chart"
        rows={[
          ["Line", "chart-series-1"],
          ["Line width", "chart-line-width"],
          ["Gridline", "chart-gridline"],
          ["Start line", "chart-baseline"],
          ["Axis baseline", "chart-axis-line"],
          ["Axis tick", "chart-axis-tick"],
          ["Axis label", "chart-axis-label"],
          ["Crosshair", "chart-crosshair"],
          ["Point fill", "chart-point-fill"],
          ["Tooltip background", "chart-tooltip-bg"],
          ["Tooltip radius", "chart-tooltip-radius"],
          ["Tooltip date", "chart-tooltip-date"],
          ["Tooltip label", "chart-tooltip-label"],
          ["Tooltip value", "chart-tooltip-value"],
          ["Legend label", "chart-legend-label"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The crosshair snaps to the nearest session; the start balance (before session #1) has no tooltip.</li>
        <li>Keyboard: Tab into the chart, ← → move between sessions, Home / End jump to the ends, Enter opens the session, Esc hides the tooltip.</li>
        <li>
          <code>onSessionSelect(index)</code> fires on click and Enter. In the demo it opens the session snapshot in a Modal; reaching the target opens a
          celebration Modal; sessions, the daily loss limit and a breach show a toast.
        </li>
        <li>The chart fills its container’s width; <code>height</code> sets the plot height (axis included).</li>
      </UL>

      <H2>API</H2>
      <UL>
        <li>
          <code>start</code>, <code>sessions</code> (label, date, balance, equity, pnl, trades), <code>maxLoss</code>, <code>target</code> (Challenge only),{" "}
          <code>height</code>, <code>activeIndex</code> (force the hover, 1 = session #1), <code>onSessionSelect</code>, <code>formatValue</code>.
        </li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Prototype notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Designed in the Platform File (exploration “F · Line Chart style”); not in the CRM library yet.</li>
          <li>The rail, the stat row, the modals and the toasts belong to the demo, not to the chart.</li>
          <li>The sample run uses a 100,000 $ account, a 106,000 $ target, a 94,000 $ static max loss and a 1,000 $ daily loss limit.</li>
        </ul>
      </Callout>
    </>
  )
}
