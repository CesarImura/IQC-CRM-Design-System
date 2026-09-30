import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Pagination",
  description: "Table footer with page size, range and page controls.",
}

export default function PaginationDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Pagination"
        description="The table footer: items per page, the visible range, and controls to move between pages. Three layouts."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1400:2374")} target="_blank" rel="noreferrer">
            Figma: Pagination
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="pagination-demo" className="p-0 sm:p-0" />

      <H2>Layouts</H2>
      <UL>
        <li>Status (default): “Page 9 of 500”. Compact, for most tables.</li>
        <li>Input: type a page number, for long result sets.</li>
        <li>Pages: numbered pages with ellipses; clicking an ellipsis turns it into a page input (“Go to”).</li>
      </UL>
      <ComponentPreview name="pagination-layouts" className="p-0 py-6 sm:p-0 sm:py-6" />

      <H2>Positions</H2>
      <P>First, Last, Only and Empty follow the current page: buttons that can’t be used are disabled.</P>
      <ComponentPreview name="pagination-positions" className="p-0 py-6 sm:p-0 sm:py-6" />

      <H2>Parts</H2>
      <H3>Bar</H3>
      <UL>
        <li>48px minimum height, 24px / 8px padding, 1px top divider. Text is Geist Mono 14px.</li>
        <li>“Items per page:” in uppercase at 50% white, then the 32px select.</li>
        <li>Range “1 – 25 of 63,989 items”: numbers at 80%, words at 50%, after a 1×16 divider.</li>
        <li>Controls: 32px Secondary icon buttons, 8px apart; 16px between groups.</li>
      </UL>
      <H3>Page item</H3>
      <UL>
        <li>32×32, 8px padding, 2px radius. Default text 80% white.</li>
        <li>Hover and pressed: #141716 background. Current: #0d221c background with green text.</li>
        <li>Focus: teal ring. Disabled: 32% white. Ellipsis: 50% white; Go to: a 56px input with the teal ring.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Padding x / y", "pagination-px"],
          ["", "pagination-py"],
          ["Min height", "pagination-min-height"],
          ["Top divider", "pagination-border"],
          ["Text", "pagination-content"],
          ["Muted text", "pagination-muted"],
          ["Range divider", "pagination-divider"],
          ["Select background", "pagination-select-bg"],
          ["Select border", "pagination-select-border"],
          ["Page input background", "pagination-input-bg"],
          ["Gap between groups", "pagination-gap-controls"],
          ["Gap between buttons", "pagination-gap-buttons"],
          ["Gap in status", "pagination-gap-status"],
          ["Item size", "pagination-item-size"],
          ["Item padding", "pagination-item-padding"],
          ["Item radius", "pagination-item-radius"],
          ["Item hover / pressed", "pagination-item-bg-hover"],
          ["Current background", "pagination-item-bg-current"],
          ["Current text", "pagination-item-content-current"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Chevron buttons have names (“Previous page”…); the current page is announced.</li>
        <li>Range and status updates are announced when the page changes.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The items-per-page select uses raw values (5% background, 10% border) instead of the Dropdown component.</li>
          <li>The page input in the Input layout uses Geist while the rest of the footer uses Geist Mono.</li>
        </ul>
      </Callout>
    </>
  )
}
