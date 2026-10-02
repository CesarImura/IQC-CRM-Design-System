import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ChoiceFieldMatrix } from "@/components/docs/choice-field-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FormFieldMatrix, FormFieldTypes } from "@/components/docs/form-field-matrix"
import { PickerFieldMatrix } from "@/components/docs/picker-field-matrix"
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
        <li>Select, Autocomplete and Date: pick from the Option Panel or a calendar that opens 8px below the control.</li>
        <li>Phone, Radio group, Checkbox group and Toggle: see their sections below.</li>
      </UL>
      <FormFieldTypes />

      <H2>Sizes</H2>
      <P>Small (63px, 14/21 value) is the default for dense CRM forms. Medium (68px, 16/20 value) suits standalone forms.</P>
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

      <H2>Select, Autocomplete and Date</H2>
      <P>
        The same control with a panel underneath. Active is the open panel (and, for Autocomplete, typing). The chevron flips while
        Select is open; Date opens a calendar as wide as the field.
      </P>
      <ComponentPreview name="select-field-demo" align="start" />
      <H3>Select states</H3>
      <PickerFieldMatrix type="select" />
      <H3>Autocomplete states</H3>
      <PickerFieldMatrix type="autocomplete" />
      <H3>Date states</H3>
      <PickerFieldMatrix type="date" />

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

      <H2>Toggle</H2>
      <P>
        One on / off setting: caption, switch and helper. Warning and Error only change the helper; Disabled and Read-only show
        the switch disabled. See Toggle for the switch itself.
      </P>
      <H3>Toggle states</H3>
      <ChoiceFieldMatrix type="toggle" />

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
        <li>Select and Date open on click, Enter or Space anywhere on the control; Esc closes and returns focus. Autocomplete opens as you type; ↑ ↓ move, Enter picks.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Focus uses a teal ring, but the Input page description says “white 2px border and green 50% outer ring”. These should be aligned; the build follows the component.</li>
          <li>The Password field has no “hidden” eye icon; the build uses Carbon View--off.</li>
          <li>In Checkbox group, the checked Checkbox instances have their fill overridden to the canvas color, so the black checkmark is invisible. The build uses the real Checkbox (green).</li>
          <li>Radio group options use Radio (14px medium label), while Checkbox group uses Checkbox (16px regular label, 40px rows). The two groups look different side by side.</li>
          <li>Regions without a phone plan (EU, UN, CEFTA) are not in the country list.</li>
          <li>The Active ring and the icon and handle opacities are raw values.</li>
          <li>Form Field / Date Active flips the calendar icon upside down (copied from the Select chevron); the build keeps it upright.</li>
          <li>The open variants (Select, Autocomplete, Date) hide the helper text; the build keeps it, and the panel floats over it.</li>
          <li>Form Field / Autocomplete has no trailing icon, unlike Select and Date.</li>
          <li>Form Field / Toggle Read-only uses the Disabled switch, so it can’t be told apart from Disabled except by the helper color.</li>
        </ul>
      </Callout>
    </>
  )
}
