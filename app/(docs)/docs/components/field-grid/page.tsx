import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FieldGridMatrix, FieldGridRowMatrix } from "@/components/docs/field-grid-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Field Grid",
  description: "Label / value rows for a record's details, with copy.",
}

export default function FieldGridDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Field Grid"
        description="A record’s details as label / value rows. Hover a row to copy its value; it confirms with “Copied” for a moment."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("320:15711")} target="_blank" rel="noreferrer">
            Figma: Field Grid
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="field-grid-demo" />

      <H2>Row</H2>
      <P>State × Label width. Hover, Focus and Copied are forced here; in the demo they’re live.</P>
      <FieldGridRowMatrix />
      <UL>
        <li>44px tall, 16px left padding, a 1px grid line under each row.</li>
        <li>Label 14px in content/tertiary (#a8a9a9), in a 160px (or 120px) column. Value 14px white; any Value Slot works. Optional small Badge after it.</li>
        <li>Hover and focus: white 2% fill and the Secondary copy button (32px, in a 44px target). Copied: a Primary “Copied” button with a checkmark for 1.5s.</li>
      </UL>

      <H2>Grid</H2>
      <FieldGridMatrix />
      <H3>States</H3>
      <UL>
        <li>Read Only: the same rows without copy buttons or hover.</li>
        <li>Empty and Error: the rows are replaced by the Empty component (Outline) with 24px padding.</li>
        <li>Columns: rows flow into columns 24px apart.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Row height", "field-grid-row-height"],
          ["Row left padding", "field-grid-row-px"],
          ["Row hover", "field-grid-row-bg-hover"],
          ["Divider", "field-grid-divider"],
          ["Gap", "field-grid-gap"],
          ["Column gap", "field-grid-column-gap"],
          ["Label width / narrow", "field-grid-label-width"],
          ["", "field-grid-label-width-narrow"],
          ["Label", "field-grid-label"],
          ["Value", "field-grid-value"],
          ["Copy target", "field-grid-action-hit"],
          ["Empty / Error padding", "field-grid-state-padding"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The copy button is reachable with Tab even while hidden; focusing it shows it. The “Copied” confirmation is announced.</li>
        <li>Long values truncate with an ellipsis; the full text is copied.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Columns = 3 shows two columns. The build lays rows out in 1, 2 or 3 columns, depending on the screen width.</li>
          <li>The description mentions a Loading state, but the set has none.</li>
          <li>The row divider is a raw #1e2120 (the border/grid value) instead of the variable.</li>
          <li>The Default row reserves a 96px area for the hidden copy button, so the content area changes width between states.</li>
        </ul>
      </Callout>
    </>
  )
}
