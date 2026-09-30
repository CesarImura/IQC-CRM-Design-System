import { StatusDot } from "@/registry/iq/ui/status-dot"

export default function StatusDotDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <StatusDot tone="neutral">Draft</StatusDot>
      <StatusDot tone="positive">Active</StatusDot>
      <StatusDot tone="negative">Churned</StatusDot>
      <StatusDot tone="warning">At risk</StatusDot>
      <StatusDot tone="info">In review</StatusDot>
    </div>
  )
}
