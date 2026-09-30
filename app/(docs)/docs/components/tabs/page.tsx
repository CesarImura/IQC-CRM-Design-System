import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TabsPillMatrix } from "@/components/docs/tabs-pill-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Tabs",
  description: "Switch between views. Pill tabs sit in a track; the selected one is a filled chip.",
}

export default function TabsDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Tabs"
        description="Switch between related views in the same place. Pill tabs sit in a track, and the selected tab is a filled chip. Items can have a leading icon and a trailing count."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2518:4789")} target="_blank" rel="noreferrer">
            Figma: Tabs / Pill
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="tabs-pill-demo" />

      <H2>Pill item states</H2>
      <P>Active × State, with and without the trailing count. Hover, Focus and Disabled are forced for comparison.</P>
      <TabsPillMatrix />

      <H2>Anatomy</H2>
      <UL>
        <li>Track: 4px padding, 4px between items, 1px border at white 8%, 2px radius.</li>
        <li>Item: 12 / 6px padding, 8px gap, 14px medium text, optional 16px leading icon, optional small gray Badge.</li>
        <li>Active: filled chip, white text. Inactive: transparent, text at 50%.</li>
        <li>Hover: inactive gets the hover fill and 80% text; active gets a lighter fill.</li>
        <li>Focus: 3px teal ring. Disabled: text at 32%, the active fill stays.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Track background", "tabs-pill-track-bg"],
          ["Track border", "tabs-pill-track-border"],
          ["Track padding", "tabs-pill-track-padding"],
          ["Gap between items", "tabs-pill-gap"],
          ["Radius", "tabs-pill-radius"],
          ["Item padding x / y", "tabs-pill-item-px"],
          ["", "tabs-pill-item-py"],
          ["Item gap", "tabs-pill-item-gap"],
          ["Active", "tabs-pill-item-bg-selected"],
          ["Active hover", "tabs-pill-item-bg-selected-hover"],
          ["Inactive hover", "tabs-pill-item-bg-hover"],
          ["Text active", "content-default"],
          ["Text inactive", "content-muted"],
          ["Text hover", "tabs-pill-item-content-hover"],
          ["Text disabled", "content-disabled"],
          ["Focus ring", "focus-ring"],
          ["Focus spread", "focus-spread"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Arrow keys move between tabs and select them; Tab leaves the track.</li>
        <li>Disabled tabs are skipped.</li>
        <li>Keyboard focus shows the ring; clicks don’t.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Coming next:</strong> Tabs / Line (underline tabs with Neutral, Accent, Danger,
        Warning and Info tones).
      </Callout>
    </>
  )
}
