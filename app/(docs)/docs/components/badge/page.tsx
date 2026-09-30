import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { BadgeMatrix } from "@/components/docs/badge-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Badge",
  description: "Short labels for categories, roles and metadata, plus Delta for metric changes.",
}

const colors = ["gray", "white", "blue", "green", "yellow", "red", "purple"] as const

export default function BadgeDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Badge"
        description="A short label for a category, role or piece of metadata. Seven colors, three styles and three sizes, with an optional dot, icon or remove button."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1275:2460")} target="_blank" rel="noreferrer">
            Figma: Badge
            <Launch />
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1277:2800")} target="_blank" rel="noreferrer">
            Figma: Badge / Delta
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="badge-demo" />

      <H2>Styles</H2>
      <P>Filled (default) for most labels, Outline for quieter or removable tags, Ghost for inline text-level labels.</P>
      <ComponentPreview name="badge-variants" />

      <H2>Sizes</H2>
      <P>Small (12px text, 12px icons) for dense tables, Medium (14px, 16px icons) as the default, Large (16px, 20px icons).</P>
      <ComponentPreview name="badge-sizes" />

      <H2>Dot, icon and remove</H2>
      <P>The square dot marks status, an icon can lead the label, and the × removes the badge. Try removing the tags.</P>
      <ComponentPreview name="badge-anatomy" />

      <H2>Delta</H2>
      <P>
        Metric change with an arrow: green up, red down, gray flat. The tone follows the sign unless a rise is bad news (churn
        up is red).
      </P>
      <ComponentPreview name="delta-badge-demo" />

      <H2>All variants</H2>
      <P>Every size, style and color, laid out like the Figma matrix.</P>
      <BadgeMatrix />

      <H2>Tokens</H2>
      <TokenTable
        title="Size"
        rows={[
          ["Corner radius", "badge-radius-default"],
          ["Outline width", "badge-stroke-width"],
          ["Small padding x / y", "badge-px-sm"],
          ["", "badge-py-sm"],
          ["Small gap / text / icon", "badge-gap-sm"],
          ["", "badge-font-sm"],
          ["", "badge-icon-sm"],
          ["Medium padding x / y", "badge-px-md"],
          ["", "badge-py-md"],
          ["Medium gap / text / icon", "badge-gap-md"],
          ["", "badge-font-md"],
          ["", "badge-icon-md"],
          ["Large padding x / y", "badge-px-lg"],
          ["", "badge-py-lg"],
          ["Large gap / text / icon", "badge-gap-lg"],
          ["", "badge-font-lg"],
          ["", "badge-icon-lg"],
          ["Remove icon", "badge-dismiss"],
        ]}
      />
      {colors.map((c) => (
        <TokenTable
          key={c}
          title={c[0].toUpperCase() + c.slice(1)}
          rows={[
            ["Filled background", `badge-${c}-bg`],
            ["Text, icon and dot", `badge-${c}-content`],
            ["Outline border", `badge-${c}-border`],
          ]}
        />
      ))}
      <TokenTable title="Delta" rows={[["Neutral background", "badge-delta-neutral-bg"]]} />

      <H2>Behavior</H2>
      <UL>
        <li>Color is never the only signal: the label carries the meaning.</li>
        <li>The remove button is keyboard reachable, has its own name (“Remove Fintech”) and a focus ring.</li>
        <li>The Delta arrow is announced as “Increase”, “Decrease” or “No change”.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Delta neutral background is a raw #ffffff0d instead of the gray badge variable (#141716).</li>
          <li>The Focus Ring layer inside each badge has a 0px spread, so it never shows.</li>
          <li>The Value Slot page still uses “Badge (Legacy)”: 15% backgrounds and a 25px height instead of 16% and 22px.</li>
        </ul>
      </Callout>
    </>
  )
}
