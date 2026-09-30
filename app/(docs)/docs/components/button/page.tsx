import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ButtonMatrix } from "@/components/docs/button-matrix"
import { CodeBlock } from "@/components/docs/code-block"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Button",
  description: "Triggers an action. Five styles, three sizes, icon-only and loading states.",
}

export default function ButtonPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Button"
        description="Triggers an action. Use concise, verb-first labels. Destructive actions use the Danger styles."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1301:2522")} target="_blank" rel="noreferrer">
            Figma: Button
            <Launch />
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1339:2612")} target="_blank" rel="noreferrer">
            Figma: Icon Only
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="button-demo" />

      <H2>Installation</H2>
      <P>
        Add the component with the shadcn CLI. This also installs the IQ tokens and the{" "}
        <Code>cn</Code> helper if your project doesn’t have them yet. Setup is covered in{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/button" />

      <H2>Usage</H2>
      <CodeBlock
        code={`import { Button } from "@/components/ui/button"`}
      />
      <CodeBlock
        className="mt-3"
        code={`<Button variant="secondary">Export</Button>`}
      />

      <H2>Styles</H2>
      <P>
        Pick one style per action based on its weight. Keep a single <Code>primary</Code> button per
        view or section.
      </P>

      <H3>Primary</H3>
      <P>The main action on the page: save, create, confirm.</P>
      <ComponentPreview name="button-primary" />

      <H3>Secondary</H3>
      <P>Supporting actions that sit next to a primary, or stand alone in toolbars.</P>
      <ComponentPreview name="button-secondary" />

      <H3>Ghost</H3>
      <P>Low-emphasis actions: cancel, dismiss, inline table actions.</P>
      <ComponentPreview name="button-ghost" />

      <H3>Danger</H3>
      <P>Confirms a destructive action, usually inside a confirmation dialog.</P>
      <ComponentPreview name="button-danger" />

      <H3>Danger Outline</H3>
      <P>Starts a destructive flow without making it the most prominent action on the page.</P>
      <ComponentPreview name="button-danger-outline" />

      <H2>Sizes</H2>
      <P>
        <Code>sm</Code> (32px) for dense tables and toolbars, <Code>md</Code> (40px) as the default,{" "}
        <Code>lg</Code> (48px) for prominent standalone calls to action.
      </P>
      <ComponentPreview name="button-sizes" />

      <H2>With icon</H2>
      <P>
        Put a Carbon icon before or after the label as a child. It’s sized automatically: 16px for sm
        and md, 24px for lg.
      </P>
      <ComponentPreview name="button-with-icon" />

      <H2>Icon only</H2>
      <P>
        Use <Code>icon-sm</Code>, <Code>icon</Code> or <Code>icon-lg</Code> for a square button. Always
        give it an <Code>aria-label</Code>.
      </P>
      <ComponentPreview name="button-icon" />

      <H2>Loading</H2>
      <P>
        <Code>loading</Code> swaps the content for the loading indicator, keeps the button’s width so
        the layout doesn’t jump, and blocks clicks. Click the first button to try it.
      </P>
      <ComponentPreview name="button-loading" />

      <H2>Disabled</H2>
      <ComponentPreview name="button-disabled" />

      <H2>As a link</H2>
      <P>
        Use <Code>asChild</Code> to give a link (e.g. Next.js <Code>{"<Link>"}</Code>) button
        styles. Use a link when the action navigates, and a button when it does something on the
        page.
      </P>
      <ComponentPreview name="button-as-link" />

      <H2>All states</H2>
      <P>
        Every style, size and state, laid out like the Figma matrix for QA. Hover, press and Tab
        through the buttons to see the interactive states.
      </P>
      <ButtonMatrix />

      <H2>API reference</H2>
      <PropsTable
        props={[
          {
            name: "variant",
            type: '"primary" | "secondary" | "ghost" | "danger" | "danger-outline"',
            default: '"primary"',
            description: "Visual style. Maps to the Figma Style property.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg" | "icon-sm" | "icon" | "icon-lg"',
            default: '"md"',
            description: "Height, padding, font and icon size. The icon-* sizes are square and correspond to Button / Icon Only.",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Shows the loading indicator, sets aria-busy, keeps the width and ignores clicks.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Native disabled attribute.",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Merges the button styles onto its single child (e.g. <Link>). loading is not supported with asChild.",
          },
          {
            name: "...props",
            type: 'React.ComponentProps<"button">',
            description: "All native button attributes (type, onClick, aria-*, …).",
          },
        ]}
      />
      <P>
        <Code>buttonVariants</Code> is exported too, so you can apply button styles to other
        elements: <Code>{'className={buttonVariants({ variant: "ghost" })}'}</Code>.
      </P>

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Style = Primary / Secondary / Ghost", 'variant="primary" | "secondary" | "ghost"'],
          ["Style = Danger Filled / Danger Outline", 'variant="danger" | "danger-outline"'],
          ["Size = Small / Medium / Large", 'size="sm" | "md" | "lg"'],
          ["Button / Icon Only", 'size="icon-sm" | "icon" | "icon-lg"'],
          ["State = Hover / Pressed / Focus", ":hover / :active / :focus-visible (automatic)"],
          ["State = Disabled", "disabled"],
          ["State = Loading", "loading"],
          ["Leading / Trailing icon", "Icon placed before / after the label"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>Renders a native <Code>{"<button>"}</Code>, so Enter and Space work out of the box.</li>
        <li>
          Focus shows a 3px ring (<Code>--focus-ring</Code>, or <Code>--focus-danger</Code> on danger
          styles) only when using the keyboard, via <Code>:focus-visible</Code>.
        </li>
        <li>
          Loading sets <Code>aria-busy</Code> and announces “Loading” to screen readers.
        </li>
        <li>Icon-only buttons need an <Code>aria-label</Code>.</li>
        <li>
          Set <Code>type=&quot;button&quot;</Code> on buttons inside forms that shouldn’t submit
          them.
        </li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong> in the Loading variants, the
        leading and trailing icons are still visible while the label is hidden. The code hides all the
        content and shows only the loading indicator. Ghost Hover is also identical to Default, so
        the code matches that for now.
      </Callout>
    </>
  )
}
