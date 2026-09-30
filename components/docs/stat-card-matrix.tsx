import { StatCard, type StatLayout } from "@/registry/iq/ui/stat-card"

const series = [12, 11, 12, 12, 13, 14, 15, 17, 20, 19, 19, 20, 23, 22, 22, 21, 21, 22, 26, 25, 22, 23, 21, 21]

const layouts: StatLayout[] = ["compact", "stacked", "spark", "compare", "split"]
const tones = [
  { label: "Positive", delta: "+18%" },
  { label: "Negative", delta: "-5%" },
  { label: "Neutral", delta: "0%" },
] as const

function Card({ layout, delta }: { layout: StatLayout; delta: string }) {
  const caption = layout === "compare" || layout === "split" ? "vs average at timeframe" : "last 30d"
  if (layout === "stacked") {
    return <StatCard layout={layout} title="Platform connections" value="17,475" delta={delta} caption={caption} />
  }
  if (layout === "split") {
    return (
      <StatCard
        layout={layout}
        title="Risk to profit"
        value="8:1 Factor"
        delta={delta}
        caption={caption}
        split={{ lead: { label: "Profit 70%", value: 70 }, trail: { label: "Risk 30%", value: 30 } }}
      />
    )
  }
  return (
    <StatCard
      layout={layout}
      title="Orders"
      value="$1,949,190.70"
      delta={delta}
      caption={caption}
      data={series}
      average={layout === "compare" ? 17 : undefined}
      highlightIndex={layout === "compare" ? 11 : undefined}
    />
  )
}

/** Mirrors the Figma "Stat Card" matrix (Layout × Tone) at the Figma card width of 364px. */
export function StatCardMatrix() {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">Layout</th>
            {layouts.map((l) => (
              <th key={l} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80 capitalize">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tones.map((t) => (
            <tr key={t.label} className="border-t border-grid">
              <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">{t.label}</th>
              {layouts.map((l) => (
                <td key={l} className="border-l border-grid p-4 align-top">
                  <div className="w-[364px]">
                    <Card layout={l} delta={t.delta} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
