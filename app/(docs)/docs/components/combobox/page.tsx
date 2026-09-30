import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComboboxMatrix } from "@/components/docs/combobox-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Combobox",
  description: "Select and Autocomplete: pick from a list, or type and get suggestions.",
}

export default function ComboboxDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Combobox"
        description="Two ways to choose from a list. Select opens the Option Panel from a trigger, with search. Autocomplete is a text field that suggests matches as you type. Small or Medium; Default, Focus, Error and Disabled."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("584:58512")} target="_blank" rel="noreferrer">
            Figma: Combo Box
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("341:17619")} target="_blank" rel="noreferrer">
            Trigger
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <H2>Select</H2>
      <P>One value: the chosen option gets a checkmark and the panel closes. Search filters by name.</P>
      <ComponentPreview name="combobox-select-demo" className="items-start" />
      <H3>Multiple</H3>
      <P>Many values: options get checkboxes and the panel stays open. The trigger shows the first choice and “+N”.</P>
      <ComponentPreview name="combobox-select-multiple" className="items-start" />

      <H2>Autocomplete</H2>
      <P>Type to see matching suggestions; the matched text is highlighted in yellow. Pick one with the arrow keys and Enter, or click.</P>
      <ComponentPreview name="combobox-autocomplete-demo" className="items-start" />

      <H2>Sizes</H2>
      <P>Small: 32px trigger, 14px text and label. Medium: 40px trigger, 16px text and label. The panel items stay Small in both.</P>
      <ComponentPreview name="combobox-sizes" />

      <H2>States</H2>
      <P>Error, Disabled, and the panel’s Loading and Error bodies.</P>
      <ComponentPreview name="combobox-states" />

      <H2>All variants</H2>
      <H3>Select</H3>
      <ComboboxMatrix type="select" />
      <H3>Autocomplete</H3>
      <ComboboxMatrix type="autocomplete" />

      <H2>Parts</H2>
      <H3>Label</H3>
      <UL>
        <li>Medium weight, white; 14/21 on Small, 16/24 on Medium; 4px above the trigger. Disabled: 32%.</li>
      </UL>
      <H3>Trigger</H3>
      <UL>
        <li>Secondary button surface: white 4% fill, 8% border, 2px radius, 16px background blur.</li>
        <li>Value at 70%; 80% while open. Optional 16px leading icon; chevron on Select.</li>
        <li>Hover: border 12%. Open: border 12%. Open + Hover: fill 8%.</li>
        <li>Focus: 3px teal ring. Error: no fill, red border, red 3px ring at 50%, red text and a red error icon.</li>
        <li>Disabled: no fill, border 4%, text 32%.</li>
      </UL>
      <H3>Panel</H3>
      <UL>
        <li>The Option Panel opens 8px below, as wide as the trigger. See Option Panel for items and states.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Trigger"
        rows={[
          ["Height Small / Medium", "button-size-sm-height"],
          ["", "button-size-md-height"],
          ["Padding x Small / Medium", "button-size-sm-padding-x"],
          ["", "button-size-md-padding-x"],
          ["Gap", "button-spacing-gap"],
          ["Radius", "button-radius-control"],
          ["Fill", "button-secondary-bg-default"],
          ["Fill open", "button-secondary-bg-hover"],
          ["Fill open + hover", "button-secondary-bg-pressed"],
          ["Border", "button-secondary-border-default"],
          ["Border hover / open", "button-secondary-border-active"],
          ["Border disabled", "button-secondary-border-disabled"],
          ["Value", "combobox-value"],
          ["Value open", "combobox-value-active"],
          ["Disabled text", "button-neutral-content-disabled"],
          ["Focus ring", "focus-ring"],
          ["Error border", "form-field-error-border"],
          ["Error ring", "focus-danger"],
          ["Error text / icon", "button-danger-content-default"],
          ["Background blur", "combobox-blur"],
        ]}
      />
      <TokenTable
        title="Layout"
        rows={[
          ["Label", "combobox-label"],
          ["Label → trigger", "combobox-label-gap"],
          ["Trigger → panel", "combobox-panel-offset"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Select: Enter, Space or ↓ opens; type to search; ↑ ↓ move, Enter picks, Esc closes and returns focus.</li>
        <li>Autocomplete: suggestions open as you type; ↑ ↓ move, Enter picks, Esc closes. Your typed text is kept if you don’t pick.</li>
        <li>Disabled options are skipped. Keyboard focus shows the ring; clicks don’t.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Autocomplete uses the Trigger with a Calendar icon. The build uses a Search icon and a real text field.</li>
          <li>Some Autocomplete variants (Small Disabled, Medium Open + Hover) lose the 8px gap between the icon and the text.</li>
          <li>In Select Medium Error Open, “Placeholder Text” wraps to two lines inside the 40px trigger.</li>
          <li>Medium comboboxes still use Small (14px) panel items.</li>
          <li>Select Open examples show the panel inline under the trigger; in the build it floats 8px below.</li>
        </ul>
      </Callout>
    </>
  )
}
