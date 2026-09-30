import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { FormFieldMatrix, FormFieldTypes } from "@/components/docs/form-field-matrix"
import { PropsTable } from "@/components/docs/props-table"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Form Field",
  description: "Stacked form fields with the label inside the control.",
}

export default function FormFieldDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Form Field"
        description="Stacked fields with the label inside the control and helper text below. Text, Password, Textarea and Currency, in two sizes, with warning, error, disabled and read-only states."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2407:6340")} target="_blank" rel="noreferrer">
            Figma: Form Field
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="form-field-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/form-field" />
      <P>
        For registry setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { CurrencyField, PasswordField, TextareaField, TextField } from "@/components/ui/form-field"`} />
      <CodeBlock
        className="mt-3"
        code={`<TextField
  label="Email"
  type="email"
  required
  status={error ? "error" : undefined}
  helper={error ?? "We’ll send the invite here."}
/>`}
      />
      <P>
        Every field accepts the normal input attributes (<Code>name</Code>, <Code>value</Code>,{" "}
        <Code>onChange</Code>, <Code>autoComplete</Code>…), so it works with plain forms, React Hook
        Form or server actions.
      </P>

      <H2>Field types</H2>
      <UL>
        <li>
          <Code>TextField</Code>: Figma Form Field / Input. Add a <Code>trailing</Code> icon when useful.
        </li>
        <li>
          <Code>PasswordField</Code>: the eye button shows and hides the value.
        </li>
        <li>
          <Code>TextareaField</Code>: grows with its content and can be resized from the corner.
        </li>
        <li>
          <Code>CurrencyField</Code>: currency symbol prefix, locale formatting on blur, and the +/−
          stepper (also ↑/↓ keys). Works with numbers through <Code>value</Code> and{" "}
          <Code>onValueChange</Code>.
        </li>
      </UL>
      <FormFieldTypes />

      <H2>Sizes</H2>
      <P>
        <Code>sm</Code> (60px, 14px value) is the default for dense CRM forms. <Code>md</Code> (66px,
        16px value) suits standalone forms.
      </P>
      <ComponentPreview name="form-field-sizes" />

      <H2>States</H2>
      <P>
        Hover, Focus and Active are automatic. <strong className="text-white">Focus</strong> (teal
        ring) appears when you Tab into a field. <strong className="text-white">Active</strong>{" "}
        (lighter border, neutral ring, blinking caret) means you’re editing: you clicked into the
        field or started typing. <Code>status=&quot;warning&quot;</Code> and{" "}
        <Code>status=&quot;error&quot;</Code> color the frame and the helper and add its icon.{" "}
        <Code>readOnly</Code> shows a value the user can copy but not change. <Code>disabled</Code>{" "}
        greys everything out.
      </P>
      <ComponentPreview name="form-field-status" align="start" />

      <H2>All states</H2>
      <P>
        The Figma matrix: size and content by all eight states. Hover, Focus and Active are forced
        here with <Code>visualState</Code> so they can be compared side by side.
      </P>
      <FormFieldMatrix />

      <H2>Custom controls</H2>
      <P>
        <Code>FormField</Code> is the frame by itself. Put <Code>FieldInput</Code>,{" "}
        <Code>FieldTextarea</Code> or your own element inside, and read the id, size and state with{" "}
        <Code>useField()</Code>.
      </P>
      <CodeBlock
        code={`<FormField label="Deal code" helper="Format DL-0000" prefix="DL-" trailing={<Barcode />}>
  <FieldInput placeholder="2041" inputMode="numeric" />
</FormField>`}
      />

      <H2>API reference</H2>
      <H3>Shared props (all fields and FormField)</H3>
      <PropsTable
        props={[
          { name: "label", type: "ReactNode", description: "Caption inside the control (uppercase)." },
          { name: "helper", type: "ReactNode", description: "Text under the control. Linked with aria-describedby." },
          { name: "size", type: '"sm" | "md"', default: '"sm"', description: "Maps to the Figma Size property." },
          { name: "status", type: '"warning" | "error"', description: "Figma State = Warning / Error. Error also sets aria-invalid." },
          { name: "required", type: "boolean", description: "Red asterisk and the native required attribute." },
          { name: "disabled / readOnly", type: "boolean", description: "Figma State = Disabled / Read-only." },
          { name: "id", type: "string", description: "Input id. Generated when omitted." },
        ]}
      />
      <H3>CurrencyField</H3>
      <PropsTable
        props={[
          { name: "value / defaultValue", type: "number | null", description: "Numeric value. null is empty." },
          { name: "onValueChange", type: "(value: number | null) => void", description: "Called after blur, stepper or arrow keys." },
          { name: "currency", type: "string", default: '"$"', description: "Symbol before the value, e.g. \"R$\"." },
          { name: "locale", type: "string", default: "user locale", description: "Formatting locale, e.g. \"pt-BR\"." },
          { name: "fractionDigits", type: "number", default: "2", description: "Decimal places." },
          { name: "step / min / max", type: "number", default: "1", description: "Stepper increment and limits." },
          { name: "hideStepper", type: "boolean", default: "false", description: "Hide the +/− buttons." },
        ]}
      />
      <H3>FormField</H3>
      <PropsTable
        props={[
          { name: "prefix", type: "ReactNode", description: "Before the value, with a divider (currency, dial code)." },
          { name: "trailing", type: "ReactNode", description: "After the value (icon or small button)." },
          { name: "aside", type: "ReactNode", description: "Absolutely positioned on the right edge (e.g. a stepper)." },
          { name: "open", type: "boolean", description: "Open dropdown: forces Active (used by Select, Date…)." },
          { name: "visualState", type: '"hover" | "focus" | "active"', description: "Forces a state for docs and visual tests. Leave unset in apps." },
        ]}
      />

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["State = Default / Hover", "automatic (:hover)"],
          ["State = Focus", "automatic: keyboard focus (Tab)"],
          ["State = Active", "automatic: pointer focus or typing; open for dropdowns"],
          ["State = Warning / Error", 'status="warning" | "error"'],
          ["State = Disabled / Read-only", "disabled / readOnly"],
          ["Size = Small / Medium", 'size="sm" | "md"'],
          ["Content = Empty / Filled", "automatic (placeholder vs value)"],
          ["_Form Field / Helper · Tone", "follows status"],
          ["Required", "required"],
          ["Show currency", "CurrencyField (prefix)"],
          ["_Form Field / Stepper", "CurrencyField stepper"],
          ["Multiline + Expandable", "TextareaField"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>The caption is a real &lt;label&gt;; clicking anywhere in the frame focuses the input.</li>
        <li>Helper text is linked with <Code>aria-describedby</Code>; errors set <Code>aria-invalid</Code>.</li>
        <li>The password toggle is a button with a name and <Code>aria-pressed</Code>.</li>
        <li>The currency stepper is mouse-only (skipped by Tab); keyboard users use ↑/↓.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Coming next on this page:</strong> Radio group, Checkbox group
        and Phone (batch 2), then Select, Autocomplete and Date (batch 3, which need the Option Panel
        and Date Picker).
      </Callout>
      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            Focus uses a teal ring, but the Input page description says “white 2px border and green
            50% outer ring”. These should be aligned; code follows the Form Field component.
          </li>
          <li>The Password field has no “hidden” eye icon; code uses Carbon View--off.</li>
          <li>
            Read-only background, the Active border and ring, and the icon and handle opacities are
            raw values. They’re named in code as <Code>--form-field-*</Code>.
          </li>
        </ul>
      </Callout>
    </>
  )
}
