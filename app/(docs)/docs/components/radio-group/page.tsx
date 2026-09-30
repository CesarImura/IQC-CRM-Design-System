import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Radio Group",
  description: "One exclusive choice from a short list.",
}

export default function RadioGroupDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Radio Group"
        description="One exclusive choice from a short list. Each option has a label and an optional description, and the whole row is clickable."
      />

      <ComponentPreview name="radio-group-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/radio-group" />
      <P>
        For a labelled field with helper text and validation states, use{" "}
        <Link href="/docs/components/form-field" className="text-brand underline-offset-4 hover:underline">
          RadioGroupField
        </Link>
        , which is built on this.
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`} />
      <CodeBlock
        className="mt-3"
        code={`<RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing">
  <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
  <RadioGroupItem value="yearly" description="Two months free">Yearly</RadioGroupItem>
</RadioGroup>`}
      />

      <H2>API reference</H2>
      <PropsTable
        props={[
          { name: "value / defaultValue", type: "string", description: "RadioGroup: selected option." },
          { name: "onValueChange", type: "(value: string) => void", description: "RadioGroup: called on selection." },
          { name: "disabled", type: "boolean", description: "RadioGroup or RadioGroupItem." },
          { name: "children", type: "ReactNode", description: "RadioGroupItem: label (Figma _Label Block label)." },
          { name: "description", type: "ReactNode", description: "RadioGroupItem: second line (Figma _Label Block description)." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Radio · Selection = Unselected / Selected", "value on RadioGroup"],
          ["Interaction = Hover / Pressed / Focus", ":hover / :active / :focus-visible (automatic)"],
          ["Interaction = Disabled", "disabled"],
          ["_Label Block · Label / Description", "children / description"],
          ["Show label = false", "no children + aria-label"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>Built on Radix Radio Group: arrow keys move and select, Tab leaves the group.</li>
        <li>Label the group with <Code>aria-label</Code> or <Code>aria-labelledby</Code>.</li>
        <li>Keyboard focus rings the whole row, as in the Figma Focus variant, without moving the layout.</li>
      </UL>
    </>
  )
}
