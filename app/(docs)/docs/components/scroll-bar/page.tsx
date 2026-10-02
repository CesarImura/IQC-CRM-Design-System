import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ScrollBarMatrix } from "@/components/docs/scroll-bar-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Scroll Bar",
  description: "The overlay scroll bar for panels, lists and tables.",
}

export default function ScrollBarDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Scroll Bar"
        description="A thin overlay thumb for scrollable panels, lists and tables. It thickens and brightens when you hover or drag it."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1436:2369")} target="_blank" rel="noreferrer">
            Figma: Scroll Bar
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Scroll, hover and drag the thumbs.</P>
      <ComponentPreview name="scroll-area-demo" />

      <H2>Variants</H2>
      <ScrollBarMatrix />
      <UL>
        <li>White thumb at 40%; 64% on hover; 88% while dragging. 1px radius.</li>
        <li>8px thick, 12px on hover and drag. The track is invisible and runs along the whole edge.</li>
        <li>Thumb length follows the visible share of the content; its position follows the scroll offset.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Thumb", "scroll-bar-thumb"],
          ["Opacity default / hover / drag", "scroll-bar-opacity"],
          ["", "scroll-bar-opacity-hover"],
          ["", "scroll-bar-opacity-drag"],
          ["Thickness / hover", "scroll-bar-size"],
          ["", "scroll-bar-size-hover"],
          ["Radius", "scroll-bar-radius"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Scrolling stays native (wheel, trackpad, keyboard, touch); only the bar is drawn by the component.</li>
        <li>By default the bar shows while you hover the area; use “always” for lists where the overflow must be obvious.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> the thumb color borrows the Badge white content variable, and the
        opacities are layer opacity rather than variables.
      </Callout>
    </>
  )
}
