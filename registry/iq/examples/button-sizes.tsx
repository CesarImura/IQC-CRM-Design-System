import { Button } from "@/registry/iq/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
