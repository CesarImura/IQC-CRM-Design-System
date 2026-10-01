import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { TooltipMatrix } from "@/components/docs/tooltip-matrix"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Tooltip",
  description: "Short help on hover or focus: a white bubble with a caret.",
}

export default function TooltipDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Tooltip"
        description="Short help for icon buttons and dense UI: a white bubble with a caret, above, below, left or right of its trigger. Optional leading icon and close button. No color variants."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2837:4852")} target="_blank" rel="noreferrer">
            Figma: Tooltip
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Hover or Tab to the buttons. “What’s new” has a close button, so it opens on click and stays until you close it.</P>
      <ComponentPreview name="tooltip-demo" />

      <H2>All variants</H2>
      <TooltipMatrix />

      <H2>Anatomy</H2>
      <H3>Bubble</H3>
      <UL>
        <li>White fill, 4px radius, 10 / 6px padding, 6px gap.</li>
        <li>Text 14/18 regular, black. Icon and close 16px in #161616.</li>
      </UL>
      <H3>Caret</H3>
      <UL>
        <li>12×7 triangle in the bubble color, centered on the side facing the trigger.</li>
        <li>4px between the caret tip and the trigger.</li>
      </UL>

      <H2>Where it’s used</H2>
      <UL>
        <li>Info icons in the Stat Card and chart headers (Line Chart, Ring Chart) show their text in this tooltip.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Fill", "tooltip-bg"],
          ["Text", "tooltip-content"],
          ["Icon / close", "tooltip-icon"],
          ["Padding x / y", "tooltip-px"],
          ["", "tooltip-py"],
          ["Gap", "tooltip-gap"],
          ["Radius", "tooltip-radius"],
          ["Text size / line height", "tooltip-font"],
          ["", "tooltip-line-height"],
          ["Caret width / height", "tooltip-caret-width"],
          ["", "tooltip-caret-height"],
          ["Offset from trigger", "tooltip-offset"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Opens after 300ms on hover, right away on keyboard focus; closes on leave, blur or Esc.</li>
        <li>Flips to the other side when there’s no room, and stays 8px inside the window.</li>
        <li>The tooltip describes its trigger for screen readers. Icon buttons still need their own label.</li>
        <li>With a close button the tooltip is interactive, so it opens on click (a toggletip) and the × is reachable with Tab.</li>
        <li>Keep it to a few words. Don’t put links or essential information in a tooltip.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The gap between the caret and the trigger isn’t specified; the build uses 4px.</li>
          <li>The icon and close are #161616 (not a variable) while the text uses the black variable.</li>
          <li>A tooltip with a close button can’t open on hover; the build turns it into a click-to-open toggletip.</li>
          <li>The text size borrows badge-font-md (14px) instead of a typography variable.</li>
        </ul>
      </Callout>
    </>
  )
}
