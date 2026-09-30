import { DeltaBadge } from "@/registry/iq/ui/badge"

export default function DeltaBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DeltaBadge>+18%</DeltaBadge>
      <DeltaBadge>-5%</DeltaBadge>
      <DeltaBadge>0%</DeltaBadge>
      {/* A rise in churn is bad news: set the tone yourself. */}
      <DeltaBadge tone="negative">+3% churn</DeltaBadge>
    </div>
  )
}
