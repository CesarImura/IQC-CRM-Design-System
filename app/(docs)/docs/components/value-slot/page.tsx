import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Value Slot",
  description: "The content of a table cell: one style per cell type.",
}

const link = "text-brand underline-offset-4 hover:underline"

export default function ValueSlotDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Value Slot"
        description="The content of a table cell. There’s one style per cell type, so every table shows names, IDs, dates and statuses the same way."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("573:55549")} target="_blank" rel="noreferrer">
            Figma: _Value Slot
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="value-slot-demo" align="start" />

      <H2>Cell types</H2>
      <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-grid bg-white/[0.02] text-xs tracking-wider text-white/40 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Cell type</th>
              <th scope="col" className="px-4 py-3 font-medium">Use for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grid text-white/70">
            {[
              ["Text", "Names, titles, free text"],
              ["Mono", "IDs, UUIDs, hashes, codes (Geist Mono)"],
              ["Number", "Quantities and amounts (tabular figures)"],
              ["Phone", "Phone numbers, optionally callable"],
              ["Link", "Emails and URLs, in the link color"],
              ["Date", "Date with optional time below in content/tertiary"],
              ["Exchange", "Market data providers and exchanges, with logo"],
              ["Badge", "Roles, categories"],
              ["Delta", "Changes: +18%, -5%"],
              ["Status Dot", "Record state: active, at risk, churned"],
              ["Pill", "Removable values: assignees, tags"],
            ].map(([type, use]) => (
              <tr key={type}>
                <td className="px-4 py-3 text-white">{type}</td>
                <td className="px-4 py-3">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Text", "value-slot-text"],
          ["Secondary (time, captions)", "value-slot-secondary"],
          ["Strong", "value-slot-strong"],
          ["Link", "value-slot-link"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Links show a focus ring and use the link color plus an underline on hover, not color alone.</li>
        <li>Long values are cut off with an ellipsis.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The Badge and Delta cells use “Badge (Legacy)”, which is 25px tall with 15% backgrounds. The build uses the
            current{" "}
            <Link href="/docs/components/badge" className={link}>
              Badge
            </Link>{" "}
            (22px, 16%), so rows are 3px shorter than the Figma cell. Worth swapping the instances in Figma.
          </li>
          <li>The link color #7affdb at 80% isn’t a variable.</li>
          <li>Number, Phone and Text are styled identically. Number might want right alignment in tables, which is common for amounts.</li>
        </ul>
      </Callout>
    </>
  )
}
