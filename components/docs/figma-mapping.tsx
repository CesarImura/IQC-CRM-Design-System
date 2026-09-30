export function FigmaMapping({ rows }: { rows: [figma: string, code: string][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-grid bg-white/[0.02] text-xs tracking-wider text-white/40 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Figma</th>
            <th scope="col" className="px-4 py-3 font-medium">Code</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grid text-white/70">
          {rows.map(([figma, code]) => (
            <tr key={figma}>
              <td className="px-4 py-3">{figma}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-brand">{code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
