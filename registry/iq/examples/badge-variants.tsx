import { Badge } from "@/registry/iq/ui/badge"

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="blue" variant="filled">Filled</Badge>
      <Badge color="blue" variant="outline">Outline</Badge>
      <Badge color="blue" variant="ghost">Ghost</Badge>
    </div>
  )
}
