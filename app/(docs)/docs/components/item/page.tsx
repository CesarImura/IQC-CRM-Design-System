import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ItemMatrix } from "@/components/docs/item-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Item",
  description: "A list row with a label, description, icon and trailing controls.",
}

export default function ItemDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Item"
        description="A list row: label, optional description and icon, and up to two trailing controls (an action, a link, a dismiss). Three sizes and three styles."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2967:340")} target="_blank" rel="noreferrer">
            Figma: Item
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Variants</H2>
      <P>Size × Style, each with the plain row, an icon with link and dismiss, and an action.</P>
      <ItemMatrix />
      <UL>
        <li>sm: 6 / 12px padding, 14px label, 12px description, 16px icon. md: 12 / 16px, 16px label, 14px description, 24px icon. lg: 16 / 24px.</li>
        <li>Default has no frame; Outline adds a 1px border at white 6%; Muted adds the raised fill too. 4px radius.</li>
        <li>Label medium white, description at 50%, 2px apart. 16px between icon, text and trailing controls.</li>
        <li>Trailing: a Small Secondary Button, and Small Ghost icon buttons for Link and Close.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Radius", "item-radius"],
          ["Gap", "item-gap"],
          ["Label → description", "item-copy-gap"],
          ["Padding sm", "item-px-sm"],
          ["", "item-py-sm"],
          ["Padding md", "item-px-md"],
          ["", "item-py-md"],
          ["Padding lg", "item-px-lg"],
          ["", "item-py-lg"],
          ["Border (Outline, Muted)", "item-border"],
          ["Fill (Muted)", "item-muted-bg"],
          ["Label", "item-label"],
          ["Description", "item-description"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Item has no hover, selected or disabled states; make the row a link or button in the screen if it needs one.</li>
          <li>md and lg differ only in padding; padding, gap and the 6% border are raw values.</li>
        </ul>
      </Callout>
    </>
  )
}
