import type { Metadata } from "next"

import typeStyles from "@/registry/iq/tokens/type-styles.json"
import { TokenTable } from "@/components/docs/token-table"
import { Callout, H2, P, PageHeader } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Typography",
  description: "Geist and Geist Mono text styles: headings, stats, body, labels, data and fields.",
}

type Style = (typeof typeStyles.styles)[number]

const roles: Record<string, { sample: string; use: string }> = {
  Heading: { sample: "Pipeline overview", use: "Page and section titles." },
  Stat: { sample: "$12.4M", use: "Big numbers in stat cards and summaries." },
  "Chart Title": { sample: "Revenue by quarter", use: "Chart card titles." },
  "Chart Emphasis": { sample: "+18.2%", use: "Highlighted values inside charts and tooltips." },
  Body: { sample: "Follow up with the founders after the partner meeting.", use: "Running text and descriptions." },
  Caption: { sample: "Updated 2 hours ago", use: "Helper text and timestamps." },
  Label: { sample: "Deal stage", use: "Buttons, tabs, menu items and other control labels." },
  Link: { sample: "View all deals", use: "Inline and standalone links." },
  Data: { sample: "Acme Robotics · Series A", use: "Table cells and dense data." },
  "Field Label": { sample: "COMPANY NAME", use: "Form Field labels (fixed 16px line)." },
  "Field Value": { sample: "Acme Robotics", use: "Form Field values (fixed 20px line)." },
  Mono: { sample: "INV-2048 · 0.00042", use: "IDs, codes, page numbers and aligned figures." },
}

const grouped = typeStyles.styles.reduce<Record<string, Style[]>>((acc, s) => {
  const role = s.name.split(" / ")[0]
  ;(acc[role] ??= []).push(s)
  return acc
}, {})

const weightName: Record<number, string> = { 400: "Regular", 500: "Medium", 600: "Semibold" }

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Geist for everything, Geist Mono for codes and figures. Styles are named Role / Size / Weight, like in Figma."
      />

      <P>
        Text at 12–18px uses a 150% line height; headings and stats use 130%. Field labels and values have fixed line heights so form rows
        stay aligned. No style uses letter spacing.
      </P>

      <H2>Scale tokens</H2>
      <P className="-mt-2">The size and line-height pairs that components reference.</P>
      <TokenTable
        rows={[
          ["Extra small", "font-size-xs"],
          ["", "line-height-xs"],
          ["Small", "font-size-sm"],
          ["", "line-height-sm"],
          ["Medium", "font-size-md"],
          ["", "line-height-md"],
          ["Large", "font-size-lg"],
          ["", "line-height-lg"],
        ]}
      />

      {Object.entries(grouped).map(([role, styles]) => (
        <section key={role}>
          <H2>{role}</H2>
          <P className="-mt-2 text-sm">{roles[role]?.use}</P>
          <div className="overflow-hidden rounded-[2px] border border-grid">
            <ul className="divide-y divide-grid">
              {styles.map((s) => (
                <li key={s.name} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <p
                    className="min-w-0 flex-1 truncate text-white"
                    style={{
                      fontFamily: s.family === "Geist Mono" ? "var(--font-geist-mono)" : "var(--font-geist-sans)",
                      fontWeight: s.weight,
                      fontSize: s.size,
                      lineHeight: `${s.lineHeightPx}px`,
                    }}
                  >
                    {roles[role]?.sample ?? s.name}
                  </p>
                  <div className="shrink-0 sm:w-56 sm:text-right">
                    <p className="font-mono text-[13px] text-white">{s.name}</p>
                    <p className="font-mono text-xs text-white/50">
                      {s.size}/{s.lineHeightPx} · {weightName[s.weight]}
                      {s.family === "Geist Mono" ? " · Mono" : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong> The text styles are not bound to the font-size and line-height variables yet, so the scale tokens and the styles are kept in sync by
        hand. Stat / lg / Semibold and Heading / xl / Semibold are the same size and weight; Body / sm / Regular and Caption / sm / Regular
        are identical too and differ only by role.
      </Callout>
    </>
  )
}
