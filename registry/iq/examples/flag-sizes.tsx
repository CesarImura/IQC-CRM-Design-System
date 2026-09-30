import { Flag } from "@/registry/iq/ui/flag"

export default function FlagSizes() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <Flag code="br" size="sm" />
      <Flag code="br" size="md" />
      <Flag code="br" size="lg" />
    </div>
  )
}
