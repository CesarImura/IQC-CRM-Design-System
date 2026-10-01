import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { DropdownMatrix } from "@/components/docs/dropdown-matrix"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Dropdown",
  description: "Compact menu for filters and actions: a Trigger that opens the Option Panel.",
}

export default function DropdownDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Dropdown"
        description="A compact menu for toolbars, filters and row actions. The Trigger hugs its content and the Option Panel opens at a fixed width, aligned to the trigger’s left or right edge. Also comes as an icon-only button."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1541:7655")} target="_blank" rel="noreferrer">
            Figma: Dropdown
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("1284:4339")} target="_blank" rel="noreferrer">
            Icon Only
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>A multi-select filter (left aligned), a single choice (right aligned), and an icon-only actions menu.</P>
      <ComponentPreview name="dropdown-demo" className="items-start" />

      <H2>All variants</H2>
      <H3>Dropdown</H3>
      <DropdownMatrix />
      <H3>Icon Only</H3>
      <DropdownMatrix iconOnly />

      <H2>Anatomy</H2>
      <UL>
        <li>Label (14/21 white) 4px above the Trigger; the Trigger hugs “value + chevron”.</li>
        <li>Option Panel 8px below, 303px wide (242px for Icon Only), left- or right-aligned to the trigger.</li>
        <li>Icon Only: 32px (40px Medium) square Trigger with a 16px icon, usually ⋮.</li>
        <li>Trigger states are the same as Trigger; panel items are the same as Option Panel.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Panel width", "dropdown-panel-width"],
          ["Panel width, Icon Only", "dropdown-panel-width-icon"],
          ["Trigger → panel", "combobox-panel-offset"],
          ["Label → trigger", "combobox-label-gap"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Opens on click, Enter, Space or ↓; ↑ ↓ move, Enter picks, Esc closes and returns focus.</li>
        <li>Multi-select keeps the panel open; single choice closes it.</li>
        <li>Icon Only has no visible label, so its label becomes the button’s accessible name.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Focus and Error triggers are wider than Default (152 vs 128px) even though the content is the same.</li>
          <li>The Icon Only trigger layer is named “Calendar” but shows Overflow menu vertical.</li>
          <li>Checkbox items show an empty checkbox in every example; there’s no selected example.</li>
        </ul>
      </Callout>
    </>
  )
}
