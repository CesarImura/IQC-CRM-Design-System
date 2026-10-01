"use client"

import { Button } from "@/registry/iq/ui/button"
import { toast } from "@/registry/iq/ui/toast"

// Each button shows a real toast in the bottom-right corner.
export default function ToastDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="secondary" size="sm" onClick={() => toast("Event has been created.")}>
        Neutral
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          const id = toast.loading("Creating event…")
          setTimeout(() => toast.success("Event has been created.", { id, description: "Added to the Q3 pipeline." }), 2500)
        }}
      >
        Loading → Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast.info("Sync scheduled", { description: "Contacts refresh every hour." })}>
        Info
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast.success("Deal moved to Won", {
            description: "Acme Corp · $120,000",
            action: { label: "Undo", onClick: () => toast("Move undone.") },
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast.warning("3 contacts have no owner", {
            description: "Assign them before the import finishes.",
            action: { label: "Assign", onClick: () => {} },
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast.error("Couldn’t save the deal", {
            description: "Check your connection and try again.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        Error
      </Button>
    </div>
  )
}
