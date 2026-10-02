import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { LineChartMatrix } from "@/components/docs/line-chart-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Line Chart",
  description: "Trends over time for one to eight series, in three sizes, with hover, empty and error states.",
}

export default function LineChartDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Line Chart"
        description="Shows how one or more values change over time. A header with the headline value, a dashed grid, the lines, and a crosshair tooltip on hover. Single, Comparison or Multi; sm, md or lg; Default, Hover, Empty or Error."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2157:4455")} target="_blank" rel="noreferrer">
            Figma: Chart / Line
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("2155:14755")} target="_blank" rel="noreferrer">
            Chart parts
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Hover the chart, or Tab into it and use the arrow keys, to see the crosshair and tooltip.</P>
      <ComponentPreview name="line-chart-demo" className="p-4 sm:p-6" />

      <H2>Types</H2>
      <UL>
        <li>
          <strong className="text-white">Single:</strong> one line with a soft area fill underneath.
        </li>
        <li>
          <strong className="text-white">Comparison:</strong> two lines, e.g. this period against the last. Adds a legend.
        </li>
        <li>
          <strong className="text-white">Multi:</strong> three or more lines, up to eight series colors. Only the first
          series gets the area fill.
        </li>
      </UL>
      <ComponentPreview name="line-chart-types" className="p-4 sm:p-6" />

      <H2>Series colors</H2>
      <P>
        All eight series colors on the Single chart, so you can see each line and its area fill. Series are colored in this
        order; hover any card to see its point and tooltip.
      </P>
      <ComponentPreview name="line-chart-colors" className="block p-4 sm:p-6" />

      <H2>Sizes</H2>
      <UL>
        <li>
          <strong className="text-white">sm (364 wide):</strong> title and value only; the axis shows the first and last
          label; the tooltip is compact and the date moves to a pill on the axis.
        </li>
        <li>
          <strong className="text-white">md (520):</strong> adds the timestamp and the range tabs; all axis labels.
        </li>
        <li>
          <strong className="text-white">lg (744):</strong> same as md with a taller plot (267px vs 141px).
        </li>
      </UL>
      <ComponentPreview name="line-chart-sizes" className="p-4 sm:p-6" />

      <H2>Empty and Error</H2>
      <P>The plot is replaced by a dashed status box of the same height, so the card doesn’t jump. The legend is hidden.</P>
      <ComponentPreview name="line-chart-states" className="p-4 sm:p-6" />

      <H2>All variants</H2>
      <P>The Figma matrix, one size at a time: Type × State. Hover is forced on the same point in every card.</P>
      <LineChartMatrix />

      <H2>Parts</H2>
      <H3>Header</H3>
      <UL>
        <li>24px padding. Title 16px at 50% with a 16px info icon, 6px apart.</li>
        <li>Value 18px white with a medium Delta Badge, 8px apart. Timestamp 16px at 50%. Rows 8px apart.</li>
        <li>Range: Tabs / Pill (see Tabs), top right.</li>
      </UL>
      <H3>Grid and axes</H3>
      <UL>
        <li>Y labels 14px at 50%, right-aligned in a 29px column, 8px before the plot.</li>
        <li>Gridlines 1px dashed (2 / 2) at white 10%, one per Y label; 8px gap under the lowest one.</li>
        <li>X axis: 1px baseline at white 15%, 1×8 ticks at white 10%, labels 14px at 50%, evenly spaced.</li>
      </UL>
      <H3>Lines</H3>
      <UL>
        <li>2px strokes in the series colors. Series 1 has a vertical gradient fill (its color to transparent) at 10% opacity.</li>
      </UL>
      <H3>Hover</H3>
      <UL>
        <li>Crosshair: 1px at white 50%, from the top gridline to the baseline.</li>
        <li>Point: 13px, canvas fill, 2px ring in the series color, one per series.</li>
        <li>
          Tooltip (md, lg): canvas background, 4px radius, 16 / 14px padding, date 16px at 80%, then one row per series (4×21
          color tick, label at 32%, value medium at 80%). Sits 16px right of the crosshair and flips left near the edge.
        </li>
        <li>Tooltip (sm): 12 / 8px padding, no date; the date shows in a small pill on the axis.</li>
      </UL>
      <H3>Legend</H3>
      <UL>
        <li>Comparison and Multi only. 14px color squares (2px radius) and 14px labels at 32%, 8px apart; items 24px apart.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Series"
        rows={[
          ["Series 1", "chart-series-1"],
          ["Series 2", "chart-series-2"],
          ["Series 3", "chart-series-3"],
          ["Series 4", "chart-series-4"],
          ["Series 5", "chart-series-5"],
          ["Series 6", "chart-series-6"],
          ["Series 7", "chart-series-7"],
          ["Series 8", "chart-series-8"],
          ["Line width", "chart-line-width"],
          ["Area fill opacity", "chart-area-opacity"],
        ]}
      />
      <TokenTable
        title="Grid, axes and hover"
        rows={[
          ["Gridline", "chart-gridline"],
          ["Axis baseline", "chart-axis-line"],
          ["Axis tick", "chart-axis-tick"],
          ["Axis label", "chart-axis-label"],
          ["Crosshair", "chart-crosshair"],
          ["Point fill", "chart-point-fill"],
          ["Point size", "chart-point-size"],
          ["Tooltip background", "chart-tooltip-bg"],
          ["Tooltip radius", "chart-tooltip-radius"],
          ["Tooltip date", "chart-tooltip-date"],
          ["Tooltip label", "chart-tooltip-label"],
          ["Tooltip value", "chart-tooltip-value"],
          ["Legend label", "chart-legend-label"],
        ]}
      />
      <TokenTable
        title="Card and states"
        rows={[
          ["Background", "surface-raised"],
          ["Border", "chart-card-border"],
          ["Radius", "chart-card-radius"],
          ["Padding", "chart-padding"],
          ["Title / timestamp", "chart-title"],
          ["Value", "chart-value"],
          ["Status box border", "table-status-border"],
          ["Empty icon tile", "table-status-media-bg"],
          ["Error icon tile", "chart-status-error-bg"],
          ["Error icon tile border", "chart-status-error-border"],
          ["Error title", "table-status-title-error"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The crosshair snaps to the nearest data point; the tooltip lists every series at that point.</li>
        <li>Keyboard: Tab into the chart, ← → move between points, Home / End jump to the ends, Esc hides the tooltip. Each point is read aloud.</li>
        <li>The range tabs switch with click or the arrow keys.</li>
        <li>The chart fills its container’s width; heights follow the size.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>sm cards have no border or radius, while md and lg have a 1px border/panel stroke. The build uses the border on every size.</li>
          <li>The md variants are scaled (2.8px radius, 16.77px body padding). The build uses 4px and 24px, same as lg.</li>
          <li>sm Comparison and Multi show the date pill on the axis on hover, but sm Single doesn’t. The build always shows it on sm, since the compact tooltip has no date.</li>
          <li>The sm tooltip uses the Compact container with Default (16px) items; the Compact item (14px) isn’t used anywhere.</li>
          <li>X-axis labels are evenly spaced and not tied to data points, and the tooltip date (16 Sep) doesn’t match the axis (1–9 Jul).</li>
          <li>Empty and Error headers differ by size: sm shows only the title, md shows everything, lg drops the value.</li>
          <li>Series 1–8 are variables; gridline, axis, crosshair, tooltip, legend and card colors are raw values or borrow checkbox/breadcrumb variables.</li>
        </ul>
      </Callout>
    </>
  )
}
