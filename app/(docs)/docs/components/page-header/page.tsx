import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Page Header",
  description: "The title row at the top of a screen.",
}

export default function PageHeaderDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Page Header"
        description="The title row at the top of a screen: the page name, an optional info icon, and a toolbar with the page’s filters and main action."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("337:17366")} target="_blank" rel="noreferrer">
            Figma: Page Title
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="page-header-demo" className="block p-4 sm:p-6" />

      <H2>Anatomy</H2>
      <UL>
        <li>48px row: 8 / 24px padding around the 32px toolbar; title and toolbar on one row, wrapping on narrow screens.</li>
        <li>Title 20px medium, white at 70%, 1.3 line height. Optional 16px info icon at 30%, 8px away.</li>
        <li>Right side: a Toolbar without its surface (Dropdowns and a Small Primary Button).</li>
      </UL>
      <P>Pair it with the Page Grid: the header sits above the grid’s content area.</P>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Padding x / y", "page-header-px"],
          ["", "page-header-py"],
          ["Title", "page-header-title"],
          ["Info icon", "page-header-info"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> the component lives on the Utility page as “_Utility / Page Title”
        (private). It’s fixed at 48px tall with 16px vertical padding, which only fits a 32px toolbar if the padding is 8px; the build uses 8px. The title and icon colors are layer opacity (70%, 30%) on white rather than variables.
      </Callout>
    </>
  )
}
