import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { SideMenuLinkMatrix } from "@/components/docs/side-menu-link-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Navigation",
  description: "Side Menu, Sub Menu and Top Menu: the app's shell navigation.",
}

export default function NavigationDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Navigation"
        description="The app’s shell: a Top Menu bar, the Side Menu rail (expanded or icon-only) and an optional Sub Menu for nested pages."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("132:2513")} target="_blank" rel="noreferrer">
            Figma: Side Menu
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="navigation-demo" className="block p-4 sm:p-6" />

      <H2>Link</H2>
      <P>_Side Menu / Link: State, in the expanded and collapsed rail.</P>
      <SideMenuLinkMatrix />
      <UL>
        <li>44px row, 6 / 12px padding, 12px between the 24px icon and the 16px label, 2px radius.</li>
        <li>Default: label at 90%. Hover: white 2% fill. Active: white 4% fill, medium accent label. Focus: 3px teal ring. Disabled: 32%.</li>
        <li>Collapsed: a 40px icon-only square; the label becomes its accessible name and tooltip.</li>
      </UL>

      <H2>Parts</H2>
      <H3>Side Menu</H3>
      <UL>
        <li>320px expanded, 56px collapsed; canvas background, 1px right border at white 10%, 16 / 8px padding.</li>
        <li>Sections of links 4px apart, separated by 1px rules at white 10%, 8px apart.</li>
      </UL>
      <H3>Sub Menu</H3>
      <UL>
        <li>320px secondary rail: title 18px medium at 70% (16 / 24px padding), then groups with a top rule.</li>
        <li>Group label in Geist Mono 14px at 50%; links without icons, 16px side padding.</li>
      </UL>
      <H3>Top Menu</H3>
      <UL>
        <li>56px bar, 8px padding, canvas background, 1px bottom border at white 10%.</li>
        <li>Left: brand mark and Breadcrumb, 12px apart. Right: Search Bar and Secondary icon buttons (Notification, Settings), 8px apart.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Surface", "nav-surface"],
          ["Borders and rules", "nav-border"],
          ["Width / collapsed", "nav-width"],
          ["", "nav-width-collapsed"],
          ["Rail padding x / y", "nav-padding-x"],
          ["", "nav-padding-y"],
          ["Rail gap / section gap", "nav-gap"],
          ["", "nav-section-gap"],
          ["Link height", "nav-link-hit"],
          ["Link padding x / y", "nav-link-px"],
          ["", "nav-link-py"],
          ["Link gap", "nav-link-gap"],
          ["Link icon", "nav-link-icon"],
          ["Link hover / active fill", "nav-link-bg-hover"],
          ["", "nav-link-bg-active"],
          ["Link label / active / disabled", "nav-link-content"],
          ["", "nav-link-content-active"],
          ["", "nav-link-content-disabled"],
          ["Sub Menu title", "nav-title"],
          ["Sub Menu group label", "nav-section-label"],
          ["Top Menu height", "top-menu-height"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The current page link carries aria-current=“page”. Links are real links, so they open in a new tab with a modifier key.</li>
        <li>Disabled links are skipped by Tab and can’t be clicked.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Rail borders and dividers are raw white 10% (a divider line at 10% layer opacity), not a variable.</li>
          <li>The default label is white at 90% layer opacity, while Navigation/content/default is pure white.</li>
          <li>Sub Menu links pad 16px instead of the Link’s 12px; the collapsed Link is 40px, under the 44px hit target the description asks for.</li>
          <li>The Top Menu brand mark is a placeholder group (logo tile + wordmark), not a component.</li>
        </ul>
      </Callout>
    </>
  )
}
