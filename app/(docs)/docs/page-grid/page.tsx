import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Page Grid",
  description: "The four content widths for CRM screens: Full, Default, Reduced and Narrow.",
}

const rows = [
  { name: "Full", size: "1616 · edge to edge", padding: "0", use: "Screens that are only a full-width table (lists, pipelines)." },
  { name: "Default", size: "1504", padding: "56 on every side", use: "Ordinary screens: analytics, cards and tables together." },
  { name: "Reduced", size: "1120 · centered", padding: "48 top and bottom", use: "Screens without data analytics (record details, forms with context)." },
  { name: "Narrow", size: "688 · centered", padding: "48 top and bottom", use: "Settings and sensitive flows (security, billing, confirmations)." },
]

export default function PageGridDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Page Grid"
        description="Every screen picks one of four content widths inside the app column (1616px on a 1920 screen, next to the 48px top bar and 304px nav). Blocks inside stack with 48px gaps."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2906:210")} target="_blank" rel="noreferrer">
            Figma: Page Grid
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("2186:13312")} target="_blank" rel="noreferrer">
            Use cases
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Switch the width and the screen size. The teal outline is the app column; the dashed blocks are the screen’s content.</P>
      <ComponentPreview name="page-grid-demo" className="block p-4 sm:p-6" />

      <H2>Widths</H2>
      <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-grid bg-white/[0.02] text-xs tracking-wider text-white/40 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Width</th>
              <th scope="col" className="px-4 py-3 font-medium">Content at 1920</th>
              <th scope="col" className="px-4 py-3 font-medium">Padding</th>
              <th scope="col" className="px-4 py-3 font-medium">Use for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grid text-white/70">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="px-4 py-3 font-medium text-white">{r.name}</td>
                <td className="px-4 py-3 tabular-nums">{r.size}</td>
                <td className="px-4 py-3">{r.padding}</td>
                <td className="px-4 py-3">{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Smaller screens</H2>
      <UL>
        <li>The widths are maximums. Full always fills the column.</li>
        <li>Default keeps its 56px padding and fills the column (e.g. 1024px of content on a 1440 screen).</li>
        <li>Reduced and Narrow stay centered and shrink to the column, keeping at least 24px on each side.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        rows={[
          ["Column (max)", "page-grid-width-track"],
          ["Reduced content (max)", "page-grid-width-reduced"],
          ["Narrow content (max)", "page-grid-width-narrow"],
          ["Default padding", "page-grid-padding-default"],
          ["Reduced / Narrow top and bottom", "page-grid-padding-y"],
          ["Full padding", "page-grid-padding-none"],
          ["Gap between blocks", "page-grid-gap"],
          ["Minimum side margin (small screens)", "page-grid-margin-min"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>The top bar and side nav stay outside the grid; the grid only sets the content area.</li>
        <li>The grid is the page’s main landmark, so screen reader users can jump straight to the content.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Only the 1920 desktop is drawn. Behavior on smaller screens (above) was decided for the build: widths are maximums with a 24px minimum margin.</li>
          <li>Reduced and Narrow have no side padding in Figma; at 1920 they’re centered with room to spare, so the 24px margin only matters on small screens.</li>
          <li>The Reduced and Narrow widths (1120, 688) are fixed values rather than variables, unlike the track, padding and gap.</li>
        </ul>
      </Callout>
    </>
  )
}
