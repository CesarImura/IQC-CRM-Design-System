import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ModalFooterMatrix, ModalMatrix, ModalScrollMatrix } from "@/components/docs/modal-matrix"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Modal",
  description: "A focused task or confirmation on top of the page.",
}

export default function ModalDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Modal"
        description="A focused task or confirmation on top of the page, over a dimmed, blurred backdrop. Small, Medium or Large; Default or Danger."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1369:21195")} target="_blank" rel="noreferrer">
            Figma: Modal
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="modal-demo" />

      <H2>Variants</H2>
      <P>Size × Intent. Danger only changes the main action to Danger Filled; use it for destructive confirmations.</P>
      <ModalMatrix />

      <H2>Parts</H2>
      <H3>Surface</H3>
      <UL>
        <li>Raised surface, 1px border at white 8%, 4px radius, 24px top padding. Shadow 0 16px 48px black 50%.</li>
        <li>Widths 480 / 640 / 800, never wider than the screen minus 16px on each side.</li>
        <li>Over a Default backdrop (black 50%) with the soft blur.</li>
      </UL>
      <H3>Header</H3>
      <UL>
        <li>Optional label 12px at body color and 70%; title 16px medium white; description 14px at 64%. 4px apart.</li>
        <li>Close: a 16px icon at 40% in a 44px target, vertically centered. 24px sides, 16px below.</li>
      </UL>
      <H3>Body</H3>
      <UL>
        <li>The content slot: 24px sides, 16px between blocks, 14px text at 64%.</li>
        <li>Scroll Auto grows with the content; Fixed caps the body at 384px and scrolls.</li>
      </UL>
      <ModalScrollMatrix />
      <H3>Footer</H3>
      <UL>
        <li>24px padding, 8px between buttons, Medium buttons.</li>
        <li>Double: side by side at the start. Split: at the two ends. Stack: full width, main action first. Single: one full-width action.</li>
      </UL>
      <ModalFooterMatrix />

      <H2>Tokens</H2>
      <TokenTable
        title="Surface"
        rows={[
          ["Fill", "modal-surface"],
          ["Border", "modal-border"],
          ["Radius", "modal-radius"],
          ["Shadow", "modal-shadow"],
          ["Padding", "modal-padding"],
          ["Gap", "modal-gap"],
          ["Width Small / Medium / Large", "modal-width-sm"],
          ["", "modal-width-md"],
          ["", "modal-width-lg"],
          ["Body max height (Fixed)", "modal-body-max-height"],
        ]}
      />
      <TokenTable
        title="Content"
        rows={[
          ["Title", "modal-title"],
          ["Body, description, label", "modal-body"],
          ["Close target", "modal-close-hit"],
          ["Close icon opacity", "modal-close-opacity"],
          ["Backdrop", "backdrop-default"],
          ["Backdrop blur", "backdrop-blur-soft"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Opens with a quick fade and 8px rise; focus moves into the modal and stays there until it closes.</li>
        <li>Esc, the close button or a Cancel action close it, and focus returns to what opened it. Clicking the backdrop also closes it.</li>
        <li>The page behind doesn’t scroll. Title and description are announced when it opens.</li>
        <li>Keep it to one task. Destructive confirmations use the Small size and the Danger intent.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Footer Double aligns the buttons to the start (left), where most dialogs put them at the end. The build follows Figma.</li>
          <li>Status has only one value (Default), so it isn’t a real axis yet.</li>
          <li>The header label uses the body color plus a 70% layer opacity; padding, gap and widths are numbers rather than space tokens.</li>
          <li>The close icon has no hover or focus state in Figma; the build brightens it on hover and adds the focus ring.</li>
        </ul>
      </Callout>
    </>
  )
}
