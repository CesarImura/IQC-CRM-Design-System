import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Skeleton",
  description: "Loading placeholders that hold the shape of content while it loads.",
}

export default function SkeletonDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Skeleton"
        description="Placeholders that hold the shape of content while it loads. Built from one bone, a bar or a circle, that rests or pulses, and composed into recipes for text, form controls and table rows."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2590:4438")} target="_blank" rel="noreferrer">
            Figma: Skeleton
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="skeleton-demo" />

      <H2>Bone</H2>
      <P>Shape × motion. Bar is 160×12 with a 2px radius; Circle is 32×32. Both stretch to any size.</P>
      <ComponentPreview name="skeleton-bones" />
      <UL>
        <li>
          <strong className="text-white">Rest:</strong> a still white 8% fill.
        </li>
        <li>
          <strong className="text-white">Pulse:</strong> white 8% → 16% → 8% over 1.6s (ease in-out), then holds for 0.4s. 2s
          loop. Pulse is the default while loading.
        </li>
      </UL>

      <H2>Recipes</H2>
      <ComponentPreview name="skeleton-recipes" />
      <H3>Text</H3>
      <P>Three 12px lines, 240 / 200 / 128 wide, 8px apart. The last line is always the short one.</P>
      <H3>Control</H3>
      <P>A 96×12 label over a 240×36 field, 8px apart. Stands in for a Form Field or Dropdown.</P>
      <H3>Table row</H3>
      <P>A 24px circle and bars 160 / 96 / 64 wide, with 16px padding and gaps.</P>

      <H2>In context</H2>
      <P>Match the layout that will load: the same card, the same number of rows, the same field widths.</P>
      <ComponentPreview name="skeleton-card" />

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Bone (Rest, and Pulse start/end)", "skeleton-bone"],
          ["Bone, Pulse peak", "skeleton-bone-pulse"],
          ["Bar radius", "skeleton-radius-bar"],
          ["Circle radius", "skeleton-radius-circle"],
          ["Pulse loop", "skeleton-pulse-duration"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Bones are hidden from screen readers. The loading region is announced as busy instead.</li>
        <li>With reduced motion turned on, Pulse stays still at Rest.</li>
        <li>All bones pulse in sync, so a screen of skeletons breathes as one.</li>
        <li>Swap the skeleton for the content in place, without shifting the layout.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Pulse peak (white 16%) is a raw value; white-8 is a variable, but there’s no white-16.</li>
          <li>The Bone matrix frame (2590:4439) shows its row and column labels but no bones in the cells.</li>
          <li>There’s no Skeleton for the Stat Card or Data Table headers yet; the Data Table Loading state still uses the status box.</li>
        </ul>
      </Callout>
    </>
  )
}
