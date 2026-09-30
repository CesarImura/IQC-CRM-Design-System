"use client"

import { Pagination } from "@/registry/iq/ui/pagination"

// First / Last / Only / Empty come from `page` and `pageCount`: the buttons that can't be used are
// disabled automatically.
export default function PaginationPositions() {
  const noop = () => {}
  return (
    <div className="flex w-full flex-col gap-4">
      <Pagination page={1} pageCount={500} onPageChange={noop} />
      <Pagination page={500} pageCount={500} onPageChange={noop} />
      <Pagination page={1} pageCount={1} onPageChange={noop} />
      <Pagination page={0} pageCount={0} onPageChange={noop} />
    </div>
  )
}
