import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { InputMatrix } from "@/components/docs/input-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Input",
  description: "Single-line text input, 32px or 40px, with optional icons.",
}

export default function InputDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Input"
        description="The plain single-line text input, for search bars, toolbars and compact forms. Small or Medium, with optional leading and trailing icons."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("584:60525")} target="_blank" rel="noreferrer">
            Figma: Input
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>
        Click into a field to see Active; Tab into one to see Focus. For a field with its label inside and helper text below, use{" "}
        <Link href="/docs/components/form-field" className="text-brand underline-offset-4 hover:underline">
          Form Field
        </Link>
        .
      </P>
      <ComponentPreview name="input-demo" />

      <H2>Sizes and states</H2>
      <ComponentPreview name="input-states" />

      <H2>All variants</H2>
      <P>The Figma matrix: Size × State, at rest and on hover.</P>
      <InputMatrix />

      <H2>States</H2>
      <UL>
        <li>
          <strong className="text-white">Default:</strong> white 5% fill, no border, placeholder at 50%.
        </li>
        <li>
          <strong className="text-white">Hover:</strong> neutral-500 (#6e6f6f) border, placeholder at 70%.
        </li>
        <li>
          <strong className="text-white">Focus</strong> (keyboard): no fill, 3px teal ring, text at 90%.
        </li>
        <li>
          <strong className="text-white">Active</strong> (editing): 2% fill, neutral-500 (#6e6f6f) border, 3px white ring at 12%, white text. You’re
          in Active after clicking in, or as soon as you type after tabbing in.
        </li>
        <li>
          <strong className="text-white">Error:</strong> no fill, 1.5px red border and a red 3px ring at 50%. Stays red while
          focused.
        </li>
        <li>
          <strong className="text-white">Disabled:</strong> 5% fill, 16% border, text at 32%.
        </li>
        <li>
          <strong className="text-white">Read-only:</strong> 5% fill, text at 50%, no icons and no hover.
        </li>
      </UL>

      <H2>Anatomy</H2>
      <H3>Small</H3>
      <UL>
        <li>32px tall, 12px side padding, 14/21 text.</li>
      </UL>
      <H3>Medium</H3>
      <UL>
        <li>40px tall, 12px side padding, 16/24 text.</li>
      </UL>
      <H3>Both</H3>
      <UL>
        <li>2px radius, 8px between icon and text, 16px icons.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Height Small / Medium", "input-height-sm"],
          ["", "input-height-md"],
          ["Padding x", "input-px"],
          ["Radius", "form-field-radius"],
          ["Fill", "input-bg"],
          ["Fill, Active", "input-bg-active"],
          ["Border hover / Active", "input-border-hover"],
          ["Border disabled", "input-border-disabled"],
          ["Ring, Focus", "focus-ring"],
          ["Ring, Active", "input-ring-active"],
          ["Error border", "form-field-error-border"],
          ["Error border width", "input-border-error-width"],
          ["Error ring", "focus-danger"],
          ["Placeholder", "input-placeholder"],
          ["Placeholder hover", "input-placeholder-hover"],
          ["Text", "input-text"],
          ["Text, Active", "input-text-active"],
          ["Icons", "input-icon"],
          ["Disabled", "content-disabled"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Clicking anywhere in the frame (icons, padding) focuses the field.</li>
        <li>Give each input a visible label nearby or an accessible name; the placeholder is not a label.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Medium Focus uses 14/21 text instead of 16/24.</li>
          <li>The Active Small variants have a hard-coded “Placeholder text” instead of the Text property.</li>
          <li>The Error border is 1.5px while every other state uses 1px, so the text shifts by half a pixel.</li>
          <li>Fill, hover border, Active ring and text opacities are raw values; only the Active fill (bg/hover) and focus rings are variables.</li>
        </ul>
      </Callout>
    </>
  )
}
