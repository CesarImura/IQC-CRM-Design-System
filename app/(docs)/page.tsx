import Link from "next/link"
import { ArrowRight } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { Code, H2, P, PageHeader, UL } from "@/components/docs/typography"

const principles = [
  {
    title: "You own the code",
    body: "Components are copied into your app with the shadcn CLI. Read them, change them, and keep them in your repo. There’s no package to upgrade.",
  },
  {
    title: "Figma is the source of truth",
    body: "Tokens come from Figma variables, and every component links back to its Figma node and maps its variants 1:1.",
  },
  {
    title: "Built on your stack",
    body: "React 19, Next.js 16, Tailwind CSS v4 and Radix UI. Accessible by default, dark-only.",
  },
]

export default function IntroductionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting started"
        title="IQ Capital CRM Design System"
        description="The components, tokens and guidelines behind the IQ Capital CRM, built from the Figma library and ready to copy into your app."
      >
        <Button asChild>
          <Link href="/docs/installation">
            Get started
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/docs/components/button">Browse components</Link>
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

      <H2>How it works</H2>
      <UL>
        <li>
          <strong className="text-white">Tokens:</strong> Figma variables become CSS variables such as{" "}
          <Code>--button-primary-bg-default</Code>. Components use only these variables, never
          hard-coded values.
        </li>
        <li>
          <strong className="text-white">Components:</strong> each one is a single React file with{" "}
          <Code>cva</Code> variants that match the Figma properties.
        </li>
        <li>
          <strong className="text-white">Registry:</strong> this site also serves a shadcn registry,
          so <Code>npx shadcn add @iq/button</Code> installs the component and its tokens.
        </li>
      </UL>

      <H2>Status</H2>
      <P>
        Available now: Badge, Breadcrumb, Button, Checkbox, Data Table, Flag, Pagination, Pill, Stat
        Card, Status Dot and Value Slot. Next up: the Toolbar pieces (Search Bar, Dropdown, Date
        Picker, Toggle), then Input, Option Panel and the charts.
      </P>
    </>
  )
}
