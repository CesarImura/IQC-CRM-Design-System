import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PartnerLogoMatrix } from "@/components/docs/partner-logo-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Partner Logo",
  description: "Integration partner lockups: mark and name, in two sizes.",
}

export default function PartnerLogoDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Partner Logo"
        description="Lockups for the platforms and data providers IQ Capital integrates with: the partner’s mark and name, in Small and Medium, or the mark on its own."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("584:60258")} target="_blank" rel="noreferrer">
            Figma: Partner Logo
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="partner-logo-demo" />

      <H2>All partners</H2>
      <P>Ten partners. The mark is also available on its own, wherever a screen only needs the glyph.</P>
      <PartnerLogoMatrix />

      <H2>In a table</H2>
      <P>Small lockups sit on the same line as 14px table text.</P>
      <ComponentPreview name="partner-logo-in-table" />

      <H2>Anatomy</H2>
      <H3>Small</H3>
      <UL>
        <li>24px mark, name 14px medium white, 6px apart.</li>
      </UL>
      <H3>Medium</H3>
      <UL>
        <li>32px mark, name 16px medium white, 8px apart.</li>
      </UL>
      <H3>Mark</H3>
      <UL>
        <li>32×32 box. The partner’s own colors; never recolor or stretch it.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Gap, Small", "partner-logo-gap-sm"],
          ["Gap, Medium", "partner-logo-gap-md"],
          ["Name", "partner-logo-label"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>With the name shown, the mark is decorative. Mark only: it’s announced with the partner’s name.</li>
        <li>Logos are static: no hover, no links by default.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The Small lockups use separately scaled copies of the marks; the build scales the same vector, which looks identical.</li>
          <li>MT5, Tradovate and Deepcharts sit inset inside the 32px box (about 26px), so they read smaller than the others.</li>
          <li>The Deepcharts mark is a vectorized image (“image 12 [Vectorized]”) and is the heaviest asset.</li>
          <li>Partner names and marks are the partners’ trademarks; check each brand’s usage rules before changing them.</li>
        </ul>
      </Callout>
    </>
  )
}
