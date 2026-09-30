import { SkeletonControl, SkeletonTableRow, SkeletonText } from "@/registry/iq/ui/skeleton"

const label = "text-xs text-white/32"

export default function SkeletonRecipes() {
  return (
    <div className="flex flex-wrap items-start gap-12">
      <div className="flex flex-col gap-4">
        <span className={label}>Text</span>
        <SkeletonText />
      </div>
      <div className="flex flex-col gap-4">
        <span className={label}>Control</span>
        <SkeletonControl />
      </div>
      <div className="flex flex-col gap-4">
        <span className={label}>Table row</span>
        <SkeletonTableRow />
      </div>
    </div>
  )
}
