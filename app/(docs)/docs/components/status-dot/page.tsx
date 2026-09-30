import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Status Dot",
  description: "Inline status for tables and lists.",
}

export default function StatusDotDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Status Dot"
        description="Inline status for tables and lists: a small square mark with an optional label."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1452:22069")} target="_blank" rel="noreferrer">
            Figma: Status Dot
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="status-dot-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/status-dot" />
      <P>
        For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { StatusDot } from "@/components/ui/status-dot"`} />
      <CodeBlock className="mt-3" code={`<StatusDot tone="positive">Active</StatusDot>`} />
      <P>
        Tone describes the <em>state</em> of a record (active, at risk, churned), not a category.
        For categories, use a{" "}
        <Link href="/docs/components/badge" className="text-brand underline-offset-4 hover:underline">
          Badge
        </Link>
        .
      </P>

      <H2>Mark only</H2>
      <P>
        Without children only the mark shows (Figma <em>Show label</em> off). Pass{" "}
        <Code>label</Code> so screen readers still hear the status.
      </P>
      <ComponentPreview name="status-dot-mark-only" />

      <H2>API reference</H2>
      <PropsTable
        props={[
          { name: "tone", type: '"neutral" | "positive" | "negative" | "warning" | "info"', default: '"neutral"', description: "Mark color. Maps to the Figma Tone property." },
          { name: "children", type: "ReactNode", description: "Visible label. Omit it for the mark-only form." },
          { name: "label", type: "string", description: "Accessible name for the mark-only form." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Tone = Neutral / Positive / Negative / Warning / Info", 'tone="neutral" | … | "info"'],
          ["Label", "children"],
          ["Show label = false", "no children + label"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>The mark is decorative; the label (or <Code>label</Code> prop) carries the status.</li>
        <li>Don’t rely on the color alone. Pick label words that make sense without it.</li>
      </UL>
    </>
  )
}
