import { Button } from "@/registry/iq/ui/button"
import { Empty, type EmptySurface } from "@/registry/iq/ui/empty"

const surfaces: { value: EmptySurface; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "background", label: "Background" },
]

/** Empty: Page × Status × Surface (two actions), plus Compact. */
export function EmptyMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-28 px-4 py-3 text-left text-xs font-medium text-white/50">Status</th>
            {surfaces.map((s) => (
              <th key={s.value} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["empty", "error"] as const).map((status) => (
            <tr key={status} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50 capitalize">{status}</th>
              {surfaces.map((s) => (
                <td key={s.value} className="border-l border-grid p-6 align-top">
                  <div className="w-80">
                    <Empty
                      status={status}
                      surface={s.value}
                      description={status === "empty" ? "Nothing to show yet. Create one to get started." : undefined}
                      action={
                        <Button size="sm" variant={status === "error" ? "danger" : "primary"} tabIndex={-1}>
                          {status === "error" ? "Try again" : "Create"}
                        </Button>
                      }
                      secondaryAction={
                        <Button size="sm" variant="ghost" tabIndex={-1}>
                          Learn more
                        </Button>
                      }
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-grid">
            <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">Compact</th>
            <td className="border-l border-grid p-6">
              <Empty size="compact" />
            </td>
            <td className="border-l border-grid p-6">
              <Empty size="compact" status="error" />
            </td>
            <td className="border-l border-grid p-6" />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
