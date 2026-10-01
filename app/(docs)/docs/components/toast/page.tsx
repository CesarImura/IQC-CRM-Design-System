import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Toast",
  description: "Short, temporary feedback after an action, in six tones.",
}

export default function ToastDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Toast"
        description="Short, temporary feedback after an action: saved, failed, or still working. Six tones, each with its own layout. Toasts stack in the bottom-right corner and close on their own."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2531:4299")} target="_blank" rel="noreferrer">
            Figma: Toast
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Try them: each button shows a real toast. Hover the stack to pause the timers and expand it.</P>
      <ComponentPreview name="toast-demo" />

      <H2>Tones</H2>
      <ComponentPreview name="toast-tones" />
      <UL>
        <li>
          <strong className="text-white">Neutral:</strong> one line of text at 70%. For simple confirmations.
        </li>
        <li>
          <strong className="text-white">Loading:</strong> spinning icon and text; stays until it’s replaced by the result (usually
          Success or Error).
        </li>
        <li>
          <strong className="text-white">Info:</strong> icon tile, title and description. No action.
        </li>
        <li>
          <strong className="text-white">Success, Warning, Error:</strong> tinted icon tile, title, description, and an optional
          action such as Undo or Retry.
        </li>
      </UL>

      <H2>Optional parts</H2>
      <P>Description, action and close button can each be left out.</P>
      <ComponentPreview name="toast-options" />

      <H2>Parts</H2>
      <H3>Surface</H3>
      <UL>
        <li>409px wide, 4px radius, 1px border at white 5%, #1e2120 fill.</li>
        <li>Neutral and Loading: 16 / 12px padding. Info, Success, Warning, Error: 12px padding. 16px between parts.</li>
      </UL>
      <H3>Content</H3>
      <UL>
        <li>Icon tile: 40px, 2px radius, tinted at 10% (Info 5% white), with a 24px filled icon.</li>
        <li>Title 14px medium white, 1.3 line height. Description 14px at 50%. Neutral / Loading text 14px regular at 70%.</li>
        <li>Action: Small Secondary button. Close: 32px icon button with a 16px × at 50%. 8px apart.</li>
      </UL>
      <H3>Progress</H3>
      <UL>
        <li>1px line along the bottom edge in the tone color (white for Neutral, Loading and Info). It shrinks as the toast’s time runs out.</li>
        <li>Loading has no end, so its line moves back and forth instead.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Surface"
        rows={[
          ["Fill", "toast-surface"],
          ["Border", "toast-border"],
          ["Border width", "toast-stroke"],
          ["Radius", "toast-radius"],
          ["Width", "toast-width"],
          ["Padding x (Neutral, Loading)", "toast-padding-x"],
          ["Padding", "toast-padding-inset"],
          ["Gap", "toast-gap"],
          ["Gap, actions", "toast-gap-tight"],
        ]}
      />
      <TokenTable
        title="Content"
        rows={[
          ["Title", "toast-content-title"],
          ["Neutral / Loading text", "toast-content-body"],
          ["Description", "toast-content-description"],
          ["Title size", "toast-font-title"],
          ["Description size", "toast-font-description"],
          ["Loading icon opacity", "toast-opacity-leading"],
          ["Info icon opacity", "toast-opacity-icon"],
          ["Icon tile radius", "toast-radius-icon"],
          ["Tile, Info", "toast-icon-well-neutral"],
          ["Tile, Success", "toast-icon-well-success"],
          ["Tile, Warning", "toast-icon-well-warning"],
          ["Tile, Error", "toast-icon-well-error"],
          ["Icon, Success", "toast-icon-success"],
          ["Icon, Warning", "toast-icon-warning"],
          ["Icon, Error", "toast-icon-error"],
        ]}
      />
      <TokenTable
        title="Progress"
        rows={[
          ["Neutral, Loading, Info", "toast-progress-neutral"],
          ["Success", "toast-progress-success"],
          ["Warning", "toast-progress-warning"],
          ["Error", "toast-progress-error"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Toasts close after 5 seconds; Loading stays until it’s replaced. Hovering the stack pauses every timer.</li>
        <li>Up to 4 are visible; newer ones stack on top. Swipe right or press the × to dismiss.</li>
        <li>Screen readers announce each toast as it appears. Alt + T moves focus to the stack.</li>
        <li>Clicking an action runs it and closes the toast.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>The progress line is drawn at a fixed 268px (about 65%), so it reads as a snapshot. The build animates it over the toast’s duration.</li>
          <li>The Loading icon is static in Figma; the build spins it anticlockwise, like the button loader.</li>
          <li>Info has a close button but no action slot, unlike Success, Warning and Error.</li>
          <li>The Error tile uses #d73a3c while the icon and progress use #ff4951.</li>
        </ul>
      </Callout>
    </>
  )
}
