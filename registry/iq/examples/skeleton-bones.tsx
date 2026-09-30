import { Skeleton } from "@/registry/iq/ui/skeleton"

const cell = "flex h-22 items-center justify-center"
const label = "text-xs text-white/32"

export default function SkeletonBones() {
  return (
    <div className="grid grid-cols-[112px_200px_200px]">
      <span />
      <span className={`${label} h-10 content-center text-center`}>Bar</span>
      <span className={`${label} h-10 content-center text-center`}>Circle</span>
      {(["rest", "pulse"] as const).map((motion) => (
        <div key={motion} className="contents">
          <span className={`${cell} ${label} capitalize`}>{motion}</span>
          <div className={cell}>
            <Skeleton motion={motion} />
          </div>
          <div className={cell}>
            <Skeleton motion={motion} shape="circle" />
          </div>
        </div>
      ))}
    </div>
  )
}
