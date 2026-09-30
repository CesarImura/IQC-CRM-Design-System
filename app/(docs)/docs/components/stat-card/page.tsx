import type { Metadata } from "next"
import Link from "next/link"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { FigmaMapping } from "@/components/docs/figma-mapping"
import { PropsTable } from "@/components/docs/props-table"
import { StatCardMatrix } from "@/components/docs/stat-card-matrix"
import { Callout, Code, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Stat Card",
  description: "KPI card: a metric, its change, and an optional sparkline, comparison or split.",
}

export default function StatCardDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Stat Card"
        description="Shows one key metric, how it changed, and optionally its trend, a comparison with the average, or a split between two parts."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("2090:3283")} target="_blank" rel="noreferrer">
            Figma: Stat Card
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <ComponentPreview name="stat-card-demo" />

      <H2>Installation</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/stat-card" />
      <P>
        No chart library needed: the sparkline and split bar are plain SVG and CSS. For registry
        setup, see{" "}
        <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
          Installation
        </Link>
        .
      </P>

      <H2>Usage</H2>
      <CodeBlock code={`import { StatCard } from "@/components/ui/stat-card"`} />
      <CodeBlock
        className="mt-3"
        code={`<StatCard
  title="Orders"
  value="$1,949,190.70"
  delta="+18%"
  caption="last 30d"
  data={ordersLast30Days}
/>`}
      />
      <P>
        Pass values already formatted. Currency, locale, period and number of points are content,
        not variants, so the card never formats numbers itself.
      </P>

      <H2>Layouts</H2>
      <UL>
        <li>
          <Code>compact</Code> (default): metric with a small sparkline on the right. For dense
          dashboards.
        </li>
        <li>
          <Code>stacked</Code>: centered, large number, no chart. For a single headline figure.
        </li>
        <li>
          <Code>spark</Code>: metric above a full-width sparkline, when the trend matters as much
          as the number.
        </li>
        <li>
          <Code>compare</Code>: taller chart with a dashed <Code>average</Code> line and a
          highlighted point, e.g. today against the period average.
        </li>
        <li>
          <Code>split</Code>: a two-part proportion (e.g. profit against risk) with a legend.
        </li>
      </UL>
      <ComponentPreview name="stat-card-layouts" align="start" />

      <H2>Tones</H2>
      <P>
        The tone colors the delta badge and the chart. By default it comes from the sign of{" "}
        <Code>delta</Code>: <Code>+</Code> is positive, <Code>-</Code> is negative, and anything else
        is neutral. Set <Code>tone</Code> yourself when a rise is bad news, e.g. churn going up
        should be <Code>tone=&quot;negative&quot;</Code>.
      </P>
      <ComponentPreview name="stat-card-tones" align="start" />

      <H2>Info</H2>
      <P>
        <Code>info</Code> adds the info icon after the title. A string becomes its native tooltip and
        accessible name. For a richer tooltip, pass your own element.
      </P>
      <ComponentPreview name="stat-card-info" />

      <H2>Sizing</H2>
      <P>
        The card fills its container. Figma designs it at 364px wide, so use a grid such as{" "}
        <Code>grid-cols-[repeat(auto-fill,minmax(300px,1fr))]</Code> and let it stretch.
      </P>

      <H2>All layouts and tones</H2>
      <P>The full Figma matrix at 364px, for side-by-side QA.</P>
      <StatCardMatrix />

      <H2>API reference</H2>
      <H3>StatCard</H3>
      <PropsTable
        props={[
          { name: "layout", type: '"compact" | "stacked" | "spark" | "compare" | "split"', default: '"compact"', description: "Arrangement. Maps to the Figma Layout property." },
          { name: "tone", type: '"positive" | "negative" | "neutral"', default: "from delta", description: "Colors the badge and chart. Maps to the Figma Tone property." },
          { name: "title", type: "ReactNode", description: "Metric name. Rendered as an <h3> that labels the card." },
          { name: "value", type: "ReactNode", description: "Formatted metric, e.g. \"$1,949,190.70\"." },
          { name: "delta", type: "ReactNode", description: "Formatted change, e.g. \"+18%\". Omit it to hide the badge." },
          { name: "caption", type: "ReactNode", description: "Text after the badge: period or comparison." },
          { name: "info", type: "ReactNode", description: "Info icon after the title. A string becomes its tooltip and accessible name." },
          { name: "data", type: "number[]", description: "Series for compact, spark and compare, oldest first." },
          { name: "average", type: "number", description: "Compare only: dashed reference line." },
          { name: "highlightIndex", type: "number", description: "Compare only: the point marked with a crosshair." },
          { name: "split", type: "{ lead: { label, value }, trail: { label, value } }", description: "Split only: the two parts. Values are relative (70/30, 7/3, …)." },
        ]}
      />
      <H3>Sparkline</H3>
      <P>
        The chart is exported for use outside the card:{" "}
        <Code>{'<Sparkline data={…} tone="positive" />'}</Code>. The delta badge is{" "}
        <Link href="/docs/components/badge" className="text-brand underline-offset-4 hover:underline">
          DeltaBadge
        </Link>
        .
      </P>

      <H2>Figma mapping</H2>
      <FigmaMapping
        rows={[
          ["Layout = Compact / Stacked / Spark / Compare / Split", 'layout="compact" | … | "split"'],
          ["Tone = Positive / Negative / Neutral", 'tone (or inferred from delta)'],
          ["Show info", "info"],
          ["Show spark (Compact)", "data (omit it to hide the sparkline)"],
          ["_Chart / Sparkline", "Sparkline"],
          ["_Chart / Point + gridline (Compare)", "highlightIndex + average"],
          ["_Stat / Split Bar + Status Dot legend", "split"],
          ["Badge / Delta", "DeltaBadge (from Badge)"],
        ]}
      />

      <H2>Accessibility</H2>
      <UL>
        <li>
          The card is a <Code>{"<section>"}</Code> labelled by its title, so it shows up as a named
          region.
        </li>
        <li>
          The delta arrow has an accessible name (“Increase”, “Decrease”, “No change”), so the
          change doesn’t rely on color alone.
        </li>
        <li>
          Charts are decorative (<Code>aria-hidden</Code>). If the trend matters, say it in the{" "}
          <Code>caption</Code> or next to the card.
        </li>
        <li>Numbers use tabular figures so values line up across cards.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes for design:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>
            The Info icon is <Code>#161616</Code> on the <Code>#121514</Code> card, so it’s
            invisible. The code uses the title color.
          </li>
          <li>
            The split bar stripes are a Figma WebGPU shader, which only renders in browsers with
            experimental flags. The code draws the same stripes (45°, 25% opacity, 2px lead / 1px
            trail, 7px gap) with CSS, so they work everywhere. Should the lead and trail stripe
            widths match?
          </li>
          <li>
            The card text uses <Code>checkbox-label-*</Code> variables, and the chart colors are raw
            values. They’re named in code as <Code>--stat-card-*</Code> and <Code>--chart-*</Code>.
          </li>
          <li>
            The description mentions an Empty state that isn’t in the component set yet.
          </li>
        </ul>
      </Callout>
    </>
  )
}
