import { PartnerLogo } from "@/registry/iq/ui/partner-logo"

const rows = [
  { partner: "Quantower", accounts: 412 },
  { partner: "Atas", accounts: 268 },
  { partner: "Tradovate", accounts: 190 },
] as const

// Small lockups line up with 14px table text.
export default function PartnerLogoInTable() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[2px] border border-grid text-sm">
      {rows.map((r) => (
        <div key={r.partner} className="flex h-12 items-center justify-between border-b border-grid px-3 last:border-b-0">
          <PartnerLogo partner={r.partner} size="sm" />
          <span className="text-white/80 tabular-nums">{r.accounts} accounts</span>
        </div>
      ))}
    </div>
  )
}
