import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Breadcrumb",
  description: "Shows where the current page sits in the hierarchy and links back to its ancestors.",
}

export default function BreadcrumbDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Breadcrumb"
        description="Shows where the current page sits in the hierarchy, links back to its ancestors, and can collapse middle levels into a menu."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("712:2360")} target="_blank" rel="noreferrer">
            Figma: Breadcrumb
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Full path</H2>
      <P>Ancestors as links, collapsed middle levels behind “…”, and the current page last. Open the “…” to see the Option Panel.</P>
      <ComponentPreview name="breadcrumb-demo" />

      <H2>Direct path</H2>
      <P>One level deep: the parent and the current page.</P>
      <ComponentPreview name="breadcrumb-direct" />

      <H2>Long labels</H2>
      <P>Labels are cut off with an ellipsis at 200px; the full name shows on hover.</P>
      <ComponentPreview name="breadcrumb-truncation" />

      <H2>Parts and states</H2>
      <H3>Item</H3>
      <UL>
        <li>Link: 50% white, white on hover, focus and pressed.</li>
        <li>Current: 80% white, not a link.</li>
        <li>Separator: “/” at 24% white, 8px after the item.</li>
      </UL>
      <H3>Overflow</H3>
      <UL>
        <li>Closed: “…” at 50% white; hover and pressed turn it white and underlined.</li>
        <li>Open: 5% white background, with the Option Panel 8px below, 220px wide.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Item"
        rows={[
          ["Link", "breadcrumb-text-link-default"],
          ["Link hover / focus / pressed", "breadcrumb-text-link-hover"],
          ["Current page", "breadcrumb-text-current"],
          ["Separator", "breadcrumb-text-separator"],
          ["Focus background", "breadcrumb-surface-focus"],
          ["Pressed background", "breadcrumb-surface-pressed"],
          ["Overflow open / pressed", "breadcrumb-surface-open"],
          ["Hit padding", "breadcrumb-hit-padding"],
          ["Corner radius", "breadcrumb-radius-control"],
          ["Item → separator gap", "breadcrumb-item-gap"],
          ["Max label width", "breadcrumb-item-max-width"],
        ]}
      />
      <TokenTable
        title="Option Panel (overflow menu)"
        rows={[
          ["Background", "option-panel-bg"],
          ["Border", "option-panel-border"],
          ["Radius", "option-panel-radius"],
          ["Padding", "option-panel-padding"],
          ["Width", "option-panel-width"],
          ["Item text", "option-item-content"],
          ["Item hover", "option-item-bg-hover"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>It’s a navigation landmark; the current page is announced as the current page.</li>
        <li>The “…” menu opens with click, Enter or Space; arrows move, Escape closes and returns focus.</li>
        <li>Keyboard focus shows the teal ring; pointer clicks don’t.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The “…” underlines on hover but ancestor links don’t.</li>
          <li>The Option Panel surfaces and the open “…” background use raw values instead of variables.</li>
          <li>The pressed background equals the canvas color, so pressed looks like hover.</li>
        </ul>
      </Callout>
    </>
  )
}
