import { StatusDot } from "@/registry/iq/ui/status-dot"

export default function StatusDotMarkOnly() {
  return (
    <div className="flex items-center gap-4">
      <StatusDot tone="positive" label="Online" />
      <StatusDot tone="warning" label="Away" />
      <StatusDot tone="neutral" label="Offline" />
    </div>
  )
}
