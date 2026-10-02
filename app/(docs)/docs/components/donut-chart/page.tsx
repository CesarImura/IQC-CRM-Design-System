import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Donut Chart",
  description: "Part-to-whole for a handful of categories.",
}

export default function DonutChartDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Donut Chart"
        description="Part-to-whole for a handful of categories: a ring split by share, the total in the middle, labels around it and a legend below."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2818:5014")} target="_blank" rel="noreferrer">
            Figma: Donut Chart
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Default (hover a segment), Empty and Error.</P>
      <ComponentPreview name="donut-chart-demo" align="start" />

      <H2>Parts</H2>
      <H3>Ring</H3>
      <UL>
        <li>221px across, 86% inner radius, starting at 12 o’clock and running clockwise over a white 5% track.</li>
        <li>Segments use the chart series colors in order, separated by 3px gaps in the card color.</li>
        <li>The highlighted segment (the first, or the hovered one) glows: a 6px halo of its color at 16%.</li>
        <li>Center: the total, 24px medium white, over a 16px medium label at 50%.</li>
      </UL>
      <H3>Labels, legend and tooltip</H3>
      <UL>
        <li>Around the ring: name and share on two lines, 14px; the highlighted one at 90%, the rest at 50%.</li>
        <li>Legend under the plot: 14px tick (2px radius) and label at 32%, 24px apart.</li>
        <li>Hover: the other segments dim to 30% and a compact tooltip (canvas, 4px radius, 8 / 12px padding) shows the value.</li>
      </UL>
      <H3>Card and states</H3>
      <UL>
        <li>Chart card with the small header (title and info). Plot 336px tall.</li>
        <li>Empty: “No data” (Empty, Compact) in the plot. Error: the Empty component (Page, Outline) with actions.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Series 1–4", "chart-series-1"],
          ["", "chart-series-2"],
          ["", "chart-series-3"],
          ["", "chart-series-4"],
          ["Track", "chart-ring-track"],
          ["Gap color", "surface-raised"],
          ["Center value", "chart-value"],
          ["Center label", "chart-title"],
          ["Legend label", "chart-legend-label"],
          ["Tooltip", "chart-tooltip-bg"],
          ["Tooltip label / value", "chart-tooltip-label"],
          ["", "chart-tooltip-value"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Arc sizes come from the data. Keep it to about six categories; group the rest as “Other”.</li>
        <li>The ring has an accessible name listing every category and share.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The arcs are static and don’t match the labels (dxFeed is drawn at about 57% but labeled 60%; VolFX at 11%, labeled 5%). The build draws the real shares.</li>
          <li>Labels use auto line height and a raw white with layer opacity (90% / 50%).</li>
          <li>The legend says “VolumetricaFX” while the ring label says “VolFX”.</li>
          <li>The Empty variant is shorter (410px) than Default (455px) and Error (447px).</li>
        </ul>
      </Callout>
    </>
  )
}
