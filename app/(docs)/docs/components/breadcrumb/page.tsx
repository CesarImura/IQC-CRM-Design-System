import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Breadcrumb",
  description: "Shows where the current page sits in the hierarchy and links back to its ancestors.",
}

export default function BreadcrumbDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Breadcrumb"
        description="Shows where the current page sits in the hierarchy, links back to its ancestors, and can collapse middle levels into a menu."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("712:2360")} target="_blank" rel="noreferrer">
            Figma: Breadcrumb
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="breadcrumb-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/breadcrumb" />
      <P>
        Also installs <Code>@radix-ui/react-dropdown-menu</Code> for the overflow menu. For registry
        setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock
        code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbOverflow,
  BreadcrumbOverflowItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
      />
      <CodeBlock
        className="mt-3"
        code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Contacts</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      />

      <H2>Anatomy</H2>
      <UL>
        <li>
          <Code>Breadcrumb</Code>: the <Code>{"<nav>"}</Code> landmark, labelled “Breadcrumb”.
        </li>
        <li>
          <Code>BreadcrumbList</Code> / <Code>BreadcrumbItem</Code>: the ordered list and its
          entries.
        </li>
        <li>
          <Code>BreadcrumbLink</Code>: an ancestor page (Figma <em>Type = Link</em>).
        </li>
        <li>
          <Code>BreadcrumbPage</Code>: the current page, always last and never a link (Figma{" "}
          <em>Type = Current</em>).
        </li>
        <li>
          <Code>BreadcrumbSeparator</Code>: the “/” between items (Figma <em>Show separator</em>).
        </li>
        <li>
          <Code>BreadcrumbOverflow</Code> + <Code>BreadcrumbOverflowItem</Code>: the “…” trigger
          and the collapsed ancestors in an Option Panel menu.
        </li>
      </UL>

      <H2>Examples</H2>

      <H3>Direct path</H3>
      <P>One level deep: the parent and the current page.</P>
      <ComponentPreview name="breadcrumb-direct" />

      <H3>Collapsed ancestors</H3>
      <P>
        For deep hierarchies, keep the first levels and the current page visible, and collapse the
        middle into <Code>BreadcrumbOverflow</Code>. Click “…” or focus it and press Enter. The menu
        supports arrow keys, Home/End, typeahead and Escape.
      </P>
      <ComponentPreview name="breadcrumb-demo" />

      <H3>With Next.js Link</H3>
      <P>
        Use <Code>asChild</Code> for client-side navigation. This also works for{" "}
        <Code>BreadcrumbOverflowItem</Code>.
      </P>
      <ComponentPreview name="breadcrumb-link" />

      <H3>Long labels</H3>
      <P>
        Labels are cut off with an ellipsis at 200px (<Code>--breadcrumb-item-max-width</Code>). Pass{" "}
        <Code>title</Code> so the full name shows on hover.
      </P>
      <ComponentPreview name="breadcrumb-truncation" />

      <H2>API reference</H2>
      <H3>BreadcrumbLink</H3>
      <PropsTable
        props={[
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Merges the link styles onto its child, e.g. a Next.js <Link>.",
          },
          {
            name: "...props",
            type: 'React.ComponentProps<"a">',
            description: "href, title and every other anchor attribute.",
          },
        ]}
      />
      <H3>BreadcrumbOverflow</H3>
      <PropsTable
        props={[
          {
            name: "label",
            type: "string",
            default: '"Show hidden breadcrumbs"',
            description: "Accessible name of the “…” trigger.",
          },
          {
            name: "open / defaultOpen / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Optional control of the menu (Radix DropdownMenu.Root props).",
          },
        ]}
      />
      <H3>BreadcrumbOverflowItem</H3>
      <PropsTable
        props={[
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Render as its child, typically a link to the ancestor page.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Skipped by keyboard navigation and shown in --content-disabled.",
          },
          {
            name: "onSelect",
            type: "(event: Event) => void",
            description: "Called when the item is chosen with a click or the keyboard.",
          },
        ]}
      />
      <P>
        <Code>Breadcrumb</Code>, <Code>BreadcrumbList</Code>, <Code>BreadcrumbItem</Code>,{" "}
        <Code>BreadcrumbPage</Code> and <Code>BreadcrumbSeparator</Code> accept the props of their
        native element (<Code>nav</Code>, <Code>ol</Code>, <Code>li</Code>, <Code>span</Code>,{" "}
        <Code>li</Code>).
      </P>

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Breadcrumb → Show home / Show parent", "Add or remove BreadcrumbItem + BreadcrumbSeparator"],
          ["Breadcrumb → Show overflow", "BreadcrumbOverflow inside a BreadcrumbItem"],
          ["_Breadcrumb / Item · Type = Link", "BreadcrumbLink"],
          ["_Breadcrumb / Item · Type = Current", "BreadcrumbPage"],
          ["_Breadcrumb / Item · Show separator", "BreadcrumbSeparator"],
          ["Interaction = Hover / Focus / Pressed", ":hover / :focus-visible / :active (automatic)"],
          ["_Breadcrumb / Overflow · Open = True", 'data-state="open" (managed by Radix)'],
          ["Option Panel / Item", "BreadcrumbOverflowItem"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>
          Renders <Code>{'<nav aria-label="Breadcrumb">'}</Code> with an ordered list, so screen
          readers announce the landmark and how many levels there are.
        </li>
        <li>
          The current page uses <Code>aria-current=&quot;page&quot;</Code> and isn’t a link.
        </li>
        <li>Separators are hidden from assistive tech.</li>
        <li>
          The “…” trigger is a real button with an accessible label. Its menu follows the WAI-ARIA
          menu pattern and returns focus to the trigger when it closes.
        </li>
        <li>
          Links and the trigger show the 3px <Code>--focus-ring</Code> only for keyboard focus.
        </li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The “…” trigger underlines on hover, but ancestor links don’t. The code copies this;
            confirm it’s intended.
          </li>
          <li>
            The Option Panel surfaces (panel background, border, item hover) and the open or pressed
            trigger background use raw values instead of variables. They’re named in code (
            <Code>--option-panel-*</Code>, <Code>--breadcrumb-surface-open</Code>) and are worth
            binding in Figma.
          </li>
          <li>
            <Code>--breadcrumb-surface-pressed</Code> equals the canvas color, so a pressed link looks
            identical to hover.
          </li>
        </ul>
      </Callout>
    </>
  )
}
