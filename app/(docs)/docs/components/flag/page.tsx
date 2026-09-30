import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { FlagGallery } from "@/components/docs/flag-gallery"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

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

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/flag" />
      <P>
        Also installs <Code>flag-icons</Code> (MIT), which provides the SVG artwork. Each flag is a
        small SVG that only loads when a page uses it. For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { Flag } from "@/components/ui/flag"`} />
      <CodeBlock className="mt-3" code={`<Flag code="br" />`} />
      <P>
        <Code>code</Code> is the ISO 3166-1 alpha-2 country code, the same one your address and
        phone data already use (<Code>&quot;BR&quot;</Code> and <Code>&quot;br&quot;</Code> both
        work). A few regions have their own codes: <Code>eu</Code>, <Code>un</Code>,{" "}
        <Code>gb-eng</Code>, <Code>gb-sct</Code>, <Code>gb-wls</Code>, <Code>gb-nir</Code>,{" "}
        <Code>ic</Code> (Canary Islands), <Code>xk</Code> (Kosovo) and <Code>cefta</Code>.
      </P>

      <H2>Sizes</H2>
      <P>
        <Code>sm</Code> 16×12, <Code>md</Code> 24×18 and <Code>lg</Code> 32×24 (the default). These
        match the sizes in Figma.
      </P>
      <ComponentPreview name="flag-sizes" />

      <H2>Next to a label</H2>
      <P>
        When the country name is already written next to the flag, add <Code>aria-hidden</Code> so
        screen readers don’t read the name twice.
      </P>
      <ComponentPreview name="flag-with-label" />

      <H2>Country list</H2>
      <P>
        <Code>countries</Code> exports every flag as <Code>{"{ code, name }"}</Code>, sorted by name.
        Use it for country or phone-prefix pickers.
      </P>
      <CodeBlock
        code={`import { countries, Flag } from "@/components/ui/flag"

countries.map((c) => (
  <option key={c.code} value={c.code}>{c.name}</option>
))`}
      />

      <H2>All flags</H2>
      <P>Search by name or code. Hover a flag to copy its snippet.</P>
      <FlagGallery />

      <H2>API reference</H2>
      <H3>Flag</H3>
      <PropsTable
        props={[
          { name: "code", type: "FlagCode | string", description: "ISO 3166-1 alpha-2 code (case-insensitive) or a region code. Typed for autocomplete." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"lg"', description: "16×12, 24×18 or 32×24." },
          { name: "label", type: "string", default: "country name", description: "Accessible name. Override it to localize, e.g. \"Brasil\"." },
          { name: "aria-hidden", type: "boolean", description: "Marks the flag as decorative when the name is already visible." },
          { name: "...props", type: 'React.ComponentProps<"span">', description: "Any other span attribute, e.g. className or title." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ['Country = "Brazil"', 'code="br"'],
          ["Resize to 16×12 / 24×18 / 32×24", 'size="sm" | "md" | "lg"'],
          ["Radius (badge-radius-default)", "--badge-radius-default"],
          ["Variant list", "countries"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>
          By default the flag is an image named after its country (<Code>role=&quot;img&quot;</Code>{" "}
          plus <Code>aria-label</Code>).
        </li>
        <li>
          Don’t use a flag alone to mean a language. Many languages are spoken in several countries,
          so show the language name too.
        </li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            Four flags are broken in Figma: <strong>Aruba, Costa Rica, Martinique and
            Saint-Barthélemy</strong>. Their image is 640×480 inside the 32×24 frame without scaling,
            so only a corner shows. They render correctly in code.
          </li>
          <li>
            Mongolia is named “Flag / 4x3 /mn”. Several names have typos or outdated forms (Kenia,
            Marocco, Mavdives, Mozambik, Makao, Tunis, Vatikan, Swaziland, Macedonia). The code uses
            the correct names.
          </li>
          <li>
            The Figma flags are 640×480 PNGs (about 20KB each, 5MB in total). Code uses the matching
            SVGs instead. A few colors differ slightly because the Figma images are from an older
            version, e.g. Saudi Arabia’s green. Updating the Figma artwork would align them.
          </li>
        </ul>
      </Callout>
    </>
  )
}
