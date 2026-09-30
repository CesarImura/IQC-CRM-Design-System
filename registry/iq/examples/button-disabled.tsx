import { Button } from "@/registry/iq/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
      <Button variant="danger-outline" disabled>
        Danger outline
      </Button>
    </div>
  )
}
