import Link from "next/link"
import { ArrowRight, Launch } from "@carbon/icons-react"

import { FIGMA_FILE } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { H2, P, PageHeader, UL } from "@/components/docs/typography"

const principles = [
  {
    title: "Tokens first",
    body: "Every color, spacing and radius comes from a named token that maps to a Figma variable. Where Figma uses a raw value, the token is named here and flagged.",
  },
  {
    title: "Every variant, every state",
    body: "Each component shows its full Figma matrix: sizes, styles and states such as hover, pressed, focus, disabled and error. All live and interactive.",
  },
  {
    title: "Figma is the source of truth",
    body: "Each page links to its Figma component set, and differences or open questions are listed under Figma notes.",
  },
]

export default function IntroductionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting started"
        title="IQ Capital CRM Design System"
        description="A live reference for the tokens, components and variants behind the IQ Capital CRM, built from the Figma library. Dark mode only."
      >
        <Button asChild>
          <Link href="/docs/components/button">
            Browse components
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/docs/tokens">Tokens</Link>
        </Button>
        <Button asChild variant="ghost">
          <a href={FIGMA_FILE} target="_blank" rel="noreferrer">
            Figma file
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <div className="grid gap-px overflow-hidden rounded-[2px] border border-grid bg-grid sm:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} className="bg-canvas p-6">
            <h2 className="text-sm font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">{p.body}</p>
          </div>
        ))}
      </div>

      <H2>How to read a component page</H2>
      <UL>
        <li>
          <strong className="text-white">Previews:</strong> live components. Hover, click and Tab through them to see
          interactive states.
        </li>
        <li>
          <strong className="text-white">All variants:</strong> the Figma matrix, with states forced side by side for comparison.
        </li>
        <li>
          <strong className="text-white">Tokens:</strong> each property with its token, value and Figma source. Click a token to
          copy it.
        </li>
        <li>
          <strong className="text-white">Behavior:</strong> keyboard, focus and screen reader expectations.
        </li>
        <li>
          <strong className="text-white">Figma notes:</strong> where the build differs from Figma, and why.
        </li>
      </UL>

      <H2>Status</H2>
      <P>
        Available now: Badge, Breadcrumb, Button, Checkbox, Combobox (Select, Autocomplete), Data Table, Flag, Form Field
        (Input, Password, Textarea, Currency, Phone, Radio group, Checkbox group), Line Chart, Option Panel, Pagination, Partner Logo,
        Pill, Radio Group, Ring Chart, Skeleton, Stat Card, Status Dot, Tabs (Pill), Toast and Value Slot. Next up: Date Picker, the
        Toolbar pieces, Tabs / Line and the other charts.
      </P>
    </>
  )
}
