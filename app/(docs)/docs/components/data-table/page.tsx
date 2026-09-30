import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Data Table",
  description: "The main table for dense CRM data: sorting, selection, pagination and status states.",
}

const link = "text-brand underline-offset-4 hover:underline"

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

      <ComponentPreview name="data-table-demo" className="block p-0 sm:p-0" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/data-table" />
      <P>
        Adds <Code>data-table</Code>, the <Code>table</Code> primitives,{" "}
        <Link href="/docs/components/checkbox" className={link}>Checkbox</Link>,{" "}
        <Link href="/docs/components/pagination" className={link}>Pagination</Link> and{" "}
        <Link href="/docs/components/button" className={link}>Button</Link>, and installs{" "}
        <Code>@tanstack/react-table</Code> (v9). For cell content, add{" "}
        <Link href="/docs/components/value-slot" className={link}>Value Slot</Link>,{" "}
        <Link href="/docs/components/badge" className={link}>Badge</Link> and{" "}
        <Link href="/docs/components/status-dot" className={link}>Status Dot</Link>.
      </P>

      <H2>Usage</H2>
      <P>Define columns with the typed helper, then pass them with your data.</P>
      <CodeBlock
        code={`import { createDataTableColumnHelper, DataTable } from "@/components/ui/data-table"
import { ValueText, ValueLink } from "@/components/ui/value-slot"

type Contact = { id: string; name: string; email: string }

const col = createDataTableColumnHelper<Contact>()
const columns = col.columns([
  col.accessor("name", { header: "Name", cell: (i) => <ValueText>{i.getValue()}</ValueText> }),
  col.accessor("email", {
    header: "Email",
    cell: (i) => <ValueLink href={\`mailto:\${i.getValue()}\`}>{i.getValue()}</ValueLink>,
  }),
])

export function Contacts({ data }: { data: Contact[] }) {
  return <DataTable columns={columns} data={data} getRowId={(row) => row.id} enableRowSelection />
}`}
      />
      <P>
        Define <Code>columns</Code> outside the component or in <Code>useMemo</Code>, so the table
        doesn’t rebuild on every render.
      </P>

      <H2>Variants</H2>
      <P>
        <Code>grid</Code> (default) draws every cell border, like a spreadsheet. <Code>compact</Code>{" "}
        keeps only horizontal lines, for calmer lists. <Code>size</Code> sets the header density:{" "}
        <Code>sm</Code>, <Code>md</Code> or <Code>lg</Code>.
      </P>
      <ComponentPreview name="data-table-compact" className="block p-0 sm:p-0" />

      <H2>Empty, Loading and Error</H2>
      <P>
        An empty <Code>data</Code> array shows Empty automatically. Set <Code>status</Code> to{" "}
        <Code>&quot;loading&quot;</Code> or <Code>&quot;error&quot;</Code> while fetching, and pass{" "}
        <Code>onRetry</Code> to show “Try again”. The texts and actions can be overridden.
      </P>
      <ComponentPreview name="data-table-states" className="block" />

      <H2>Sorting, selection and pagination</H2>
      <UL>
        <li>
          <strong className="text-white">Sorting:</strong> click a header to cycle ascending,
          descending and off. Set <Code>enableSorting: false</Code> on a column to turn it off. For
          server-side sorting, pass <Code>sorting</Code>, <Code>onSortingChange</Code> and{" "}
          <Code>manualSorting</Code>.
        </li>
        <li>
          <strong className="text-white">Selection:</strong> <Code>enableRowSelection</Code> adds the
          checkbox column. The header checkbox selects the current page and turns indeterminate when
          only some rows are selected. Always pass <Code>getRowId</Code> so the selection survives
          sorting and paging. <Code>renderSelectionExtra</Code> adds content after the checkbox, like
          the avatar in Figma.
        </li>
        <li>
          <strong className="text-white">Pagination:</strong> on by default (client-side). For
          server-side paging pass{" "}
          <Code>{"pagination={{ state, onChange, manual: { rowCount } }}"}</Code> and give{" "}
          <Code>data</Code> only the current page. <Code>pagination={"{false}"}</Code> hides the footer.
        </li>
        <li>
          <strong className="text-white">Row click:</strong> <Code>onRowClick</Code> makes rows
          clickable and focusable (Enter opens them).
        </li>
      </UL>

      <H2>Building your own table</H2>
      <P>
        <Code>DataTable</Code> covers most screens. For unusual layouts, use the primitives directly:
        they have the same styles without TanStack.
      </P>
      <CodeBlock
        code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table variant="compact" size="md">
  <TableHeader>
    <TableRow>
      <TableHead sort={sort} onSort={toggleSort}>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cesar Imura</TableCell>
      <TableCell>cesar@yunicorn.vc</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      />

      <H2>API reference</H2>
      <H3>DataTable</H3>
      <PropsTable
        props={[
          { name: "columns", type: "DataTableColumn<TData>[]", description: "Column definitions (use createDataTableColumnHelper)." },
          { name: "data", type: "TData[]", description: "Rows. Each row must be an object." },
          { name: "variant", type: '"grid" | "compact"', default: '"grid"', description: "Maps to the Figma Type property." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"lg"', description: "Header density (Figma _Table / Header Items Size)." },
          { name: "status", type: '"ready" | "loading" | "error"', default: '"ready"', description: "Maps to the Figma Body property. Empty is automatic." },
          { name: "onRetry", type: "() => void", description: "Shows “Try again” in the Error state." },
          { name: "emptyState / loadingState / errorState", type: "{ title?, description?, action? }", description: "Override the status texts and actions." },
          { name: "toolbar", type: "ReactNode", description: "Content above the table (Figma Toolbar)." },
          { name: "enableRowSelection", type: "boolean | (row) => boolean", default: "false", description: "Adds the checkbox column." },
          { name: "rowSelection / onRowSelectionChange", type: "RowSelectionState / OnChangeFn", description: "Controlled selection." },
          { name: "getRowId", type: "(row, index) => string", description: "Stable row ids. Recommended." },
          { name: "renderSelectionExtra", type: "(row) => ReactNode", description: "Extra content in the selection cell, e.g. an avatar." },
          { name: "sorting / onSortingChange / manualSorting", type: "SortingState / OnChangeFn / boolean", description: "Controlled or server-side sorting." },
          { name: "pagination", type: "false | { layout?, pageSizeOptions?, state?, onChange?, manual? }", default: "{}", description: "Footer options, or false to hide it." },
          { name: "onRowClick", type: "(row) => void", description: "Makes rows clickable and focusable." },
        ]}
      />
      <H3>TableHead</H3>
      <PropsTable
        props={[
          { name: "sort", type: '"asc" | "desc" | false', description: "Current sort. Omit for a static header." },
          { name: "onSort", type: "() => void", description: "Makes the header a sort button." },
          { name: "icon", type: "ReactNode", description: "Leading icon (Figma Leading Icon)." },
          { name: "action", type: "ReactNode", description: "Trailing element, e.g. a filter trigger (Figma Filter Icon)." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Data Table · Type = Grid / Compact", 'variant="grid" | "compact"'],
          ["Data Table · Body = Default / Empty / Loading / Error", "data + status (Empty when data is empty)"],
          ["Toolbar (Filter Bar + Action Slot)", "toolbar"],
          ["_Table / Header Items · Size", 'size="sm" | "md" | "lg"'],
          ["_Table / Header Items · Sort", "automatic per column (TableHead sort)"],
          ["_Table / Header Items · Variant = Empty", "selection column header"],
          ["_Table / Row · Hover / Focus", ":hover / :focus-visible (automatic)"],
          ["_Table / Cell Renderer", "TableCell + Value Slot components"],
          ["Table / Cell Type / Avatar", "enableRowSelection + renderSelectionExtra"],
          ["Scroll Bar", "native scrollbar, styled thin"],
          ["Pagination", "pagination"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>A real <Code>{"<table>"}</Code> with header cells, so screen readers announce columns.</li>
        <li>Sorted headers set <Code>aria-sort</Code>; sort buttons are keyboard reachable.</li>
        <li>Every checkbox has a name (“Select row”, “Select all rows on this page”).</li>
        <li>Status bodies are live regions; Error uses <Code>role=&quot;alert&quot;</Code>.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Not included yet:</strong> the Toolbar’s Search Bar, Dropdown,
        Date Picker and Toggle are separate components in Figma and come next. Until then,{" "}
        <Code>toolbar</Code> takes any content, and the demo uses Buttons. The Scroll Bar is the
        native one, styled thin.
      </Callout>
      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            Row Focus uses a 1.5px <Code>border-grid</Code> outline, the same color as the cell
            borders, so it’s nearly invisible. Code uses the teal focus ring for keyboard users.
          </li>
          <li>
            The Loading body reuses the info icon. Code shows the spinning loading indicator from
            Button instead.
          </li>
          <li>
            _Table / Header Items Large is 42px, but the Data Table frame stretches the header to 48px.
            Code follows the Header Items spec (42px).
          </li>
          <li>
            Header and row-hover backgrounds (2% white), the header icons (30%) and the status box
            colors are raw values. They’re named in code as <Code>--table-*</Code>.
          </li>
        </ul>
      </Callout>
    </>
  )
}
