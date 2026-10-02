import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { RadioMatrix } from "@/components/docs/radio-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Radio Group",
  description: "One exclusive choice from a short list.",
}

export default function RadioGroupDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Radio Group"
        description="One exclusive choice from a short list. Each option has a label and an optional description, and the whole row is clickable."
      />

      <ComponentPreview name="radio-group-demo" />

      <P>
        For a group with a caption, helper text and warning, error, disabled or read-only states, see Radio group on the Form
        Field page.
      </P>

      <H2>Variants</H2>
      <P>The Figma matrix: Selection × Interaction, with Hover, Focus and Pressed forced.</P>
      <RadioMatrix />
      <UL>
        <li>Unselected: 40% ring; 64% on hover and pressed, plus an 8% fill when pressed.</li>
        <li>Selected: accent ring and a 10px accent dot, no fill. It looks the same in Hover, Focus and Pressed.</li>
        <li>Disabled: 16% ring when unselected; ring and dot at accent 16% when selected. Label at 32%.</li>
        <li>Label: 14px medium at 80%, 12px from the control. Rows are 37px (8px top and bottom).</li>
      </UL>

      <H2>Tokens</H2>
      <P>Radio shares the Checkbox borders and label color, plus a few radio tokens.</P>
      <TokenTable
        rows={[
          ["Border", "checkbox-border-default"],
          ["Border hover / pressed", "checkbox-border-hover"],
          ["Border disabled", "checkbox-border-disabled"],
          ["Pressed fill", "checkbox-fill-neutral-pressed"],
          ["Selected ring", "radio-border-selected"],
          ["Selected dot", "radio-dot-selected"],
          ["Dot size", "radio-dot-size"],
          ["Selected disabled", "radio-selected-disabled"],
          ["Label", "checkbox-label-default"],
          ["Description", "content-muted"],
          ["Disabled text", "content-disabled"],
          ["Focus ring", "focus-ring"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Arrow keys move and select; Tab leaves the group.</li>
        <li>Keyboard focus rings the whole row, as in the Figma Focus variant, without moving the layout.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Selected disabled uses a raw accent 16% (#12f0b429) instead of a variable; Checkbox uses accent 32% for its old disabled fill.</li>
          <li>The selected ring is bound to Semantic accent while the dot uses Checkbox fill/selected. Both are the same color.</li>
          <li>Unselected controls keep a hidden canvas-colored dot.</li>
        </ul>
      </Callout>
    </>
  )
}
