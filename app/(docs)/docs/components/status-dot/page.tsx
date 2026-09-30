import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { H2, P, PageHeader, UL } from "@/components/docs/typography"

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
        description="Inline status for tables and lists: a small square mark in one of five tones, with an optional label."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1452:22069")} target="_blank" rel="noreferrer">
            Figma: Status Dot
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Tones</H2>
      <P>Neutral, Positive, Negative, Warning and Info, each with its label.</P>
      <ComponentPreview name="status-dot-demo" />

      <H2>Mark only</H2>
      <P>With Show label off, only the mark shows. Screen readers still hear the status.</P>
      <ComponentPreview name="status-dot-mark-only" />

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Neutral", "status-dot-neutral"],
          ["Positive", "status-dot-positive"],
          ["Negative", "status-dot-negative"],
          ["Warning", "status-dot-warning"],
          ["Info", "status-dot-info"],
          ["Label", "status-dot-label"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The mark is decorative; the label carries the status.</li>
        <li>Don’t rely on color alone. Pick label words that make sense without it.</li>
      </UL>
    </>
  )
}
