import { Button } from "@/registry/iq/ui/button"
import { ModalBody, ModalFooter, ModalHeader, ModalPanel, type ModalFooterLayout, type ModalSize } from "@/registry/iq/ui/modal"

const sizes: { size: ModalSize; label: string }[] = [
  { size: "sm", label: "Small · 480" },
  { size: "md", label: "Medium · 640" },
  { size: "lg", label: "Large · 800" },
]

function Slot({ height = 96 }: { height?: number }) {
  return (
    <div style={{ height }} className="flex items-center justify-center rounded-[2px] border border-dashed border-white/15 text-xs text-white/40">
      Body slot
    </div>
  )
}

/** Modal / Size × Intent, drawn statically (the live one is in the demo above). */
export function ModalMatrix() {
  return (
    <div className="my-6 flex flex-col gap-8 overflow-x-auto rounded-[2px] border border-grid p-6">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex flex-col gap-3">
          <p className="text-xs font-medium text-white/50">{label}</p>
          <div className="flex flex-wrap gap-6">
            {(["default", "danger"] as const).map((intent) => (
              <ModalPanel key={intent} size={size} className="shrink-0">
                <ModalHeader eyebrow="Optional label" title="Modal title" description="Supporting description for the task in this modal." />
                <ModalBody>
                  <Slot />
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" tabIndex={-1}>
                    Cancel
                  </Button>
                  <Button variant={intent === "danger" ? "danger" : "primary"} tabIndex={-1}>
                    {intent === "danger" ? "Delete" : "Confirm"}
                  </Button>
                </ModalFooter>
              </ModalPanel>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const layouts: ModalFooterLayout[] = ["double", "split", "stack", "single"]

/** _Modal / Footer layouts. */
export function ModalFooterMatrix() {
  return (
    <div className="my-6 grid gap-4 overflow-x-auto rounded-[2px] border border-grid p-6 lg:grid-cols-2">
      {layouts.map((layout) => (
        <div key={layout} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-white/50 capitalize">{layout}</p>
          <div className="w-[min(480px,100%)] rounded-[2px] border border-(--modal-border) bg-(--modal-surface)">
            <ModalFooter layout={layout}>
              {layout === "stack" || layout === "single" ? (
                <>
                  <Button tabIndex={-1}>Confirm</Button>
                  {layout === "stack" && (
                    <Button variant="secondary" tabIndex={-1}>
                      Cancel
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button variant="secondary" tabIndex={-1}>
                    Cancel
                  </Button>
                  <Button tabIndex={-1}>Confirm</Button>
                </>
              )}
            </ModalFooter>
          </div>
        </div>
      ))}
    </div>
  )
}

/** _Modal / Body Scroll: Auto grows; Fixed caps at 384px and scrolls. */
export function ModalScrollMatrix() {
  return (
    <div className="my-6 flex flex-wrap gap-6 overflow-x-auto rounded-[2px] border border-grid p-6">
      {(["auto", "fixed"] as const).map((scroll) => (
        <div key={scroll} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-white/50">{scroll === "auto" ? "Auto" : "Fixed · 384px, scrolls"}</p>
          <ModalPanel size="sm" className="max-h-none shrink-0">
            <ModalHeader title="Modal title" />
            <ModalBody scroll={scroll}>
              <Slot height={156} />
              {scroll === "fixed" && (
                <>
                  <Slot height={156} />
                  <Slot height={156} />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" tabIndex={-1}>
                Cancel
              </Button>
              <Button tabIndex={-1}>Confirm</Button>
            </ModalFooter>
          </ModalPanel>
        </div>
      ))}
    </div>
  )
}
