"use client"

import { useState } from "react"

import { Pagination } from "@/registry/iq/ui/pagination"

export default function PaginationDemo() {
  const [page, setPage] = useState(9)
  const [pageSize, setPageSize] = useState(25)
  const totalItems = 63989

  return (
    <Pagination
      className="w-full"
      page={page}
      pageCount={Math.ceil(totalItems / pageSize)}
      onPageChange={setPage}
      pageSize={pageSize}
      onPageSizeChange={(size) => {
        setPageSize(size)
        setPage(1)
      }}
      totalItems={totalItems}
    />
  )
}
