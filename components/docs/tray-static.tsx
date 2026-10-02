"use client"

import { TrayDetails } from "@/registry/iq/examples/tray-demo"
import { TrayPanel } from "@/registry/iq/ui/tray"

/** The tray drawn in place (not as a dialog), so its layout can be compared with Figma. */
export function TrayStatic() {
  return (
    <div className="my-6 flex justify-center overflow-x-auto rounded-[2px] border border-grid bg-(--surface-canvas) p-6">
      <TrayPanel className="h-[720px] shrink-0 border">
        <TrayDetails />
      </TrayPanel>
    </div>
  )
}
