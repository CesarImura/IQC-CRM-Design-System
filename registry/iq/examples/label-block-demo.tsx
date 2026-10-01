import { LabelBlock } from "@/registry/iq/ui/label-block"

export default function LabelBlockDemo() {
  return (
    <div className="grid grid-cols-3 items-start gap-10">
      <LabelBlock label="Label" description="Description" />
      <LabelBlock label="Label" />
      <LabelBlock description="Description" />
      <LabelBlock label="Label" description="Description" disabled />
      <LabelBlock label="Label" disabled />
      <LabelBlock description="Description" disabled />
    </div>
  )
}
