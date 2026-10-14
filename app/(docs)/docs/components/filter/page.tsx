import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Filter",
  description: "More filters: Filter Button, Filter Panel with Filter Groups and Chips, and the Filter Results Bar.",
}

export default function FilterDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Filter"
        description="The More filters pattern. The Filter Button opens the Filter Panel; Filter Groups hold Filter Chips; Apply commits the draft and the Filter Results Bar lists what’s applied."
      />

      <ComponentPreview name="filter-demo" className="block" />

      <H2>Parts</H2>
      <UL>
        <li>
          <strong>Filter Button</strong>: Filter icon and “More filters” (“Filters” on mobile). With filters applied it turns Active: accent
          border and a green count.
        </li>
        <li>
          <strong>Filter Chip, Option</strong>: a 32px toggle. Selected shows a check in green. The first “Any…” chip uses <code>neutral</code>:
          white with a check, and it doesn’t count as a filter.
        </li>
        <li>
          <strong>Filter Chip, Applied</strong>: “Status: Active ×” in the Results Bar; × removes that filter.
        </li>
        <li>
          <strong>Filter Group</strong>: label, wrapping chips and an optional search (e.g. affiliate email).
        </li>
        <li>
          <strong>Filter Panel</strong>: 440px overlay with a header (title + Clear), the groups, and Cancel + Apply (“Show N results”). Clear
          only resets the panel’s groups.
        </li>
        <li>
          <strong>Filter Results Bar</strong>: applied chips and Clear all on the left, the result count on the right.
        </li>
      </UL>

      <H2>Behavior</H2>
      <P>The panel edits a draft. Apply commits it and closes; Cancel, Esc or clicking outside throws it away. Show the live count on Apply.</P>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Chip height / padding / gap", "filter-chip-height"],
          ["", "filter-chip-px"],
          ["", "filter-chip-gap"],
          ["Chip surface / border", "filter-chip-bg"],
          ["", "filter-chip-border"],
          ["Chip hover", "filter-chip-bg-hover"],
          ["", "filter-chip-border-hover"],
          ["Chip label", "filter-chip-content"],
          ["Selected neutral label", "filter-chip-content-neutral-selected"],
          ["Selected surface / border / label", "filter-chip-bg-selected"],
          ["", "filter-chip-border-selected"],
          ["", "filter-chip-content-selected"],
          ["Group gap", "filter-group-gap"],
          ["Panel width / padding / group gap", "filter-panel-width"],
          ["", "filter-panel-px"],
          ["", "filter-panel-groups-gap"],
          ["Panel surface / border / shadow", "filter-panel-bg"],
          ["", "filter-panel-border"],
          ["", "filter-panel-shadow"],
          ["Results Bar padding / count", "filter-results-bar-px"],
          ["", "filter-results-bar-py"],
          ["", "filter-results-count"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Built from the Users screen in the Platform file and the library descriptions; the library masters still need a QA pass.</li>
          <li>The Selected (green) chip colors are inferred from “Selected = verde com check”; no instance on the screen shows them.</li>
          <li>Filter Button lives in the Platform file only; it should move to the library next to Filter Chip.</li>
        </ul>
      </Callout>
    </>
  )
}
