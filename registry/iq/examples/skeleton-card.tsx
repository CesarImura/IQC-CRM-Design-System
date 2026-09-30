import { Skeleton, SkeletonControl, SkeletonTableRow } from "@/registry/iq/ui/skeleton"

// Composing recipes into a loading form and a loading list.
export default function SkeletonCard() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col gap-6 rounded-[2px] border border-grid bg-(--surface-raised) p-6">
        <Skeleton className="h-4 w-32" />
        <SkeletonControl className="*:w-full [&>*:first-child]:w-24" />
        <SkeletonControl className="*:w-full [&>*:first-child]:w-24" />
      </div>
      <div className="flex flex-col divide-y divide-grid rounded-[2px] border border-grid bg-(--surface-raised)">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonTableRow key={i} />
        ))}
      </div>
    </div>
  )
}
