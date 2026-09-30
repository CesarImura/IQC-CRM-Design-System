import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { BadgeMatrix } from "@/components/docs/badge-matrix"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Badge",
  description: "Short labels for categories, roles and metadata, plus DeltaBadge for metric changes.",
}

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

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/badge" />
      <P>
        For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { Badge, DeltaBadge } from "@/components/ui/badge"`} />
      <CodeBlock className="mt-3" code={`<Badge color="blue">Admin</Badge>`} />

      <H2>Styles</H2>
      <P>
        <Code>filled</Code> (default) for most labels, <Code>outline</Code> for quieter or removable
        tags, and <Code>ghost</Code> for inline text-level labels.
      </P>
      <ComponentPreview name="badge-variants" />

      <H2>Sizes</H2>
      <P>
        <Code>sm</Code> (12px text) for dense tables, <Code>md</Code> (14px, default), and{" "}
        <Code>lg</Code> (16px). Icons scale with the size: 12, 16 and 20px.
      </P>
      <ComponentPreview name="badge-sizes" />

      <H2>Dot, icon and remove</H2>
      <P>
        <Code>dot</Code> adds the square status mark. Put an icon before the label as a child.{" "}
        <Code>onDismiss</Code> adds a remove button; give it a <Code>dismissLabel</Code> such as
        “Remove Fintech”. Try removing the tags below.
      </P>
      <ComponentPreview name="badge-anatomy" />

      <H2>Delta</H2>
      <P>
        <Code>DeltaBadge</Code> shows a metric change with an arrow. Green means up, red down, gray
        flat, picked from the sign of the text. Set <Code>tone</Code> when a rise is bad news. The
        arrow is announced as “Increase”, “Decrease” or “No change”.
      </P>
      <ComponentPreview name="delta-badge-demo" />

      <H2>All variants</H2>
      <P>Every size, style and color, laid out like the Figma matrix.</P>
      <BadgeMatrix />

      <H2>API reference</H2>
      <H3>Badge</H3>
      <PropsTable
        props={[
          { name: "color", type: '"gray" | "white" | "blue" | "green" | "yellow" | "red" | "purple"', default: '"gray"', description: "Maps to the Figma Color property." },
          { name: "variant", type: '"filled" | "outline" | "ghost"', default: '"filled"', description: "Maps to the Figma Style property." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Text, padding and icon size." },
          { name: "dot", type: "boolean", default: "false", description: "Square status mark before the label." },
          { name: "onDismiss", type: "() => void", description: "Shows a remove button that calls this." },
          { name: "dismissLabel", type: "string", default: '"Remove"', description: "Accessible name of the remove button." },
        ]}
      />
      <H3>DeltaBadge</H3>
      <PropsTable
        props={[
          { name: "tone", type: '"positive" | "negative" | "neutral"', default: "from the text", description: "Overrides the color picked from the sign." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Same sizes as Badge." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Color = Gray … Purple", 'color="gray" | … | "purple"'],
          ["Style = Filled / Outline / Ghost", 'variant="filled" | "outline" | "ghost"'],
          ["Size = sm / md / lg", 'size="sm" | "md" | "lg"'],
          ["Square", "dot"],
          ["Icon leading", "icon as the first child"],
          ["Icon / Dismiss", "onDismiss + dismissLabel"],
          ["Badge / Delta · Direction", "DeltaBadge tone (or inferred)"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>Color is never the only signal: the label text carries the meaning.</li>
        <li>The remove button is a real button with its own name and a keyboard focus ring.</li>
        <li>DeltaBadge’s arrow has an accessible name, so the direction is announced.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The Badge / Delta neutral background is a raw <Code>#ffffff0d</Code>, not{" "}
            <Code>--badge-gray-bg</Code> (<Code>#141716</Code>). It’s named{" "}
            <Code>--badge-delta-neutral-bg</Code> in code.
          </li>
          <li>
            The Focus Ring layer inside each badge has a 0px spread, so it never shows. In code the
            remove button gets the standard focus ring.
          </li>
          <li>
            The Value Slot page still uses “Badge (Legacy)”: 15% backgrounds, 1.5 line height and a
            25px height. Code uses the current Badge (16%, 22px).
          </li>
        </ul>
      </Callout>
    </>
  )
}
