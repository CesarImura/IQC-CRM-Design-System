import { PartnerLogo, PartnerMark, partners } from "@/registry/iq/ui/partner-logo"

/** Mirrors the Figma "Partner Logo" matrix: Mark, Small and Medium for every partner. */
export function PartnerLogoMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            {["Partner", "Mark", "Small", "Medium"].map((h, i) => (
              <th key={h} scope="col" className={`px-4 py-3 text-xs font-medium ${i === 0 ? "text-left text-white/50" : "border-l border-grid text-white/80"}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {partners.map((p) => (
            <tr key={p} className="h-20 border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">
                {p}
              </th>
              <td className="border-l border-grid text-center">
                <PartnerMark partner={p} alt={p} className="mx-auto" />
              </td>
              <td className="border-l border-grid text-center">
                <PartnerLogo partner={p} size="sm" />
              </td>
              <td className="border-l border-grid text-center">
                <PartnerLogo partner={p} size="md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
