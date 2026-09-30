import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { H2, P, PageHeader, UL } from "@/components/docs/typography"

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

      <H2>Tokens</H2>
      <P>Radio shares the Checkbox colors.</P>
      <TokenTable
        rows={[
          ["Border", "checkbox-border-default"],
          ["Border hover / pressed", "checkbox-border-hover"],
          ["Border disabled", "checkbox-border-disabled"],
          ["Selected", "checkbox-fill-selected"],
          ["Selected hover", "checkbox-fill-selected-hover"],
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
    </>
  )
}
