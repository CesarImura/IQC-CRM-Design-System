import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { TriggerMatrix } from "@/components/docs/trigger-matrix"
import { Callout, H2, H3, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Trigger",
  description: "The button that opens a Dropdown, Select or Date Picker.",
}

export default function TriggerDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Trigger"
        description="The button that opens a Dropdown, Select or Date Picker: optional icon, the value, and a chevron. Small, Medium or Large; Default, Focus, Error and Disabled, each closed or open (Active), with and without hover."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("341:17619")} target="_blank" rel="noreferrer">
            Figma: Trigger
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="trigger-demo" />

      <H2>All variants</H2>
      <TriggerMatrix />

      <H2>Anatomy</H2>
      <H3>Sizes</H3>
      <UL>
        <li>Small: 32px tall, 12px padding, 14/21 text, 16px icons.</li>
        <li>Medium: 40px, 16px padding, 16/24 text, 16px icons.</li>
        <li>Large: 48px, 24px padding, 18/27 text, 24px icons.</li>
      </UL>
      <H3>States</H3>
      <UL>
        <li>Default: white 4% fill, 8% border, value at 70%. Hover: border 12%.</li>
        <li>Active (open): border 12%, value at 80%. Active + Hover: fill 8%.</li>
        <li>Focus: 3px teal ring. Error: no fill, red border, red ring at 50%, red value and error icon.</li>
        <li>Disabled: no fill, border 4%, value at 32%.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Height Small / Medium / Large", "button-size-sm-height"],
          ["", "button-size-md-height"],
          ["", "button-size-lg-height"],
          ["Fill", "button-secondary-bg-default"],
          ["Fill, Active", "button-secondary-bg-hover"],
          ["Fill, Active + Hover", "button-secondary-bg-pressed"],
          ["Border", "button-secondary-border-default"],
          ["Border hover / Active", "button-secondary-border-active"],
          ["Border disabled", "button-secondary-border-disabled"],
          ["Value", "trigger-value"],
          ["Value, Active", "trigger-value-active"],
          ["Error border", "form-field-error-border"],
          ["Error ring", "focus-danger"],
          ["Error text / icon", "button-danger-content-default"],
          ["Focus ring", "focus-ring"],
          ["Background blur", "trigger-blur"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Large size group is labeled “Medium” in the matrix.</li>
          <li>Large Active variants are 215–216px wide while the rest are 214px; the Error ones are 243px because of the extra icon.</li>
          <li>Default and Hover fills are both 4% (button-secondary-bg-default and -hover share a value), so Hover only changes the border.</li>
        </ul>
      </Callout>
    </>
  )
}
