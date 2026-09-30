import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PillMatrix } from "@/components/docs/pill-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Pill",
  description: "Removable value chip for filters and table cells.",
}

export default function PillDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Pill"
        description="A rounded chip for a value the user chose and can remove, like an active filter, a recipient or an assignee. Seven colors, three sizes, and hover, pressed, focus and disabled states."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1380:3466")} target="_blank" rel="noreferrer">
            Figma: Pill
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="pill-demo" />

      <H2>Colors</H2>
      <P>The same seven colors as Badge. The leading icon is drawn in the pill’s color at 50% opacity.</P>
      <ComponentPreview name="pill-colors" />

      <H2>Sizes</H2>
      <P>Small 22px, Medium 28px (default) and Large 36px. The remove hit area is 20, 24 and 28px; icons are 12, 16 and 18px.</P>
      <ComponentPreview name="pill-sizes" />

      <H2>Clickable</H2>
      <P>
        The label can open something (e.g. edit the filter). The label and the × are separate targets. Hover adds a light
        overlay, pressing darkens it, and keyboard focus rings the whole pill.
      </P>
      <ComponentPreview name="pill-clickable" />

      <H2>Disabled</H2>
      <P>Greys out the label and icons. For values the user can see but can’t change.</P>
      <ComponentPreview name="pill-disabled" />

      <H2>All variants</H2>
      <P>Every color and size, laid out like the Figma matrix. Hover, press and Tab through them for the interactive states.</P>
      <PillMatrix />

      <H2>Tokens</H2>
      <P>Colors come from the Badge color tokens (badge-{"{color}"}-bg / -content / -border).</P>
      <TokenTable
        rows={[
          ["Small padding x / y", "pill-px-sm"],
          ["", "pill-py-sm"],
          ["Small gap / hit / icon", "pill-gap-sm"],
          ["", "pill-hit-sm"],
          ["", "pill-icon-sm"],
          ["Medium padding x / y", "pill-px-md"],
          ["", "pill-py-md"],
          ["Medium gap / hit / icon", "pill-gap-md"],
          ["", "pill-hit-md"],
          ["", "pill-icon-md"],
          ["Large padding x / y", "pill-px-lg"],
          ["", "pill-py-lg"],
          ["Large gap / hit / icon", "pill-gap-lg"],
          ["", "pill-hit-lg"],
          ["", "pill-icon-lg"],
          ["Remove icon", "pill-dismiss"],
          ["Hover overlay", "pill-overlay-hover"],
          ["Pressed overlay", "pill-overlay-pressed"],
          ["Focus ring", "focus-ring"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The remove button is named after the value, e.g. “Remove user@email.com”.</li>
        <li>Long values are cut off with an ellipsis; the full value shows on hover.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Pill colors use a separate color/* collection with the same values as badge-*. Consider merging the collections.</li>
          <li>The hover and pressed overlays (6% white, 16% black) and the Large icon size (18px) aren’t variables.</li>
        </ul>
      </Callout>
    </>
  )
}
