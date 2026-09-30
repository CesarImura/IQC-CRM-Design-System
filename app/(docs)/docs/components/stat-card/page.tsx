import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { StatCardMatrix } from "@/components/docs/stat-card-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Stat Card",
  description: "KPI card: a metric, its change, and an optional sparkline, comparison or split.",
}

export default function StatCardDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Stat Card"
        description="Shows one key metric, how it changed, and optionally its trend, a comparison with the average, or a split between two parts."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2090:3283")} target="_blank" rel="noreferrer">
            Figma: Stat Card
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="stat-card-demo" />

      <H2>Layouts</H2>
      <UL>
        <li>Compact (default): metric with a small sparkline on the right. For dense dashboards.</li>
        <li>Stacked: centered, large number, no chart. For a single headline figure.</li>
        <li>Spark: metric above a full-width sparkline, when the trend matters as much as the number.</li>
        <li>Compare: taller chart with a dashed average line and a highlighted point, e.g. today against the period average.</li>
        <li>Split: a two-part proportion (e.g. profit against risk) with a legend.</li>
      </UL>
      <ComponentPreview name="stat-card-layouts" align="start" />

      <H2>Tones</H2>
      <P>
        The tone colors the delta badge and the chart: positive (green), negative (red) or neutral. It usually follows the sign
        of the change, but a rise can be bad news: churn going up is negative.
      </P>
      <ComponentPreview name="stat-card-tones" align="start" />

      <H2>Info</H2>
      <P>An optional info icon after the title shows a tooltip.</P>
      <ComponentPreview name="stat-card-info" />

      <H2>All layouts and tones</H2>
      <P>The full Figma matrix at 364px.</P>
      <StatCardMatrix />

      <H2>Tokens</H2>
      <TokenTable
        title="Card"
        rows={[
          ["Background", "surface-raised"],
          ["Border", "border-grid"],
          ["Padding", "stat-card-padding"],
          ["Title", "stat-card-title"],
          ["Value", "stat-card-value"],
          ["Value size", "stat-card-value-size"],
          ["Value size (Stacked)", "stat-card-value-size-lg"],
          ["Caption", "stat-card-caption"],
        ]}
      />
      <TokenTable
        title="Chart"
        rows={[
          ["Positive line", "chart-positive-line"],
          ["Positive area", "chart-positive-area"],
          ["Negative line", "chart-negative-line"],
          ["Negative area", "chart-negative-area"],
          ["Neutral line", "chart-neutral-line"],
          ["Neutral area", "chart-neutral-area"],
          ["Crosshair / average", "chart-crosshair"],
          ["Baseline", "chart-baseline"],
          ["Split lead", "chart-split-lead"],
          ["Split trail", "chart-split-trail"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The card is announced as a region named by its title.</li>
        <li>The delta arrow is named (“Increase”, “Decrease”, “No change”), so the change doesn’t rely on color alone.</li>
        <li>Charts are decorative; if the trend matters, say it in the caption.</li>
        <li>Numbers use tabular figures so values line up across cards.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Info icon is #161616 on the #121514 card, so it’s invisible. The build uses the title color.</li>
          <li>
            The split bar stripes are a Figma WebGPU shader, which only renders with experimental browser flags. The build
            draws the same stripes (45°, 25% opacity, 2px lead / 1px trail, 7px gap). Should the lead and trail widths match?
          </li>
          <li>The card text uses checkbox-label-* variables, and the chart colors are raw values.</li>
          <li>The description mentions an Empty state that isn’t in the component set yet.</li>
        </ul>
      </Callout>
    </>
  )
}
