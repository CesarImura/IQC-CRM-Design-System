import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { AlertMatrix } from "@/components/docs/alert-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Alert",
  description: "An inline status message inside a page or panel.",
}

export default function AlertDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Alert"
        description="An inline status message that stays on the page: Default for information, Success to confirm, Destructive for problems."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("3072:213")} target="_blank" rel="noreferrer">
            Figma: Alert
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Variants</H2>
      <P>Tone, with the icon on, with and without an action.</P>
      <AlertMatrix />
      <UL>
        <li>Raised surface, 1px border at white 8%, 4px radius, 12 / 16px padding, 16px gaps.</li>
        <li>24px tone icon at the top: Information (white), Checkmark outline (accent) or Error (red).</li>
        <li>Title 14px medium white; description 14px at 50%. Destructive tints the surface red 5% and turns both lines red.</li>
        <li>The optional action is a Small Button on the right, vertically centered.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Surface", "alert-surface"],
          ["Surface, destructive", "alert-surface-destructive"],
          ["Border", "alert-border"],
          ["Radius", "alert-radius"],
          ["Padding x / y", "alert-px"],
          ["", "alert-py"],
          ["Gap", "alert-gap"],
          ["Title", "alert-title"],
          ["Description", "alert-description"],
          ["Destructive text", "alert-destructive"],
          ["Icon default / success / destructive", "alert-icon"],
          ["", "alert-icon-success"],
          ["", "alert-icon-destructive"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Destructive alerts are announced right away (role alert); the others politely (role status).</li>
        <li>Alerts stay until the problem is fixed or the page changes. For a passing confirmation, use a Toast.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The hidden action is a Primary Small Button with its fill overridden to white; the build leaves the button choice to the screen.</li>
          <li>Padding, gap and radius are numbers in the Alert collection rather than space and radius tokens.</li>
        </ul>
      </Callout>
    </>
  )
}
