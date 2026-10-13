import type { Metadata } from "next"

import BalanceRangeChartDemo from "@/registry/iq/examples/balance-range-chart-demo"
import { Toaster } from "@/registry/iq/ui/toast"

export const metadata: Metadata = {
  title: "Balance Range Chart · Preview",
  description: "Full-width preview of the Balance Range Chart in the Line Chart style (Figma F), next to the current version.",
}

/** Figma F · Line Chart style. Full-width playground: the account snapshot at platform width (Page Grid track 1616, padding 56). */
export default async function BalanceRangeChartPreviewPage({ searchParams }: { searchParams: Promise<{ mode?: string; hover?: string; scenario?: string; passed?: string }> }) {
  const { mode, hover, scenario, passed } = await searchParams
  const pinned = hover ? Number(hover) : undefined
  return (
    <main className="min-h-screen bg-(--surface-canvas) px-6 py-10 sm:px-14 sm:py-14">
      <div className="mx-auto flex max-w-[1616px] flex-col gap-2">
        <span className="text-xs leading-[18px] text-(color:--content-muted)">Account · {mode === "funded" ? "Funded" : "Challenge"} · IQCFEV100K-158310</span>
        <BalanceRangeChartDemo initialMode={mode === "funded" ? "funded" : "challenge"} pinnedSession={Number.isFinite(pinned) ? pinned : undefined} initialScenario={scenario === "drawdown" ? "drawdown" : "profit"} autoPass={passed === "1" || passed === "chart"} autoPassModal={passed !== "chart"} />
      </div>
      <Toaster />
    </main>
  )
}
