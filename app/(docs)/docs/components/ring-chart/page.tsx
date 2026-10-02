import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Ring Chart",
  description: "Progress rings for percentages against a target, in positive, warning and negative tones.",
}

export default function RingChartDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Ring Chart"
        description="Shows how far one or more metrics are toward 100%: a row of rings with the percentage inside and a label below, under the standard chart header. Figma calls it Meter."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2079:6200")} target="_blank" rel="noreferrer">
            Figma: Chart / Ring
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="ring-chart-demo" className="p-4 sm:p-6" />

      <H2>Ring item</H2>
      <P>Tone × Status. Empty shows the track only, with no value or label.</P>
      <ComponentPreview name="ring-chart-items" />
      <UL>
        <li>
          <strong className="text-white">Positive</strong> (green): on track. <strong className="text-white">Warning</strong>{" "}
          (yellow): needs attention. <strong className="text-white">Negative</strong> (red): off track.
        </li>
        <li>The tone is chosen per metric; a low number isn’t always bad.</li>
      </UL>

      <H2>Values</H2>
      <P>The arc starts at 12 o’clock and fills clockwise. A 3px gap separates its ends from the track.</P>
      <ComponentPreview name="ring-chart-values" />

      <H2>Empty and Error</H2>
      <P>The rings are replaced by the dashed status box.</P>
      <ComponentPreview name="ring-chart-states" className="p-4 sm:p-6" />

      <H2>Parts</H2>
      <H3>Ring</H3>
      <UL>
        <li>140px, with a 9.8px band.</li>
        <li>Track: white 5% with 1px stripes at 42° (one every ~7.4px) in white 10%.</li>
        <li>Value arc: flat ends, in the tone color, with a 3px outline in the card color.</li>
        <li>Value 24px medium white, centered. Label 16px medium white, 16px below the ring.</li>
      </UL>
      <H3>Layout</H3>
      <UL>
        <li>Standard chart header (title, value, delta, timestamp, range tabs).</li>
        <li>Rings 16px apart, centered, with 60px above and below. They wrap on narrow cards.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Ring size", "chart-ring-size"],
          ["Band thickness", "chart-ring-thickness"],
          ["Gap at arc ends", "chart-ring-gap"],
          ["Track", "chart-ring-track"],
          ["Track stripes", "chart-ring-stripe"],
          ["Positive", "chart-ring-positive"],
          ["Warning", "chart-ring-warning"],
          ["Negative", "chart-ring-negative"],
          ["Value", "chart-ring-value"],
          ["Label", "chart-ring-label"],
          ["Card background", "surface-raised"],
          ["Card border", "chart-card-border"],
          ["Card padding", "chart-padding"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Each ring is a meter: screen readers read its label and percentage.</li>
        <li>Values are clamped to 0–100.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The arcs are static vectors, not tied to the value: the 99.94% ring is drawn at about 88%, so it looks less full than it is. The build draws the real value.</li>
          <li>The track stripes are a WebGPU shader, which only renders with experimental browser flags. The build draws the same stripes with an SVG pattern.</li>
          <li>The Meter card has a border/panel stroke but no radius (the Line chart card has ≈2.8px), and is 490.67px wide (a fraction). The build uses the shared chart card (1px border/panel, 4px radius).</li>
          <li>The ring tones borrow chart/series-1, chart/series-2 and the Button danger fill; the track and stripe colors are raw values.</li>
          <li>All three rings in the Figma examples say “Platform Uptime”.</li>
        </ul>
      </Callout>
    </>
  )
}
