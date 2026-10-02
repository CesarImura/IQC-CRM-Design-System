import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { BackdropMatrix } from "@/components/docs/backdrop-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Backdrop",
  description: "The scrim behind modals and trays.",
}

export default function BackdropDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Backdrop"
        description="The scrim that dims the page behind a Modal or Tray. Three intensities, with or without a soft blur."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1312:2334")} target="_blank" rel="noreferrer">
            Figma: Backdrop
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Variants</H2>
      <P>Intensity × Blur, over sample content.</P>
      <BackdropMatrix />
      <UL>
        <li>Subtle (black 32%) for light overlays; Default (50%) for modals; Strong (64%) when the page must step back fully.</li>
        <li>Soft adds a background blur so the content behind can’t be read.</li>
        <li>Modal uses Default + Soft. It fades in and out with the surface it belongs to.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Subtle", "backdrop-subtle"],
          ["Default", "backdrop-default"],
          ["Strong", "backdrop-strong"],
          ["Soft blur", "backdrop-blur-soft"],
        ]}
      />

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> the soft blur is a layer blur of 8 on the scrim itself. On the web it’s
        a background blur of the page behind; the build uses 4px, the CSS equivalent of Figma’s 8.
      </Callout>
    </>
  )
}
