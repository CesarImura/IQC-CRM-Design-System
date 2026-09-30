import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

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

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/pagination" />
      <P>
        The{" "}
        <Link href="/docs/components/data-table" className="text-brand underline-offset-4 hover:underline">
          Data Table
        </Link>{" "}
        already includes it. Use it on its own for lists and custom tables.
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { Pagination } from "@/components/ui/pagination"`} />
      <CodeBlock
        className="mt-3"
        code={`<Pagination
  page={page}
  pageCount={pageCount}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  totalItems={total}
/>`}
      />

      <H2>Layouts</H2>
      <UL>
        <li>
          <Code>status</Code> (default): “Page 9 of 500”. Compact, for most tables.
        </li>
        <li>
          <Code>input</Code>: type a page number and press Enter, for long result sets.
        </li>
        <li>
          <Code>pages</Code>: numbered pages with ellipses. Click an ellipsis to type a page (Figma
          “Go to”).
        </li>
      </UL>
      <ComponentPreview name="pagination-layouts" className="p-0 py-6 sm:p-0 sm:py-6" />

      <H2>Positions</H2>
      <P>
        First, Last, Only and Empty aren’t props. They come from <Code>page</Code> and{" "}
        <Code>pageCount</Code>, and the buttons that can’t be used are disabled automatically.
      </P>
      <ComponentPreview name="pagination-positions" className="p-0 py-6 sm:p-0 sm:py-6" />

      <H2>API reference</H2>
      <PropsTable
        props={[
          { name: "page", type: "number", description: "Current page, 1-based." },
          { name: "pageCount", type: "number", description: "Total pages. 0 shows the Empty position." },
          { name: "onPageChange", type: "(page: number) => void", description: "Called with the new page." },
          { name: "layout", type: '"status" | "input" | "pages"', default: '"status"', description: "Maps to the Figma Layout property." },
          { name: "pageSize / onPageSizeChange", type: "number / (size) => void", description: "Shows the items-per-page menu." },
          { name: "pageSizeOptions", type: "number[]", default: "[10, 25, 50, 100]", description: "Choices in the items-per-page menu." },
          { name: "totalItems", type: "number", description: "Shows the “1 – 25 of 63,989 items” range." },
          { name: "showFirstLast", type: "boolean", default: "true", description: "Show the first and last page buttons." },
          { name: "formatNumber", type: "(n: number) => string", default: "toLocaleString()", description: "Number formatting for the range and status." },
          { name: "labels", type: "Partial<Labels>", description: "Override the texts to translate the footer." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Layout = Status / Input / Pages", 'layout="status" | "input" | "pages"'],
          ["Position = First / Middle / Last / Only / Empty", "derived from page and pageCount"],
          ["Show page size", "pageSize + onPageSizeChange"],
          ["Show count", "totalItems"],
          ["Show first / last", "showFirstLast"],
          ["_Pagination / Item · Current", 'aria-current="page" (automatic)'],
          ["_Pagination / Item · Ellipsis → Go to", "click the ellipsis"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>Rendered as a <Code>{'<nav aria-label="Pagination">'}</Code>.</li>
        <li>The chevron buttons have names (“Previous page”…), and the current page uses <Code>aria-current</Code>.</li>
        <li>The range and status are live regions, so page changes are announced.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The items-per-page select is drawn with raw values (5% background, 10% border) instead
            of the Dropdown component. In code it opens an Option Panel-style menu, and it will switch
            to the Dropdown once that’s built.
          </li>
          <li>The page input in the Input layout uses Geist while the rest of the footer uses Geist Mono.</li>
        </ul>
      </Callout>
    </>
  )
}
