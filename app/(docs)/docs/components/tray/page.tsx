import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { TrayStatic } from "@/components/docs/tray-static"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Tray",
  description: "A right-docked panel with a record's details.",
}

export default function TrayDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Tray"
        description="A panel docked to the right edge for a record’s details, over a dimmed backdrop. Header with status, actions and tabs; sections below."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("333:6506")} target="_blank" rel="noreferrer">
            Figma: Tray
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="tray-demo" />
      <P>The same tray drawn in place:</P>
      <TrayStatic />

      <H2>Parts</H2>
      <H3>Panel</H3>
      <UL>
        <li>564px wide, full height, raised surface, 1px left border at white 8%, 24px top and bottom padding.</li>
        <li>Slides in from the right over a Default backdrop with the soft blur.</li>
      </UL>
      <H3>Header</H3>
      <UL>
        <li>Title 18px medium white; description in Geist Mono 14px at 50%. Collapse (Shrink screen) and Close (Close large) are Small Ghost icon buttons in 44px targets.</li>
        <li>Status: Status Dots 16px apart, 8px above and 16px below. Actions: Medium Primary Button and a Dropdown, 8px apart.</li>
        <li>Tabs / Line with dividers top and bottom closes the header, 16px below the actions.</li>
      </UL>
      <H3>Sections</H3>
      <UL>
        <li>Section title 16px medium, 16 / 24 / 8px padding, optional trailing actions (Dropdown, Small Button).</li>
        <li>Content inset 16px for Field Grid and Data Table, or 24px for free content.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Width", "tray-width"],
          ["Surface", "tray-surface"],
          ["Border", "tray-border"],
          ["Padding x / y", "tray-padding-x"],
          ["", "tray-padding-y"],
          ["Title", "tray-title"],
          ["Description", "tray-description"],
          ["Backdrop", "backdrop-default"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Focus moves into the tray and stays there; Esc, Close or a click on the backdrop closes it and returns focus.</li>
        <li>The header stays put while the sections scroll.</li>
        <li>Collapse is for apps that shrink the tray to a rail; it’s optional.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The header and section paddings are raw numbers; the build maps them to the space tokens (24, 16, 8).</li>
          <li>The Tray component and its header instance differ in width (564 vs 539px).</li>
          <li>The last section’s title row overlaps its content (the frame is 45px tall with a 56px title).</li>
        </ul>
      </Callout>
    </>
  )
}
