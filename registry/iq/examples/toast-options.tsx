"use client"

import { Toast } from "@/registry/iq/ui/toast"

const noop = () => {}

// Optional parts: no description, no action, no close.
export default function ToastOptions() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toast tone="success" title="Event has been created." onClose={noop} />
      <Toast tone="warning" title="Event has been created." description="Description text if necessary" onClose={noop} />
      <Toast tone="error" title="Event has been created." description="Description text if necessary" />
    </div>
  )
}
