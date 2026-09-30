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
  title: "Value Slot",
  description: "The content of a table cell: one component per cell type.",
}

const link = "text-brand underline-offset-4 hover:underline"

export default function ValueSlotDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Value Slot"
        description="The content of a table cell. There’s one component per cell type, so every table shows names, IDs, dates and statuses the same way."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("573:55549")} target="_blank" rel="noreferrer">
            Figma: _Value Slot
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="value-slot-demo" align="start" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/value-slot @iq/badge @iq/status-dot @iq/pill" />
      <P>
        <Code>value-slot</Code> contains the text-based cell types. Badge, Delta, Status Dot and Pill
        cells use those components directly, so add the ones your table needs. For registry setup,
        see{" "}
        <Link href="/docs/installation" className={link}>
          Installation
        </Link>
        .
      </P>

      <H2>Cell types</H2>
      <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-grid bg-white/[0.02] text-xs tracking-wider text-white/40 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Cell type</th>
              <th scope="col" className="px-4 py-3 font-medium">Component</th>
              <th scope="col" className="px-4 py-3 font-medium">Use for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grid text-white/70">
            {[
              ["Text", "ValueText", "Names, titles, free text"],
              ["Mono", "ValueMono", "IDs, UUIDs, hashes, codes"],
              ["Number", "ValueNumber", "Quantities and amounts (tabular figures)"],
              ["Phone", "ValuePhone", "Phone numbers; pass href=\"tel:…\" to make them callable"],
              ["Link", "ValueLink", "Emails and URLs"],
              ["Date", "ValueDate", "Date with optional time below"],
              ["Exchange", "ValueExchange", "Market data providers and exchanges, with logo"],
              ["Badge", "Badge", "Roles, categories"],
              ["Delta", "DeltaBadge", "Changes: +18%, -5%"],
              ["Status Dot", "StatusDot", "Record state: active, at risk, churned"],
              ["Pill", "Pill", "Removable values: assignees, tags"],
            ].map(([type, component, use]) => (
              <tr key={type}>
                <td className="px-4 py-3">{type}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-brand">{component}</td>
                <td className="px-4 py-3">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Usage</H2>
      <CodeBlock
        code={`import { ValueDate, ValueMono, ValueText } from "@/components/ui/value-slot"
import { StatusDot } from "@/components/ui/status-dot"

<td><ValueText>{contact.name}</ValueText></td>
<td><ValueMono title={contact.id}>{contact.id}</ValueMono></td>
<td><ValueDate date={formatDate(contact.createdAt)} time={formatTime(contact.createdAt)} dateTime={contact.createdAt} /></td>
<td><StatusDot tone="positive">Active</StatusDot></td>`}
      />
      <P>
        Every value truncates with an ellipsis when the column is narrow. Put the full value in{" "}
        <Code>title</Code> for long IDs and names. Format numbers, dates and phones before passing
        them in, since locale and time zone belong to your app.
      </P>

      <H2>API reference</H2>
      <H3>ValueText, ValueMono, ValueNumber</H3>
      <P>Accept every <Code>span</Code> attribute. Children is the formatted value.</P>
      <H3>ValuePhone</H3>
      <PropsTable
        props={[
          { name: "href", type: "string", description: "Optional tel: link. Without it, renders plain text." },
        ]}
      />
      <H3>ValueLink</H3>
      <PropsTable
        props={[
          { name: "href", type: "string", description: "mailto:, https:, or an internal route." },
          { name: "asChild", type: "boolean", default: "false", description: "Style a Next.js <Link> instead of an <a>." },
        ]}
      />
      <H3>ValueDate</H3>
      <PropsTable
        props={[
          { name: "date", type: "ReactNode", description: "Formatted date, first line." },
          { name: "time", type: "ReactNode", description: "Formatted time, second line (12px, muted)." },
          { name: "dateTime", type: "string", description: "Machine-readable ISO value for the <time> element." },
        ]}
      />
      <H3>ValueExchange</H3>
      <PropsTable
        props={[
          { name: "logo", type: "ReactNode", description: "24×24 logo (img or SVG). Decorative." },
          { name: "children", type: "ReactNode", description: "Exchange or provider name." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Cell Type = Text / Mono / Number / Phone", "ValueText / ValueMono / ValueNumber / ValuePhone"],
          ["Cell Type = Link", "ValueLink"],
          ["Cell Type = Date", "ValueDate"],
          ["Cell Type = Exchange", "ValueExchange"],
          ["Cell Type = Badge (Slot)", "Badge"],
          ["Cell Type = Delta", "DeltaBadge"],
          ["Cell Type = Status Dot", "StatusDot"],
          ["Cell Type = Pill", "Pill"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>
          Dates render as <Code>{"<time>"}</Code>; pass <Code>dateTime</Code> so assistive tech and
          search get the exact value.
        </li>
        <li>Links show a focus ring and use the link color plus an underline, not color alone.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The Badge and Delta cells use “Badge (Legacy)”, which is 25px tall with 15% backgrounds.
            Code uses the current{" "}
            <Link href="/docs/components/badge" className={link}>
              Badge
            </Link>{" "}
            (22px, 16%), so rows are 3px shorter than the Figma cell. Worth swapping the instances in
            Figma.
          </li>
          <li>
            Text, date and link colors use layer opacity (80%, 50%) instead of variables. They’re
            named in code as <Code>--value-slot-*</Code>. The link color <Code>#7affdb</Code> isn’t a
            variable either.
          </li>
          <li>
            Number, Phone and Text are styled identically. Number might want right alignment in
            tables, which is common for amounts.
          </li>
        </ul>
      </Callout>
    </>
  )
}
