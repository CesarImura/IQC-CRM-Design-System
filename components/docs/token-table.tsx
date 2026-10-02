import { aliasOf, byName, resolveToken } from "@/lib/tokens"
import { CopyButton } from "./copy-button"
import { Swatch } from "./token-value"

type Row = [property: string, token: string]

/** Which token drives which property of a component, with its value and Figma source. */
export function TokenTable({ rows, title }: { rows: Row[]; title?: string }) {
  return (
    <div className="my-4 overflow-x-auto rounded-[2px] border border-grid">
      {title && <p className="border-b border-grid bg-white/[0.02] px-4 py-2 text-xs font-medium tracking-wider text-white/50 uppercase">{title}</p>}
      <table className="w-full min-w-[560px] text-left text-sm">
        <tbody className="divide-y divide-grid">
          {rows.map(([property, name]) => {
            const token = byName.get(name)
            const alias = token && aliasOf(token.value)
            return (
              <tr key={`${property}-${name}`}>
                <td className="w-48 px-4 py-2.5 text-white/70">{property}</td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-3">
                    {token ? <Swatch value={token.value} /> : <span aria-hidden className="size-5 shrink-0" />}
                    <span className="font-mono text-[13px] text-white">--{name}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-white/60">
                  {token ? resolveToken(token.value) : "missing"}
                  {alias && <span className="block text-white/35">→ {alias}</span>}
                </td>
                <td className="hidden px-4 py-2.5 text-xs text-white/40 lg:table-cell">{token?.figma}</td>
                <td className="w-10 px-2 py-1.5">
                  <CopyButton value={`var(--${name})`} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
