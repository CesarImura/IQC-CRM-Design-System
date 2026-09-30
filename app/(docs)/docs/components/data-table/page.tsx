import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Data Table",
  description: "The main table for dense CRM data: sorting, selection, pagination and status states.",
}

export default function DataTableDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Data Table"
        description="The main table for dense CRM data: a toolbar, sortable columns, row selection, pagination, and Empty, Loading and Error states. Grid or Compact."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("553:43416")} target="_blank" rel="noreferrer">
            Figma: Data Table
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>
        A working example: sort by clicking a header, select rows (the header checkbox turns indeterminate), and page through
        64 contacts. Cells use Value Slot, Badge and Status Dot.
      </P>
      <ComponentPreview name="data-table-demo" className="block p-0 sm:p-0" />

      <H2>Types</H2>
      <P>Grid draws every cell border, like a spreadsheet. Compact keeps only horizontal lines, for calmer lists.</P>
      <ComponentPreview name="data-table-compact" className="block p-0 sm:p-0" />

      <H2>Body states</H2>
      <P>Empty, Loading and Error replace the rows with a centered status box (441×264). Switch between them:</P>
      <ComponentPreview name="data-table-states" className="block" />

      <H2>Parts</H2>
      <H3>Header items</H3>
      <UL>
        <li>Sizes: Small 26px (8 / 4 padding), Medium 34px (12 / 8), Large 42px (16 / 12).</li>
        <li>Label 14px, 1.3 line height, 80% white; optional leading icon, sort icon and filter icon (16px, 30% white).</li>
        <li>Sort: none, ascending, descending. Clicking cycles through them.</li>
        <li>The selection column header is the Empty variant.</li>
      </UL>
      <H3>Rows and cells</H3>
      <UL>
        <li>Cells: 48px tall, 12px horizontal and 4px vertical padding, 14px text at 80% white.</li>
        <li>Grid: 1px border on every side; Compact: top and bottom only.</li>
        <li>Row hover and selected: 2% white. Keyboard focus: teal ring inside the row.</li>
        <li>Selection column: 96px with checkbox and a 32px avatar (3% white circle).</li>
      </UL>
      <H3>Footer</H3>
      <P>Pagination sits under the table; see the Pagination page for its layouts.</P>

      <H2>Tokens</H2>
      <TokenTable
        title="Table"
        rows={[
          ["Cell and header borders", "border-grid"],
          ["Header background", "table-header-bg"],
          ["Row hover / selected", "table-row-hover"],
          ["Text", "table-text"],
          ["Header icons", "table-icon"],
          ["Cell height", "table-cell-height"],
          ["Cell padding x", "table-cell-px"],
          ["Cell padding y", "table-cell-py"],
          ["Header gap", "table-header-gap"],
          ["Header Small padding x / y", "table-header-px-sm"],
          ["", "table-header-py-sm"],
          ["Header Medium padding x / y", "table-header-px-md"],
          ["", "table-header-py-md"],
          ["Header Large padding x / y", "table-header-px-lg"],
          ["", "table-header-py-lg"],
          ["Avatar background", "table-avatar-bg"],
        ]}
      />
      <TokenTable
        title="Status body"
        rows={[
          ["Box border (dashed)", "table-status-border"],
          ["Icon tile background", "table-status-media-bg"],
          ["Radius", "table-status-radius"],
          ["Title", "table-status-title"],
          ["Title, error", "table-status-title-error"],
          ["Description", "content-muted"],
          ["Body height", "table-status-min-height"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Sorted columns are announced; every checkbox has a name (“Select row”, “Select all rows on this page”).</li>
        <li>Select-all acts on the current page. Selection is kept while sorting and paging.</li>
        <li>Clickable rows can be opened with Enter.</li>
        <li>The table scrolls sideways when columns don’t fit (160px default column width).</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Not built yet:</strong> the Toolbar’s Search Bar, Dropdown, Date Picker and Toggle
        (they have their own Figma pages). The Scroll Bar uses the browser’s thin scrollbar.
      </Callout>
      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Row Focus is a 1.5px border in the same color as the cell borders, so it’s nearly invisible; the build uses the teal ring.</li>
          <li>The Loading body reuses the info icon; the build shows the loading indicator.</li>
          <li>Header Items Large is 42px, but the Data Table frame stretches the header to 48px.</li>
          <li>Header and row backgrounds, header icon opacity and the status box colors are raw values.</li>
        </ul>
      </Callout>
    </>
  )
}
