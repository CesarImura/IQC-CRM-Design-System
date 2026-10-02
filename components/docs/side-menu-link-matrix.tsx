import { Home } from "@carbon/icons-react"

import { SideMenu, SideMenuLink } from "@/registry/iq/ui/navigation"

const states = [
  { label: "Default" },
  { label: "Hover", visual: "hover" as const },
  { label: "Active", active: true },
  { label: "Focus", visual: "focus" as const },
  { label: "Disabled", disabled: true },
]

/** _Side Menu / Link: State, expanded and collapsed. */
export function SideMenuLinkMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">Rail</th>
            {states.map((s) => (
              <th key={s.label} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[true, false].map((expanded) => (
            <tr key={String(expanded)} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{expanded ? "Expanded" : "Collapsed"}</th>
              {states.map((s) => (
                <td key={s.label} className="border-l border-grid p-4">
                  <SideMenu expanded={expanded} className="h-auto w-auto border-0 bg-transparent p-1">
                    <SideMenuLink label="Admin Panel" icon={<Home />} active={s.active} disabled={s.disabled} visualState={s.visual} tabIndex={-1} className={expanded ? "w-[198px]" : undefined} />
                  </SideMenu>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
