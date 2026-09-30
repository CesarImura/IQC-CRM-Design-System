import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ButtonMatrix } from "@/components/docs/button-matrix"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

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

      <H2>Styles</H2>
      <P>Pick one style per action based on its weight. Keep a single Primary button per view or section.</P>
      <H3>Primary</H3>
      <P>The main action on the page: save, create, confirm.</P>
      <ComponentPreview name="button-primary" />
      <H3>Secondary</H3>
      <P>Supporting actions next to a Primary, or standalone in toolbars.</P>
      <ComponentPreview name="button-secondary" />
      <H3>Ghost</H3>
      <P>Low-emphasis actions: cancel, dismiss, inline table actions.</P>
      <ComponentPreview name="button-ghost" />
      <H3>Danger Filled</H3>
      <P>Confirms a destructive action, usually inside a confirmation dialog.</P>
      <ComponentPreview name="button-danger" />
      <H3>Danger Outline</H3>
      <P>Starts a destructive flow without making it the most prominent action.</P>
      <ComponentPreview name="button-danger-outline" />

      <H2>Sizes</H2>
      <P>Small (32px) for dense tables and toolbars, Medium (40px) as the default, Large (48px) for prominent calls to action.</P>
      <ComponentPreview name="button-sizes" />

      <H2>Icons</H2>
      <P>A leading or trailing IBM Carbon icon: 16px on Small and Medium, 24px on Large.</P>
      <ComponentPreview name="button-with-icon" />
      <H3>Icon only</H3>
      <P>Square, with the same styles and sizes. Always has an accessible name.</P>
      <ComponentPreview name="button-icon" />

      <H2>Loading and disabled</H2>
      <P>
        Loading replaces the content with the indicator (turning anticlockwise), keeps the width and blocks clicks. Click
        the first button to try it.
      </P>
      <ComponentPreview name="button-loading" />
      <ComponentPreview name="button-disabled" />

      <H2>All states</H2>
      <P>Every style, size and state, laid out like the Figma matrix. Hover, press and Tab through them for the interactive states.</P>
      <ButtonMatrix />

      <H2>Tokens</H2>
      <TokenTable
        title="Shape and size"
        rows={[
          ["Corner radius", "button-radius-control"],
          ["Border width", "button-stroke-default"],
          ["Icon–label gap", "button-spacing-gap"],
          ["Small height", "button-size-sm-height"],
          ["Small padding", "button-size-sm-padding-x"],
          ["Small icon", "button-size-sm-icon"],
          ["Medium height", "button-size-md-height"],
          ["Medium padding", "button-size-md-padding-x"],
          ["Medium icon", "button-size-md-icon"],
          ["Large height", "button-size-lg-height"],
          ["Large padding", "button-size-lg-padding-x"],
          ["Large icon", "button-size-lg-icon"],
        ]}
      />
      <TokenTable
        title="Primary"
        rows={[
          ["Background", "button-primary-bg-default"],
          ["Hover", "button-primary-bg-hover"],
          ["Pressed", "button-primary-bg-pressed"],
          ["Disabled", "button-primary-bg-disabled"],
          ["Label", "button-filled-content-default"],
          ["Label, disabled", "button-filled-content-disabled"],
        ]}
      />
      <TokenTable
        title="Secondary and Ghost"
        rows={[
          ["Secondary background", "button-secondary-bg-default"],
          ["Secondary pressed", "button-secondary-bg-pressed"],
          ["Secondary border", "button-secondary-border-default"],
          ["Secondary border, hover / pressed", "button-secondary-border-active"],
          ["Secondary border, disabled", "button-secondary-border-disabled"],
          ["Ghost pressed", "button-ghost-bg-pressed"],
          ["Label", "button-neutral-content-default"],
          ["Label, disabled", "button-neutral-content-disabled"],
        ]}
      />
      <TokenTable
        title="Danger"
        rows={[
          ["Filled background", "button-danger-bg-default"],
          ["Filled hover", "button-danger-bg-hover"],
          ["Filled pressed", "button-danger-bg-pressed"],
          ["Filled disabled", "button-danger-bg-disabled"],
          ["Outline border and label", "button-danger-content-default"],
          ["Outline hover", "button-danger-bg-subtle-hover"],
          ["Outline pressed", "button-danger-bg-subtle-pressed"],
          ["Outline disabled", "button-danger-content-disabled"],
        ]}
      />
      <TokenTable
        title="Focus"
        rows={[
          ["Ring", "focus-ring"],
          ["Ring, danger styles", "focus-danger"],
          ["Ring width", "focus-spread"],
          ["Inner stroke on filled styles", "focus-stroke-on-fill"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The focus ring only appears for keyboard focus, never on mouse click.</li>
        <li>Enter and Space activate it. Loading and disabled buttons ignore clicks and key presses.</li>
        <li>A button that navigates to another page is rendered as a link but keeps the same look.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> in the Loading variants the leading and trailing icons stay
        visible while the label is hidden; the build hides all content and shows only the indicator. Ghost Hover is identical
        to Ghost Default.
      </Callout>
    </>
  )
}
