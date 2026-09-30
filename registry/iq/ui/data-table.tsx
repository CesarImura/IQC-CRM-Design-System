"use client"

import * as React from "react"
import {
  columnSizingFeature,
  createColumnHelper,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"
import { Checkbox } from "@/registry/iq/ui/checkbox"
import { Pagination, type PaginationLayout } from "@/registry/iq/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableStatus,
  type TableSize,
  type TableVariant,
} from "@/registry/iq/ui/table"

// Figma: IQ Capital CRM Design System → Data Table (2536:33254). Type (Grid / Compact) ×
// Body (Default / Empty / Loading / Error), with the Toolbar on top and Pagination below.
// Built on TanStack Table v9: sorting, row selection and pagination work client-side by default,
// or server-side with the `manual*` props.

/** The TanStack features this table registers. Use it to type your columns. */
const dataTableFeatures = tableFeatures({
  columnSizingFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
})

type DataTableFeatures = typeof dataTableFeatures
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataTableColumn<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>
type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>
type RowData = Record<string, unknown> | unknown[]

/** Column helper typed for DataTable: `const col = createDataTableColumnHelper<Contact>()`. */
function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}

type DataTableProps<TData extends RowData> = {
  columns: DataTableColumn<TData>[]
  data: TData[]
  variant?: TableVariant
  size?: TableSize
  /** Loading and error replace the rows. An empty `data` array shows the Empty state. */
  status?: "ready" | "loading" | "error"
  /** Shows "Try again" in the Error state. */
  onRetry?: () => void
  /** Override the Empty / Loading / Error texts and actions. */
  emptyState?: { title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode }
  loadingState?: { title?: React.ReactNode; description?: React.ReactNode }
  errorState?: { title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode }
  /** Content above the table (Figma Toolbar): filters on the left, actions on the right. */
  toolbar?: React.ReactNode
  /** Adds the selection column with a select-all checkbox in the header. */
  enableRowSelection?: boolean | ((row: DataTableRow<TData>) => boolean)
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  /** Stable row id, e.g. (row) => row.id. Needed for selection to survive sorting and paging. */
  getRowId?: (row: TData, index: number) => string
  /** Extra content in the selection cell after the checkbox, e.g. an avatar (Figma Cell Type/Avatar). */
  renderSelectionExtra?: (row: DataTableRow<TData>) => React.ReactNode
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  /** Sort on the server: the table only reports sorting changes. */
  manualSorting?: boolean
  /** Hide the footer. */
  pagination?: false | {
    layout?: PaginationLayout
    pageSizeOptions?: number[]
    /** Controlled page state (0-based pageIndex, like TanStack). */
    state?: PaginationState
    onChange?: OnChangeFn<PaginationState>
    /** Paginate on the server: pass the total and the current page's rows as `data`. */
    manual?: { rowCount: number }
  }
  onRowClick?: (row: DataTableRow<TData>) => void
  className?: string
}

function DataTable<TData extends RowData>({
  columns,
  data,
  variant = "grid",
  size = "lg",
  status = "ready",
  onRetry,
  emptyState,
  loadingState,
  errorState,
  toolbar,
  enableRowSelection = false,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  getRowId,
  renderSelectionExtra,
  sorting: sortingProp,
  onSortingChange,
  manualSorting = false,
  pagination = {},
  onRowClick,
  className,
}: DataTableProps<TData>) {
  const [sortingState, setSortingState] = React.useState<SortingState>([])
  const [selectionState, setSelectionState] = React.useState<RowSelectionState>({})
  const [paginationState, setPaginationState] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagination ? (pagination.pageSizeOptions?.[1] ?? 25) : 25,
  })

  const sorting = sortingProp ?? sortingState
  const rowSelection = rowSelectionProp ?? selectionState
  const paginationValue = (pagination ? pagination.state : undefined) ?? paginationState

  const selectionColumn: DataTableColumn<TData> = React.useMemo(
    () => ({
      id: "__select",
      size: renderSelectionExtra ? 96 : 56,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all rows on this page"
          rowClassName="flex py-0"
          checked={
            table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(value === true)}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            aria-label="Select row"
            rowClassName="flex py-0"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(value) => row.toggleSelected(value === true)}
            onClick={(event) => event.stopPropagation()}
          />
          {renderSelectionExtra?.(row)}
        </div>
      ),
    }),
    [renderSelectionExtra]
  )

  const allColumns = React.useMemo(
    () => (enableRowSelection ? [selectionColumn, ...columns] : columns),
    [enableRowSelection, selectionColumn, columns]
  )

  const table = useTable({
    features: dataTableFeatures,
    defaultColumn: { size: 160 },
    data,
    columns: allColumns,
    state: { sorting, rowSelection, ...(pagination ? { pagination: paginationValue } : {}) },
    getRowId,
    enableRowSelection,
    onSortingChange: onSortingChange ?? setSortingState,
    onRowSelectionChange: onRowSelectionChange ?? setSelectionState,
    onPaginationChange: (pagination && pagination.onChange) || setPaginationState,
    manualSorting,
    manualPagination: Boolean(pagination && pagination.manual),
    rowCount: pagination && pagination.manual ? pagination.manual.rowCount : undefined,
  })

  const columnCount = table.getAllLeafColumns().length
  const rows = table.getRowModel().rows
  const totalItems = pagination && pagination.manual ? pagination.manual.rowCount : data.length
  const bodyStatus = status === "loading" ? "loading" : status === "error" ? "error" : rows.length === 0 ? "empty" : null

  return (
    <div data-slot="data-table" className={cn("flex flex-col bg-(--canvas)", className)}>
      {toolbar && (
        <div
          data-slot="data-table-toolbar"
          className="flex min-h-[68px] flex-wrap items-center justify-between gap-2 px-6 py-4"
        >
          {toolbar}
        </div>
      )}

      <Table
        variant={variant}
        size={size}
        aria-busy={status === "loading" || undefined}
        style={{ minWidth: table.getTotalSize() }}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={header.column.id === "__select" ? "py-0" : undefined}
                    sort={canSort ? sorted : undefined}
                    onSort={canSort ? header.column.getToggleSortingHandler() as () => void : undefined}
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {bodyStatus ? (
            <tr>
              <TableStatus
                status={bodyStatus}
                colSpan={columnCount}
                title={(bodyStatus === "empty" ? emptyState : bodyStatus === "loading" ? loadingState : errorState)?.title}
                description={(bodyStatus === "empty" ? emptyState : bodyStatus === "loading" ? loadingState : errorState)?.description}
                action={
                  bodyStatus === "empty"
                    ? emptyState?.action
                    : bodyStatus === "error"
                      ? (errorState?.action ??
                        (onRetry && (
                          <Button variant="danger" size="sm" onClick={onRetry}>
                            Try again
                          </Button>
                        )))
                      : undefined
                }
              />
            </tr>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={
                  onRowClick
                    ? (event) => {
                        if (event.key === "Enter" && event.target === event.currentTarget) onRowClick(row)
                      }
                    : undefined
                }
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && (
        <Pagination
          layout={pagination.layout ?? "status"}
          page={table.state.pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          pageSize={table.state.pagination.pageSize}
          pageSizeOptions={pagination.pageSizeOptions ?? [10, 25, 50, 100]}
          onPageSizeChange={(size) => table.setPageSize(size)}
          totalItems={totalItems}
        />
      )}
    </div>
  )
}

export { DataTable, dataTableFeatures, createDataTableColumnHelper }
export type { DataTableProps, DataTableColumn, DataTableRow, DataTableFeatures }
