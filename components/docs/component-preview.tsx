import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { cn } from "@/lib/utils"
import { examples, type ExampleName } from "@/registry/iq/examples"
import { CodeBlock } from "./code-block"
import { PreviewTabs } from "./preview-tabs"

/** Reads an example's source and rewrites internal paths to what consumers will have after `shadcn add`. */
async function getExampleSource(name: ExampleName) {
  const source = await readFile(join(process.cwd(), "registry/iq/examples", `${name}.tsx`), "utf8")
  return source.replaceAll("@/registry/iq/ui/", "@/components/ui/")
}

export async function ComponentPreview({
  name,
  className,
  align = "center",
}: {
  name: ExampleName
  className?: string
  align?: "center" | "start"
}) {
  const Example = examples[name]
  const source = await getExampleSource(name)

  return (
    <PreviewTabs
      preview={
        <div
          className={cn(
            "flex min-h-[220px] w-full flex-wrap items-center gap-4 overflow-x-auto rounded-[2px] border border-grid p-8 sm:p-10",
            "bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[16px_16px]",
            align === "center" ? "justify-center" : "justify-start",
            className
          )}
        >
          <Example />
        </div>
      }
      code={<CodeBlock code={source} />}
    />
  )
}
