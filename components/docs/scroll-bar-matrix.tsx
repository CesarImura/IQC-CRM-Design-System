import { ScrollBarStatic } from "@/registry/iq/ui/scroll-area"

const states = [
  { label: "Default · 8px, 40%" },
  { label: "Hover · 12px, 64%", visual: "hover" as const },
  { label: "Drag · 12px, 88%", visual: "drag" as const },
]

/** Scroll Bar: Orientation × State, drawn statically. */
export function ScrollBarMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">Orientation</th>
            {states.map((s) => (
              <th key={s.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-grid">
            <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">Horizontal</th>
            {states.map((s) => (
              <td key={s.label} className="border-l border-grid px-6 py-8">
                <ScrollBarStatic orientation="horizontal" visualState={s.visual} />
              </td>
            ))}
          </tr>
          <tr className="border-t border-grid">
            <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">Vertical</th>
            {states.map((s) => (
              <td key={s.label} className="border-l border-grid px-6 py-6">
                <div className="h-40">
                  <ScrollBarStatic orientation="vertical" visualState={s.visual} offset={0.3} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
