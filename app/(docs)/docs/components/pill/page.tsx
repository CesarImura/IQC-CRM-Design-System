import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PillMatrix } from "@/components/docs/pill-matrix"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

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

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/pill" />
      <P>
        For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { Pill } from "@/components/ui/pill"`} />
      <CodeBlock
        className="mt-3"
        code={`<Pill icon={<UserAvatar />} onDismiss={() => remove(email)}>
  {email}
</Pill>`}
      />
      <P>
        Pill or Badge? A Pill holds a <em>value the user chose</em> and can remove or edit. A{" "}
        <Link href="/docs/components/badge" className="text-brand underline-offset-4 hover:underline">
          Badge
        </Link>{" "}
        labels something the system assigned, like a role or status. Pills are fully rounded; badges
        have 2px corners.
      </P>

      <H2>Colors</H2>
      <P>
        The same seven colors as Badge. The leading icon is drawn in the pill’s color at 50% opacity.
      </P>
      <ComponentPreview name="pill-colors" />

      <H2>Sizes</H2>
      <P>
        <Code>sm</Code> (22px), <Code>md</Code> (28px, default) and <Code>lg</Code> (36px). The
        remove button’s hit area is 20, 24 and 28px, and icons are 12, 16 and 18px.
      </P>
      <ComponentPreview name="pill-sizes" />

      <H2>Clickable</H2>
      <P>
        Pass <Code>onClick</Code> to make the label a button, e.g. to open the filter for editing.
        The label and the × are separate buttons, so each has its own action and keyboard stop.
        Hovering the pill adds a light overlay and pressing darkens it. Keyboard focus rings the
        whole pill.
      </P>
      <ComponentPreview name="pill-clickable" />

      <H2>Disabled</H2>
      <P>
        <Code>disabled</Code> greys out the label and icons, blocks clicks and disables the buttons.
        Use it for values the user can see but can’t change.
      </P>
      <ComponentPreview name="pill-disabled" />

      <H2>All variants</H2>
      <P>
        Every color and size, laid out like the Figma matrix. Hover, press and Tab through them to see
        the interactive states.
      </P>
      <PillMatrix />

      <H2>API reference</H2>
      <PropsTable
        props={[
          { name: "color", type: '"gray" | "white" | "blue" | "green" | "yellow" | "red" | "purple"', default: '"gray"', description: "Maps to the Figma Color property." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Maps to the Figma Size property." },
          { name: "icon", type: "ReactNode", description: "Leading icon (Figma Icon / Leading)." },
          { name: "onClick", type: "(event) => void", description: "Makes the label a button." },
          { name: "onDismiss", type: "() => void", description: "Shows the remove button and calls this." },
          { name: "dismissLabel", type: "string", default: '"Remove {text}"', description: "Accessible name of the remove button." },
          { name: "disabled", type: "boolean", default: "false", description: "Figma State = Disabled." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Color = Gray … Purple", 'color="gray" | … | "purple"'],
          ["Size = sm / md / lg", 'size="sm" | "md" | "lg"'],
          ["State = Hover / Pressed / Focus", ":hover / :active / :focus-visible (automatic)"],
          ["State = Disabled", "disabled"],
          ["Icon / Leading", "icon"],
          ["Dismiss", "onDismiss"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>The remove button is named after the value, e.g. “Remove user@email.com”.</li>
        <li>Its hit area follows the Figma hit sizes (20, 24 and 28px) even though the icon is smaller.</li>
        <li>Long values are cut off with an ellipsis. Pass <Code>title</Code> to show the full value on hover.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            Pill colors use a separate <Code>color/*</Code> variable collection with the same values
            as <Code>badge-*</Code>. Code reuses the badge tokens. Consider merging the collections.
          </li>
          <li>
            The hover and pressed overlays (6% white, 16% black) and the lg icon size (18px) aren’t
            variables. They’re named in code as <Code>--pill-overlay-*</Code> and{" "}
            <Code>--pill-icon-lg</Code>.
          </li>
        </ul>
      </Callout>
    </>
  )
}
