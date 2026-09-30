import { StatCard } from "@/registry/iq/ui/stat-card"

export default function StatCardInfo() {
  return (
    <StatCard
      className="w-full max-w-[364px]"
      layout="stacked"
      title="Platform connections"
      info="Active integrations across all workspaces"
      value="17,475"
      delta="+18%"
      caption="last 30d"
    />
  )
}
