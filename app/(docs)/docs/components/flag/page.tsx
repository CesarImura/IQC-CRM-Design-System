import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FlagGallery } from "@/components/docs/flag-gallery"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Flag",
  description: "245 country and region flags in three sizes.",
}

export default function FlagDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Flag"
        description="Country and region flags for addresses, phone numbers, currencies and locales. 245 flags at 4:3, in three sizes."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2467:27419")} target="_blank" rel="noreferrer">
            Figma: Flag
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="flag-demo" />

      <H2>Sizes</H2>
      <P>16×12, 24×18 and 32×24 (the default), with a 2px corner radius.</P>
      <ComponentPreview name="flag-sizes" />

      <H2>Next to a label</H2>
      <P>When the country name is written next to it, the flag is decorative.</P>
      <ComponentPreview name="flag-with-label" />

      <H2>All flags</H2>
      <P>Search by country name or ISO code.</P>
      <FlagGallery />

      <H2>Tokens</H2>
      <TokenTable rows={[["Corner radius", "badge-radius-default"]]} />

      <H2>Behavior</H2>
      <UL>
        <li>A flag on its own is announced with the country name.</li>
        <li>Don’t use a flag alone to mean a language; show the language name too.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            Aruba, Costa Rica, Martinique and Saint-Barthélemy are broken in Figma: the 640×480 image isn’t scaled into the
            32×24 frame, so only a corner shows.
          </li>
          <li>Mongolia is named “Flag / 4x3 /mn”; Kenia, Marocco, Mavdives, Mozambik, Makao, Tunis, Vatikan, Swaziland and Macedonia are misspelled or outdated.</li>
          <li>The Figma flags are 640×480 PNGs (5MB in total); the build uses the matching SVGs. A few colors differ slightly (e.g. Saudi Arabia’s green).</li>
        </ul>
      </Callout>
    </>
  )
}
