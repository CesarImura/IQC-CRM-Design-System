import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { EmptyMatrix } from "@/components/docs/empty-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Empty",
  description: "What to show when there's nothing to show, or loading failed.",
}

export default function EmptyDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Empty"
        description="What to show when there’s nothing to show yet, or loading failed. Page size for panels, charts and tables; Compact for a single line."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2287:4523")} target="_blank" rel="noreferrer">
            Figma: Empty
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Variants</H2>
      <P>Status × Surface with two actions, plus Compact. Charts and the Data Table use Page + Outline for their Empty and Error bodies.</P>
      <EmptyMatrix />

      <H2>Parts</H2>
      <H3>Media</H3>
      <UL>
        <li>40px tile, 4px radius, white 6% fill and 8% border, with the 16px Information icon at 50%.</li>
        <li>Error: red 6% fill, red 8% border, red icon.</li>
      </UL>
      <H3>Text</H3>
      <UL>
        <li>Title 16px medium white (red for Error), description 14px at 50%, centered, 8px apart; 8px below the media.</li>
        <li>Compact is the title alone: 16px regular at 80% (red for Error).</li>
      </UL>
      <H3>Actions and surface</H3>
      <UL>
        <li>Up to two Small buttons, 8px apart, 24px below the text: Primary (Danger Filled for Error) and Ghost.</li>
        <li>Default has no frame. Outline: 1px dashed border at white 8%, 24px padding, 8px radius. Background: muted fill, 24px padding.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Padding (Outline, Background)", "empty-padding"],
          ["Text → actions", "empty-gap"],
          ["Radius", "empty-radius"],
          ["Outline border", "empty-outline"],
          ["Background fill", "empty-background"],
          ["Media size", "empty-media-size"],
          ["Media radius", "empty-media-radius"],
          ["Media fill / border", "empty-media-bg"],
          ["", "empty-media-border"],
          ["Media icon", "empty-media-icon"],
          ["Error media fill / border", "empty-media-bg-error"],
          ["", "empty-media-border-error"],
          ["Title", "empty-title"],
          ["Title, error", "empty-title-error"],
          ["Title, compact", "empty-title-compact"],
          ["Description", "empty-description"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Empty is announced politely as a status; Error as an alert.</li>
        <li>Say what’s missing and what to do next. Error’s main action retries.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Compact has no Outline or Background variants and no actions.</li>
          <li>The title color and the media fills are raw values; the error colors borrow the Field Grid error variable.</li>
          <li>The Ghost “Learn more” label sits at 70%, matching the Ghost button’s rest state.</li>
        </ul>
      </Callout>
    </>
  )
}
