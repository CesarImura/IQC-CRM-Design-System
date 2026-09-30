import { Flag } from "@/registry/iq/ui/flag"

export default function FlagDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Flag code="br" />
      <Flag code="us" />
      <Flag code="gb" />
      <Flag code="de" />
      <Flag code="jp" />
      <Flag code="eu" />
    </div>
  )
}
