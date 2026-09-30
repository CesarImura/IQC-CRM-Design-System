import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Checkbox",
  description: "Select one or more options, including partial selection.",
}

export default function CheckboxDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Checkbox"
        description="Lets users select one or more options. Supports checked, unchecked and indeterminate (partial) selection. The whole 40px row, label included, is clickable."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("660:18085")} target="_blank" rel="noreferrer">
            Figma: Checkbox
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="checkbox-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/checkbox" />
      <P>
        Built on <Code>@radix-ui/react-checkbox</Code>, so it works with forms and the keyboard (Space
        toggles). For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { Checkbox } from "@/components/ui/checkbox"`} />
      <CodeBlock
        className="mt-3"
        code={`<Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v === true)}>
  I agree to the terms
</Checkbox>`}
      />

      <H2>States</H2>
      <P>Hover, press and Tab through them to see the interactive states.</P>
      <ComponentPreview name="checkbox-states" align="start" />

      <H2>Indeterminate</H2>
      <P>
        Use <Code>checked=&quot;indeterminate&quot;</Code> for a parent checkbox when only some children
        are selected, like the select-all checkbox in a table.
      </P>
      <ComponentPreview name="checkbox-group" align="start" />

      <H2>API reference</H2>
      <PropsTable
        props={[
          { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled value. Maps to the Figma Selection property." },
          { name: "defaultChecked", type: 'boolean | "indeterminate"', description: "Uncontrolled initial value." },
          { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', description: "Called when the user toggles it." },
          { name: "disabled", type: "boolean", default: "false", description: "Figma Interaction = Disabled." },
          { name: "children", type: "ReactNode", description: "Label. Without it, pass aria-label." },
          { name: "name / value / required", type: "string / string / boolean", description: "Native form attributes." },
          { name: "rowClassName", type: "string", description: "Classes for the clickable row. className styles the 20px box." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Selection = Unchecked / Checked / Indeterminate", 'checked={false | true | "indeterminate"}'],
          ["Interaction = Hover / Pressed / Focus", ":hover / :active / :focus-visible (automatic)"],
          ["Interaction = Disabled", "disabled"],
          ["Label", "children"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>The control and its label are one &lt;label&gt;, so clicking the text toggles it.</li>
        <li>Indeterminate is announced as “mixed” by screen readers.</li>
        <li>Keyboard focus rings the whole row, matching Figma.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong> in the Focus variants the row
        gains 8px of side padding, which would shift the layout on focus. Code draws the ring outside
        the row instead, so nothing moves.
      </Callout>
    </>
  )
}
