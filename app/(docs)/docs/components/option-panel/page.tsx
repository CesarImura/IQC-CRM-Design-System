import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { OptionItemMatrix } from "@/components/docs/option-item-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Option Panel",
  description: "The floating list behind Select, Autocomplete, menus and pickers.",
}

export default function OptionPanelDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Option Panel"
        description="The floating list used by Select, Autocomplete, the breadcrumb menu and the phone country picker. Optional search, group labels, and items with tones, checkmarks or checkboxes."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("527:29045")} target="_blank" rel="noreferrer">
            Figma: Option Panel
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("338:17523")} target="_blank" rel="noreferrer">
            Item
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Hover or use the arrow keys to move through the items.</P>
      <ComponentPreview name="option-panel-demo" className="items-start" />

      <H2>States</H2>
      <P>Results, Empty (no matches for the search), Loading and Error.</P>
      <ComponentPreview name="option-panel-states" className="items-start" />

      <H2>Item</H2>
      <UL>
        <li>
          <strong className="text-white">Selection:</strong> None, Checkmark (one value) or Checkbox (many values).
        </li>
        <li>
          <strong className="text-white">Tone:</strong> Neutral, Warning (yellow label) or Danger (red label), for options that need
          attention.
        </li>
        <li>
          <strong className="text-white">Selected:</strong> white 10% fill, medium weight, white label.
        </li>
        <li>
          <strong className="text-white">Matched:</strong> the searched text gets a yellow highlight with black text.
        </li>
        <li>Optional 16px leading icon and secondary text at 60%.</li>
      </UL>
      <OptionItemMatrix />

      <H2>Parts</H2>
      <H3>Panel</H3>
      <UL>
        <li>White 5% fill, 10% border, 2px radius, 4px padding, 100px background blur.</li>
        <li>12px between the search bar and the list; 4px between items.</li>
        <li>Search bar: 32px tall, same surface, search icon in a 32px square.</li>
      </UL>
      <H3>Item</H3>
      <UL>
        <li>Small: 8px padding, 14px text. Medium: 12 / 8px padding, 16px text. 8px gap, 2px radius.</li>
        <li>Label at 90%; hover fill 3% (Neutral), yellow 5% (Warning) or red 5% (Danger).</li>
        <li>Disabled: everything at 32%, no hover.</li>
      </UL>
      <H3>Label</H3>
      <UL>
        <li>Geist Mono, uppercase, 50%. Small: 12px, 8px sides. Medium: 14px, 12 / 4px padding.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Panel"
        rows={[
          ["Fill", "option-panel-bg"],
          ["Border", "option-panel-border"],
          ["Radius", "option-panel-radius"],
          ["Padding", "option-panel-padding"],
          ["Search → list", "option-panel-gap"],
          ["Between items", "option-item-gap"],
          ["Background blur", "option-panel-blur"],
        ]}
      />
      <TokenTable
        title="Item"
        rows={[
          ["Label", "option-item-content"],
          ["Secondary", "option-item-secondary"],
          ["Group label", "option-item-label"],
          ["Warning label", "option-item-warning"],
          ["Danger label", "option-item-danger"],
          ["Hover", "option-item-bg-hover"],
          ["Hover, Warning", "option-item-bg-hover-warning"],
          ["Hover, Danger", "option-item-bg-hover-danger"],
          ["Selected", "option-item-bg-selected"],
          ["Match highlight", "option-item-match-highlight"],
          ["Match text", "option-item-match-content"],
          ["Checkbox border", "checkbox-border-default"],
          ["Checkbox border, highlighted", "checkbox-border-hover"],
          ["Checkbox checked", "checkbox-fill-selected"],
          ["Checkbox disabled (checked)", "checkbox-fill-disabled"],
          ["Disabled", "content-disabled"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>↑ ↓ move (wrapping at the ends), Enter picks; disabled items are skipped.</li>
        <li>Typing in the search filters the list; nothing found shows the Empty state with the search text.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The description mentions a Loading state, but the set has no Loading variant. The build adds one with the loading indicator.</li>
          <li>Selected Checkbox items still show an empty checkbox. The build checks it, using the same mark and colors as Checkbox.</li>
          <li>The checkbox inside items is the 20px Checkbox scaled to 16.67px, so its border and radius land on fractions (0.83px, 3.33px).</li>
          <li>Selected items drop the Warning / Danger label color.</li>
          <li>Panel fill, border, hover fills and the Danger label color are raw values; option-item-match-highlight is the only variable.</li>
        </ul>
      </Callout>
    </>
  )
}
