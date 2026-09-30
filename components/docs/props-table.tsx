import { Code } from "./typography"

export type PropDef = {
  name: string
  type: string
  default?: string
  description: string
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-grid bg-white/[0.02] text-xs tracking-wider text-white/40 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Prop</th>
            <th scope="col" className="px-4 py-3 font-medium">Type</th>
            <th scope="col" className="px-4 py-3 font-medium">Default</th>
            <th scope="col" className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grid">
          {props.map((p) => (
            <tr key={p.name} className="align-top">
              <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap text-brand">{p.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] leading-5 text-white/70">{p.type}</td>
              <td className="px-4 py-3 whitespace-nowrap">{p.default ? <Code>{p.default}</Code> : <span className="text-white/30">—</span>}</td>
              <td className="px-4 py-3 leading-6 text-white/60">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
