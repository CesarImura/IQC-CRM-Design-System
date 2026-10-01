import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TabsLineMatrix } from "@/components/docs/tabs-line-matrix"
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
        description="Switch between related views in the same place. Pill tabs sit in a track with a filled chip for the selected one; Line tabs underline the selected one in a tone color. Items can have a leading icon and a trailing count."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2518:4789")} target="_blank" rel="noreferrer">
            Figma: Tabs / Pill
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("288:12896")} target="_blank" rel="noreferrer">
            Tabs / Line
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

      <H2>Tabs / Line</H2>
      <P>Underline tabs for page sections and record views. The tone recolors the icon, the count and the underline.</P>
      <ComponentPreview name="tabs-line-demo" className="block p-0 sm:p-0" />
      <TabsLineMatrix />
      <UL>
        <li>Bar: 24px side padding, items 10px apart, #2b2828 divider on the bottom (or top and bottom).</li>
        <li>Item: 8 / 16px padding, 14px medium; inactive label at 40%, hover at 80% with a soft fill.</li>
        <li>Active: white label, 1px underline in the tone color; 2px on hover.</li>
        <li>Tones: Neutral (50% white), Accent (green), Danger (red), Warning (yellow), Info (blue). Counts use the matching Badge.</li>
        <li>Focus: 3px teal ring. Disabled: label at 32%, icon and count dimmed.</li>
      </UL>
      <TokenTable
        title="Tabs / Line"
        rows={[
          ["Divider", "tabs-line-divider"],
          ["Bar padding x", "tabs-line-bar-px"],
          ["Gap", "tabs-line-gap"],
          ["Item padding x / y", "tabs-line-item-px"],
          ["", "tabs-line-item-py"],
          ["Underline", "tabs-line-stroke"],
          ["Underline, hover", "tabs-line-stroke-hover"],
          ["Hover fill", "tabs-line-hover-bg"],
          ["Label, active", "tabs-line-label"],
          ["Label, inactive", "tabs-line-label-inactive"],
          ["Label, hover", "tabs-line-label-hover"],
          ["Neutral", "tabs-line-tone-neutral"],
          ["Accent", "tabs-line-tone-accent"],
          ["Danger", "tabs-line-tone-danger"],
          ["Warning", "tabs-line-tone-warning"],
          ["Info", "tabs-line-tone-info"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes (Line):</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The bar divider uses #2b2828, a warm gray that doesn’t match border-grid (#1e2120) used everywhere else.</li>
          <li>The bar has spacing/bar-gap 20px, but the slot inside uses a raw 10px gap.</li>
          <li>Inactive labels are content/muted plus 80% layer opacity (≈40%) instead of a single variable.</li>
        </ul>
      </Callout>
    </>
  )
}
