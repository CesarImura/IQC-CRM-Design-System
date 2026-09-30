"use client"

import { useState } from "react"

import { Pagination, type PaginationLayout } from "@/registry/iq/ui/pagination"

function Example({ layout }: { layout: PaginationLayout }) {
  const [page, setPage] = useState(9)
  return (
    <div>
      <p className="mb-2 px-6 font-mono text-xs text-white/40 uppercase">{layout}</p>
      <Pagination layout={layout} page={page} pageCount={500} onPageChange={setPage} pageSize={25} totalItems={12480} />
    </div>
  )
}

export default function PaginationLayouts() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Example layout="status" />
      <Example layout="input" />
      <Example layout="pages" />
    </div>
  )
}
