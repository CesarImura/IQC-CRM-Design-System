import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Selection Bar",
  description: "Bulk actions bar shown while table rows are selected.",
}

export default function SelectionBarDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Selection Bar"
        description="Appears while rows are selected: the count on the left, bulk actions and Clear on the right. The actions change per screen."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2831:4830")} target="_blank" rel="noreferrer">
            Figma: Selection Bar
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="selection-bar-demo" className="block" />

      <H2>With a table</H2>
      <P>Select rows: the bar slides in with the count. Clear, or unchecking every row, slides it out.</P>
      <ComponentPreview name="selection-bar-table" className="block" />

      <H2>Anatomy</H2>
      <UL>
        <li>Raised surface, 1px #2b2828 border, 24 / 16px padding.</li>
        <li>Count: 14px medium white, e.g. “8 selected”.</li>
        <li>Actions: Small Buttons and Dropdowns, 8px apart. Destructive actions use Danger.</li>
        <li>A 1×16 divider, then Clear (Ghost button), 12px apart.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Background", "surface-raised"],
          ["Border / divider", "border-panel"],
          ["Padding x / y", "selection-bar-px"],
          ["", "selection-bar-py"],
          ["Gap (actions, divider, Clear)", "selection-bar-gap"],
          ["Gap between actions", "button-spacing-gap"],
          ["Count", "selection-bar-label"],
          ["Slide in / out", "selection-bar-motion"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Shows while at least one row is selected; slides up 8px and fades in (180ms), and the reverse when cleared. No motion with reduced motion on.</li>
        <li>The count is announced as it changes. Clear unselects every row.</li>
        <li>Leave Clear off when the screen dismisses the selection another way.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The bar has no corner radius while the cards and table around it have 2–4px.</li>
          <li>Labels inside the Export and Clear instances are at 70% opacity, unlike the Button component itself; the build uses the regular Buttons.</li>
          <li>There’s no spec for where the bar sits (above the table, sticky, or floating) or for its motion.</li>
        </ul>
      </Callout>
    </>
  )
}
