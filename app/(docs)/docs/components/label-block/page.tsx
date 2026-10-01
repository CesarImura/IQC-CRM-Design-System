import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Label Block",
  description: "Label and optional description above a control.",
}

export default function LabelBlockDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Label Block"
        description="The label (and an optional description) that sits above Date Picker, Dropdown and other controls. Default or Disabled; label and description can each be hidden."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1525:2375")} target="_blank" rel="noreferrer">
            Figma: _Label Block
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Label + Description, Label only, Description only; Default on top, Disabled below.</P>
      <ComponentPreview name="label-block-demo" />

      <H2>Anatomy</H2>
      <UL>
        <li>Label: 14px medium at 80%. Description: 12px regular at 50%. 2px apart.</li>
        <li>4px between the block and the control below it.</li>
        <li>Disabled: both at 32%.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Label", "label-block-label"],
          ["Description", "label-block-description"],
          ["Disabled", "content-disabled"],
          ["Label → description", "label-block-gap"],
          ["Block → control", "label-block-control-gap"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>When it labels a control, the label is a real label: clicking it focuses the control.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> the Combo Box and Dropdown instances override the label to white
        (14/21) instead of the block’s 80%, so the same label looks different above a Select and above a Date Picker.
      </Callout>
    </>
  )
}
