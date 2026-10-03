import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Search Bar",
  description: "Search field with optional scope and clear button.",
}

export default function SearchBarDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Search Bar"
        description="Search for panels, filters and navigation: a search icon, an optional scope dropdown, the input, and a clear button. Small or Medium; Default, Focus, Active, Error and Disabled."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("529:36926")} target="_blank" rel="noreferrer">
            Figma: Search Bar
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Pick a scope, type, and clear with × or Esc.</P>
      <ComponentPreview name="search-bar-demo" />

      <H2>All variants</H2>
      <ComponentPreview name="search-bar-states" className="block" />

      <H2>Anatomy</H2>
      <UL>
        <li>Frame: 32px (Small) or 40px (Medium), white 4% fill, 8% border, 2px radius.</li>
        <li>Search icon in an 8px-padded cell. Scope: a transparent Trigger (value and chevron at 70%) with 1px dividers on both sides.</li>
        <li>Input: 12px padding, placeholder at 50%. Clear: 16px × in an 8px-padded cell, while there’s text.</li>
        <li>Focus (keyboard): no fill, 3px teal ring. Active (editing): white 2% fill, neutral-500 border, 3px white ring at 12%, white text.</li>
        <li>Error: 2px red border, red ring. Disabled: border 16%, everything at 32%, no clear button.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Fill", "button-secondary-bg-default"],
          ["Border", "button-secondary-border-default"],
          ["Border disabled", "search-bar-border-disabled"],
          ["Error border", "form-field-error-border"],
          ["Error border width", "search-bar-error-border-width"],
          ["Error ring", "focus-danger"],
          ["Focus ring", "focus-ring"],
          ["Active fill", "input-bg-active"],
          ["Active border", "input-border-hover"],
          ["Active ring", "input-ring-active"],
          ["Icon / clear cell padding", "search-bar-cell-px"],
          ["Input padding", "input-px"],
          ["Placeholder", "input-placeholder"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Clicking anywhere in the frame focuses the input and shows Active; tabbing in shows Focus until you type. Esc clears the text.</li>
        <li>The scope menu opens with click or Enter; the chosen scope gets a checkmark.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Error border is 2px here, 1.5px on Input and 1px on Trigger.</li>
          <li>The clear button shows even with the placeholder; the build shows it only when there’s text to clear.</li>
          <li>There’s no Hover variant, unlike Input.</li>
          <li>In the Active variant the typed text (“pay”) keeps the placeholder’s 50%; the build shows typed text in white, like Input.</li>
        </ul>
      </Callout>
    </>
  )
}
