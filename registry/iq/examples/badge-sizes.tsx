import { Badge } from "@/registry/iq/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="green" size="sm">Small</Badge>
      <Badge color="green" size="md">Medium</Badge>
      <Badge color="green" size="lg">Large</Badge>
    </div>
  )
}
