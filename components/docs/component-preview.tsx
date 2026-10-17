import { cn } from "@/lib/utils"
import { examples, type ExampleName } from "@/registry/iq/examples"

/** A live, interactive preview of a component on the dotted canvas. */
export function ComponentPreview({
  name,
  className,
  align = "center",
}: {
  name: ExampleName
  className?: string
  align?: "center" | "start"
}) {
  const Example = examples[name]

  return (
    <div
      className={cn(
        "my-4 flex min-h-[200px] w-full flex-wrap items-center gap-4 overflow-x-auto ds-keep-dark rounded-[2px] border border-grid p-8 sm:p-10",
        "bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[16px_16px]",
        // "safe": when the content is wider than the card it starts at the left edge instead of overflowing both sides
        // (a plain justify-center hides the left part where the scroll can't reach).
        align === "center" ? "justify-center-safe" : "justify-start",
        className
      )}
    >
      <Example />
    </div>
  )
}
