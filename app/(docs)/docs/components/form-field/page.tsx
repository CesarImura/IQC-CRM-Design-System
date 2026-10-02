import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ChoiceFieldMatrix } from "@/components/docs/choice-field-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FormFieldMatrix, FormFieldTypes } from "@/components/docs/form-field-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

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
        description="Stacked fields with the label inside the control and helper text below. Text, Password, Textarea, Currency, Phone, Radio group and Checkbox group, in two sizes, with warning, error, disabled and read-only states."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2407:6340")} target="_blank" rel="noreferrer">
            Figma: Form Field
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="form-field-demo" />

      <H2>Field types</H2>
      <UL>
        <li>Input: single-line text, with an optional trailing icon.</li>
        <li>Password: the eye button shows and hides the value.</li>
        <li>Textarea: grows with its content and can be resized from the corner.</li>
        <li>Currency: symbol prefix, locale formatting when you leave the field, and a +/− stepper (also ↑/↓ keys).</li>
      </UL>
      <FormFieldTypes />

      <H2>Sizes</H2>
      <P>Small (60px, 14px value) is the default for dense CRM forms. Medium (66px, 16px value) suits standalone forms.</P>
      <ComponentPreview name="form-field-sizes" />

      <H2>States</H2>
      <UL>
        <li>
          <strong className="text-white">Focus</strong>: teal ring, when you Tab into a field.
        </li>
        <li>
          <strong className="text-white">Active</strong>: lighter border, neutral ring and caret, when you click in or type.
        </li>
        <li>
          <strong className="text-white">Warning / Error</strong>: color the frame and the helper and add its icon. They
          override Focus and Active.
        </li>
        <li>
          <strong className="text-white">Read-only</strong>: the value can be copied but not changed.{" "}
          <strong className="text-white">Disabled</strong>: everything greyed out.
        </li>
      </UL>
      <ComponentPreview name="form-field-status" align="start" />

      <H2>All states</H2>
      <P>The Figma matrix: size and content by all eight states, with Hover, Focus and Active forced for comparison.</P>
      <FormFieldMatrix />

      <H2>Radio group and Checkbox group</H2>
      <P>
        One choice or any number, with a caption above the options and the helper below. Warning and Error only change the
        helper; Disabled and Read-only disable every option.
      </P>
      <ComponentPreview name="choice-field-demo" align="start" />
      <H3>Radio group states</H3>
      <ChoiceFieldMatrix type="radio" />
      <H3>Checkbox group states</H3>
      <ChoiceFieldMatrix type="checkbox" />

      <H2>Phone</H2>
      <P>
        A country picker (flag and dial code) with the number, formatted as you type. Open the picker to search by name, code
        or dial code; Suggested countries stay on top.
      </P>
      <ComponentPreview name="phone-field-demo" />

      <H2>Tokens</H2>
      <TokenTable
        title="Layout"
        rows={[
          ["Radius", "form-field-radius"],
          ["Padding x", "form-field-px"],
          ["Padding y, Small", "form-field-py-sm"],
          ["Padding y, Medium", "form-field-py-md"],
          ["Label → value gap", "form-field-gap"],
          ["Label tracking", "form-field-label-tracking"],
        ]}
      />
      <TokenTable
        title="States"
        rows={[
          ["Background", "form-field-bg"],
          ["Background hover", "form-field-bg-hover"],
          ["Background focus / active", "form-field-bg-focus"],
          ["Background read-only", "form-field-bg-readonly"],
          ["Border", "form-field-border"],
          ["Border hover", "form-field-border-hover"],
          ["Border active", "form-field-border-active"],
          ["Ring active", "form-field-ring-active"],
          ["Focus ring", "focus-ring"],
          ["Border disabled", "form-field-border-disabled"],
          ["Warning border", "form-field-warning-border"],
          ["Warning ring", "focus-warning"],
          ["Error border", "form-field-error-border"],
          ["Error ring", "focus-danger"],
          ["Warning text", "warning"],
          ["Error text", "danger"],
        ]}
      />
      <TokenTable
        title="Content"
        rows={[
          ["Value", "content-default"],
          ["Label / helper / placeholder", "content-muted"],
          ["Disabled", "content-disabled"],
          ["Icons", "form-field-icon"],
          ["Prefix divider", "form-field-divider"],
          ["Resize handle", "form-field-resize-handle"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Clicking anywhere in the frame focuses the input; helper and error text are read with the field.</li>
        <li>The password toggle is a button with a name that announces whether the value is shown.</li>
        <li>The currency stepper is mouse-only (skipped by Tab); keyboard users use ↑/↓.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Coming next:</strong> Select, Autocomplete and Date, which need the Option Panel and Date
        Picker.
      </Callout>
      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Focus uses a teal ring, but the Input page description says “white 2px border and green 50% outer ring”. These should be aligned; the build follows the component.</li>
          <li>The Password field has no “hidden” eye icon; the build uses Carbon View--off.</li>
          <li>In Checkbox group, the checked Checkbox instances have their fill overridden to the canvas color, so the black checkmark is invisible. The build uses the real Checkbox (green).</li>
          <li>Radio group options use Radio (14px medium label), while Checkbox group uses Checkbox (16px regular label, 40px rows). The two groups look different side by side.</li>
          <li>Regions without a phone plan (EU, UN, CEFTA) are not in the country list.</li>
          <li>The Active ring and the icon and handle opacities are raw values.</li>
        </ul>
      </Callout>
    </>
  )
}
