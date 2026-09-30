import { Tag } from "@carbon/icons-react"

import { Pill } from "@/registry/iq/ui/pill"

export default function PillColors() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Pill color="gray" icon={<Tag />}>Gray</Pill>
      <Pill color="white" icon={<Tag />}>White</Pill>
      <Pill color="blue" icon={<Tag />}>Blue</Pill>
      <Pill color="green" icon={<Tag />}>Green</Pill>
      <Pill color="yellow" icon={<Tag />}>Yellow</Pill>
      <Pill color="red" icon={<Tag />}>Red</Pill>
      <Pill color="purple" icon={<Tag />}>Purple</Pill>
    </div>
  )
}
