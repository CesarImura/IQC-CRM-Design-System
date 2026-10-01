"use client"

import { Toast } from "@/registry/iq/ui/toast"

const noop = () => {}

// The Figma matrix: every tone, static (progress bar frozen at 65%).
export default function ToastTones() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toast tone="neutral" title="Event has been created." onClose={noop} />
      <Toast tone="loading" title="Creating event..." onClose={noop} />
      <Toast tone="info" title="Event has been created." description="Description text if necessary" onClose={noop} />
      <Toast tone="success" title="Event has been created." description="Description text if necessary" action={{ label: "Undo", onClick: noop }} onClose={noop} />
      <Toast tone="warning" title="Event has been created." description="Description text if necessary" action={{ label: "Undo", onClick: noop }} onClose={noop} />
      <Toast tone="error" title="Event has been created." description="Description text if necessary" action={{ label: "Undo", onClick: noop }} onClose={noop} />
    </div>
  )
}
