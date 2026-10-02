import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { ToggleMatrix } from "@/components/docs/toggle-matrix"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Toggle",
  description: "An on / off switch for settings that apply right away.",
}

export default function ToggleDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Toggle"
        description="An on / off switch for settings that take effect right away. Optional label and description; the whole row is clickable."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("343:19412")} target="_blank" rel="noreferrer">
            Figma: Toggle
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="toggle-demo" align="start" />
      <P>For a toggle with a caption, helper text and warning, error or read-only states, see Toggle on the Form Field page.</P>

      <H2>Variants</H2>
      <P>The Figma matrix: Active × State, with Hover, Focus and Pressed forced.</P>
      <ToggleMatrix />
      <UL>
        <li>Track 32 × 18, fully rounded, 2px padding, 1px border. Thumb 12px.</li>
        <li>Off: 40% ring, white thumb on the left. Hover and pressed: 64% ring and a 2% fill. Focus: canvas fill and the 3px teal ring.</li>
        <li>On: accent ring, accent thumb on the right, 8% accent fill; 16% on hover, 24% pressed.</li>
        <li>Disabled: off has a 16% ring; on has an accent 32% fill and ring. The thumb is white at 32%, and the label and description go to 32%.</li>
        <li>Label 14px medium at 80%, description 12px at 50%, 2px apart; 8px from the switch.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Switch"
        rows={[
          ["Track size", "toggle-track-width"],
          ["", "toggle-track-height"],
          ["Track padding", "toggle-track-padding"],
          ["Thumb", "toggle-thumb-size"],
          ["Off border", "toggle-track-off-border"],
          ["Off border hover / pressed", "toggle-track-off-border-hover"],
          ["Off border disabled", "toggle-track-off-border-disabled"],
          ["Off fill hover / pressed", "toggle-track-off-bg-hover"],
          ["Off fill focus", "toggle-track-off-bg-focus"],
          ["On border", "toggle-track-on-border"],
          ["On fill", "toggle-track-on-fill"],
          ["On fill hover", "toggle-track-on-fill-hover"],
          ["On fill pressed", "toggle-track-on-fill-pressed"],
          ["On disabled", "toggle-track-on-fill-disabled"],
          ["Thumb off", "toggle-thumb-off"],
          ["Thumb on", "toggle-thumb-on"],
          ["Thumb disabled", "toggle-thumb-disabled"],
          ["Focus ring", "focus-ring"],
        ]}
      />
      <TokenTable
        title="Label"
        rows={[
          ["Switch → label", "toggle-row-gap"],
          ["Label → description", "toggle-copy-gap"],
          ["Label", "toggle-label"],
          ["Description", "toggle-description"],
          ["Disabled text", "content-disabled"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Space toggles it; clicking the label toggles it too. Screen readers announce it as a switch, on or off.</li>
        <li>The thumb slides in 150ms; no motion with reduced motion on.</li>
        <li>Use it for settings that apply immediately. For choices saved with a form, prefer a Checkbox.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The disabled on thumb is white 32% in _Toggle / Switch but accent 32% in the Toggle variant. The build follows the Switch.</li>
          <li>Off Pressed looks the same as Off Hover.</li>
          <li>The Focus off fill uses the raw neutral-950 primitive instead of a Toggle variable.</li>
          <li>The switch sits at the top of the row (aligned to the label’s first line), not centered.</li>
        </ul>
      </Callout>
    </>
  )
}
