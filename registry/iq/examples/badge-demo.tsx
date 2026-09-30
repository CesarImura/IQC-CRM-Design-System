import { Badge } from "@/registry/iq/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="gray">Draft</Badge>
      <Badge color="white">Archived</Badge>
      <Badge color="blue">Admin</Badge>
      <Badge color="green">Active</Badge>
      <Badge color="yellow">Pending</Badge>
      <Badge color="red">Overdue</Badge>
      <Badge color="purple">Enterprise</Badge>
    </div>
  )
}
