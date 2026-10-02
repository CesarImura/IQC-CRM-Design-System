import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Toolbar",
  description: "Filters and actions above a table or list.",
}

export default function ToolbarDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Toolbar"
        description="Filters on one side and actions on the other, above a table or list. Horizontal, or stacked when space is tight."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("343:24907")} target="_blank" rel="noreferrer">
            Figma: Toolbar
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Horizontal (top) and Vertical (bottom). The filter bar wraps when it runs out of room.</P>
      <ComponentPreview name="toolbar-demo" className="block p-4 sm:p-6" />

      <H2>Anatomy</H2>
      <UL>
        <li>Raised surface, 1px border at white 8%, 16 / 24px padding, 8px between everything.</li>
        <li>Filter bar: any mix of Search Bar, Secondary icon buttons, Dropdowns, Date Picker and Toggle, wrapping onto new lines.</li>
        <li>Divider: a 1px rule at white 8% with 8px either side, as tall as the row, to separate filter groups.</li>
        <li>Actions: usually a Dropdown and a Small Primary Button, at the end of the row (Horizontal) or under the filters (Vertical).</li>
        <li>Inside a Page Header the toolbar drops its surface and padding.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Surface", "toolbar-surface"],
          ["Border", "toolbar-border"],
          ["Padding x / y", "toolbar-px"],
          ["", "toolbar-py"],
          ["Gap", "toolbar-gap"],
          ["Divider", "toolbar-divider"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Padding and gap are raw numbers; the build maps them to the matching space tokens (24, 16, 8).</li>
          <li>The divider is as tall as the tallest control (41px next to a Toggle with a description), so its height changes with the content.</li>
        </ul>
      </Callout>
    </>
  )
}
