import { Skeleton } from "@/registry/iq/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton shape="circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="w-40" />
        <Skeleton className="w-24" />
      </div>
    </div>
  )
}
