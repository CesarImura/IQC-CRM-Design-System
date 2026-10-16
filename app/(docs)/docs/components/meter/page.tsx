import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Meter",
  description: "A gauge of radial ticks for one value against a limit, like daily drawdown or a profit target.",
}

export default function MeterDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Meter"
        description="One value against a limit, drawn as a 200° arc of radial ticks with the amount in the middle. Ticks up to the value take the tone color; the rest stay as the track."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("3391:185")} target="_blank" rel="noreferrer">
            Figma: Meter
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Account limits. Simulate session changes the values: the ticks light up one after another.</P>
      <ComponentPreview name="meter-demo" className="block p-4 sm:p-6" />

      <H2>Values and tones</H2>
      <P>The value is a percentage of the limit, rounded to the nearest tick (56 ticks, so about 1.8% each).</P>
      <ComponentPreview name="meter-values" className="p-4 sm:p-6" />
      <UL>
        <li>
          <strong className="text-white">Positive</strong> (green): progress you want, like a profit target.{" "}
          <strong className="text-white">Warning</strong> (yellow): a limit being used up, like daily drawdown.{" "}
          <strong className="text-white">Negative</strong> (red): close to breaking a rule.
        </li>
        <li>Pick the tone per metric. The meter doesn’t switch tone on its own as the value grows.</li>
      </UL>

      <H2>Parts</H2>
      <H3>Gauge</H3>
      <UL>
        <li>190 × 114px. 56 ticks over 200°, from 10° below the left side to 10° below the right.</li>
        <li>Each tick 3px wide and 22.8px long (outer radius 95, inner 72.2), flat ends.</li>
        <li>Value 22px medium white, centered 74px from the top, so longer amounts still fit inside the arc.</li>
      </UL>
      <H3>Card</H3>
      <UL>
        <li>Chart card surface, 20px padding. Title 15px medium white with an optional Badge at the end.</li>
        <li>Under the gauge: a caption at 14px and a meta line at 12px, centered, 2px apart.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Track", "chart-meter-track"],
          ["Positive", "chart-meter-positive"],
          ["Warning", "chart-meter-warning"],
          ["Negative", "chart-meter-negative"],
          ["Tick width", "chart-meter-tick-width"],
          ["Value", "chart-meter-value"],
          ["Caption", "chart-meter-caption"],
          ["Meta", "chart-meter-meta"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Track, caption and meta use the platform file’s surface/05, text/02 and text/03, which have no match in the DS primitives yet; the tokens hold their hex values.</li>
          <li>In Figma the ticks are 56 rectangles inside the Gauge frame; it isn’t a component with a value property yet.</li>
        </ul>
      </Callout>
    </>
  )
}
