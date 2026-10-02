import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { InputMatrix } from "@/components/docs/input-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Text Area",
  description: "Multi-line text with the Input chrome.",
}

export default function TextAreaDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Text Area"
        description="Multi-line text with the same chrome and states as Input. It grows with its content and can be dragged taller from the corner."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2545:31909")} target="_blank" rel="noreferrer">
            Figma: Text Area
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>For a text area with a label inside the control and helper text, use Textarea on the Form Field page.</P>

      <H2>Variants</H2>
      <P>Size × State, at rest and on hover. Focus and Active are forced for comparison.</P>
      <InputMatrix kind="textarea" />
      <UL>
        <li>Small: 6 / 12px padding, 14px text, 72px tall. Medium: 10 / 12px padding, 16px text, 80px tall. The text area is at least 60px.</li>
        <li>Fill, borders, Focus (teal ring), Active (neutral-500 border, white 12% ring), Error (1.5px red border, red ring), Disabled and Read-only work as on Input.</li>
        <li>Expandable shows the 12px resize handle (white 10%) in the bottom-right corner; an optional 16px trailing icon sits at the top right.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Fill", "input-bg"],
          ["Border", "input-border"],
          ["Border hover / active", "input-border-hover"],
          ["Border disabled", "input-border-disabled"],
          ["Error border width", "input-border-error-width"],
          ["Active fill", "input-bg-active"],
          ["Active ring", "input-ring-active"],
          ["Placeholder", "input-placeholder"],
          ["Placeholder hover", "input-placeholder-hover"],
          ["Text", "input-text"],
          ["Resize handle", "form-field-resize-handle"],
          ["Focus ring", "focus-ring"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The sample text is white in every state, including the placeholder; the build uses the Input placeholder color (50%, 70% on hover).</li>
          <li>The text box is fixed at 60px in both sizes, so Medium (24px lines) fits two and a half lines.</li>
        </ul>
      </Callout>
    </>
  )
}
