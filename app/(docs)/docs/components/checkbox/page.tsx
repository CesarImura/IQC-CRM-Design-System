import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Checkbox",
  description: "Select one or more options, including partial selection.",
}

export default function CheckboxDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Checkbox"
        description="Lets users select one or more options. Checked, unchecked and indeterminate (partial) selection. The whole 40px row, label included, is clickable."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("660:18085")} target="_blank" rel="noreferrer">
            Figma: Checkbox
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="checkbox-demo" />

      <H2>States</H2>
      <P>Selection × interaction. Hover, press and Tab through them for the interactive states.</P>
      <ComponentPreview name="checkbox-states" align="start" />

      <H2>Indeterminate</H2>
      <P>A parent checkbox shows indeterminate when only some children are selected, like select-all in a table.</P>
      <ComponentPreview name="checkbox-group" align="start" />

      <H2>Anatomy</H2>
      <UL>
        <li>Control: 20×20, 4px radius, 1px border.</li>
        <li>Checkmark 18px in the canvas color; indeterminate mark 12×2 with 1px radius.</li>
        <li>Label: 16/24 regular at 80% white, 12px after the control; the row has 8px vertical hit padding.</li>
      </UL>

      <H2>States</H2>
      <UL>
        <li>Unchecked: 40% white border. Hover, pressed and focus: 64% border (no fill).</li>
        <li>Checked / indeterminate: green fill. Hover and pressed keep the fill and add a 64% border.</li>
        <li>Focus: teal ring around the whole row; on checked controls the border turns black.</li>
        <li>Disabled: unchecked gets a 16% border; checked / indeterminate get a neutral white 4% fill with a 50% white mark. Label at 32%.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Radius", "checkbox-radius-control"],
          ["Border width", "checkbox-stroke-default"],
          ["Label gap", "checkbox-label-gap"],
          ["Row hit padding", "checkbox-hit-padding"],
          ["Border", "checkbox-border-default"],
          ["Border hover / pressed / focus", "checkbox-border-hover"],
          ["Border disabled", "checkbox-border-disabled"],
          ["Checked fill (all interactions)", "checkbox-fill-selected"],
          ["Checked disabled fill", "checkbox-fill-disabled"],
          ["Checkmark", "checkbox-icon-on-selected"],
          ["Checkmark disabled", "checkbox-icon-disabled"],
          ["Focus border on fill", "focus-stroke-on-fill"],
          ["Label", "checkbox-label-default"],
          ["Label disabled", "content-disabled"],
          ["Focus ring", "focus-ring"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Clicking the label toggles it; Space toggles when focused.</li>
        <li>Indeterminate is announced as “mixed”.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma note:</strong> in the Focus variants the row gains 8px of side padding, which
        would shift the layout; the build draws the ring outside the row instead.
      </Callout>
    </>
  )
}
