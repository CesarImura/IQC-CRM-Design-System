import { Backdrop, type BackdropIntensity } from "@/registry/iq/ui/backdrop"

const intensities: { value: BackdropIntensity; label: string }[] = [
  { value: "subtle", label: "Subtle · 32%" },
  { value: "default", label: "Default · 50%" },
  { value: "strong", label: "Strong · 64%" },
]

/** Backdrop: Intensity × Blur, over sample content so the dimming and blur are visible. */
export function BackdropMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-white/50">Blur</th>
            {intensities.map((i) => (
              <th key={i.value} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{i.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[false, true].map((blur) => (
            <tr key={String(blur)} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{blur ? "Soft" : "None"}</th>
              {intensities.map((i) => (
                <td key={i.value} className="border-l border-grid p-4">
                  <div className="relative h-28 overflow-hidden rounded-[2px] bg-(--surface-raised) p-3">
                    <p className="text-sm font-medium text-white">Pipeline</p>
                    <p className="text-xs text-white/60">12 open deals · $48.2M</p>
                    <div className="mt-3 flex gap-2">
                      <span className="h-6 w-16 rounded-[2px] bg-(--accent)" />
                      <span className="h-6 w-10 rounded-[2px] bg-white/20" />
                    </div>
                    <Backdrop intensity={i.value} blur={blur} position="absolute" />
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
