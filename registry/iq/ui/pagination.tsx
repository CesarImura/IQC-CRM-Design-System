"use client"

import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"

// Figma: IQ Capital CRM Design System → Pagination (1399:21465), _Pagination / Item (1406:3141).
// Layout (Status / Input / Pages) is a prop; Position (First / Middle / Last / Only / Empty) is
// derived from `page` and `pageCount`.

type PaginationLayout = "status" | "input" | "pages"

type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. 0 renders the Empty position. */
  pageCount: number
  onPageChange: (page: number) => void
  layout?: PaginationLayout
  /** Items per page. Shown with `onPageSizeChange`. */
  pageSize?: number
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  /** Total number of items, for the "1 – 25 of 63,989 items" range. */
  totalItems?: number
  /** Show the first and last page buttons. */
  showFirstLast?: boolean
  /** Formats numbers in the range and status. Defaults to the user's locale. */
  formatNumber?: (value: number) => string
  labels?: Partial<typeof defaultLabels>
}

const defaultLabels = {
  itemsPerPage: "Items per page:",
  of: "of",
  items: "items",
  page: "Page",
  first: "First page",
  previous: "Previous page",
  next: "Next page",
  last: "Last page",
  goTo: "Go to page",
}

// Icon paths from the Figma assets (IBM Carbon).
const icons = {
  first: "M12.2427 12.9497L7.293 8L12.2427 3.0503L12.9497 3.75735L8.70705 8.00005L12.9497 12.2428L12.2427 12.9497ZM7.9927 12.9497L3.043 8L7.9927 3.0503L8.69975 3.75735L4.45705 8.00005L8.69975 12.2428L7.9927 12.9497Z",
  previous: "M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z",
  next: "M11 8L6.00001 13L5.30001 12.3L9.60001 8L5.30001 3.7L6.00001 3L11 8Z",
  last: "M8.0073 12.9497L7.30025 12.2427L11.5429 7.99995L7.3003 3.7573L8.00735 3.05025L12.9571 7.99995L8.0073 12.9497ZM3.7573 12.9497L3.05025 12.2427L7.29295 7.99995L3.0503 3.7573L3.75735 3.05025L8.70705 7.99995L3.7573 12.9497Z",
  chevronDown: "M8 11L3 6.00001L3.7 5.30001L8 9.60001L12.3 5.30001L13 6.00001L8 11Z",
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="opacity-70">
      <path d={d} />
    </svg>
  )
}

/** 1 … 8 9 10 … 500, always keeping the first, last, current and its neighbours. */
function getPageItems(page: number, pageCount: number): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis-end", pageCount]
  if (page >= pageCount - 3)
    return [1, "ellipsis-start", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
  return [1, "ellipsis-start", page - 1, page, page + 1, "ellipsis-end", pageCount]
}

const itemClasses =
  "relative inline-flex h-(--pagination-item-size) min-w-(--pagination-item-size) cursor-pointer items-center justify-center rounded-(--pagination-item-radius) px-(--pagination-item-padding) font-mono text-sm leading-normal text-(color:--pagination-content) outline-none transition-colors duration-100 hover:bg-(--pagination-item-bg-hover) active:bg-(--pagination-item-bg-hover) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] disabled:pointer-events-none disabled:text-(color:--content-disabled)"

/** Page number cell. The ellipsis turns into an input so the user can type a page (Figma "Go to"). */
function PaginationEllipsis({
  pageCount,
  onPageChange,
  label,
}: {
  pageCount: number
  onPageChange: (page: number) => void
  label: string
}) {
  const [editing, setEditing] = React.useState(false)

  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        min={1}
        max={pageCount}
        aria-label={label}
        className="h-(--pagination-item-size) w-14 rounded-(--pagination-item-radius) bg-transparent px-3 text-sm leading-[21px] text-white/90 shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        onBlur={() => setEditing(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setEditing(false)
          if (event.key === "Enter") {
            const value = Number(event.currentTarget.value)
            if (value >= 1 && value <= pageCount) onPageChange(value)
            setEditing(false)
          }
        }}
      />
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setEditing(true)}
      className={cn(itemClasses, "text-(color:--pagination-muted)")}
    >
      …
    </button>
  )
}

function PageSizeSelect({
  value,
  options,
  onChange,
  label,
}: {
  value: number
  options: number[]
  onChange: (size: number) => void
  label: string
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={`${label} ${value}`}
        className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-(--pagination-select-border) bg-(--pagination-select-bg) px-3 py-1 font-mono text-sm leading-normal text-(color:--pagination-content) outline-none hover:bg-(--pagination-item-bg-hover) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[state=open]:bg-(--pagination-item-bg-hover) [&_svg]:size-4"
      >
        {value}
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="text-(color:--pagination-muted)">
          <path d={icons.chevronDown} />
        </svg>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          side="top"
          sideOffset={8}
          className="z-50 flex min-w-(--radix-dropdown-menu-trigger-width) flex-col gap-1 rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg) p-(--option-panel-padding) font-mono text-sm leading-(--line-height-sm) text-(color:--option-item-content) backdrop-blur-[100px] outline-none"
        >
          <DropdownMenu.RadioGroup value={String(value)} onValueChange={(v) => onChange(Number(v))}>
            {options.map((option) => (
              <DropdownMenu.RadioItem
                key={option}
                value={String(option)}
                className="flex cursor-pointer items-center rounded-(--option-panel-radius) p-2 outline-none select-none data-highlighted:bg-(--option-item-bg-hover) data-[state=checked]:text-(color:--pagination-item-content-current)"
              >
                {option}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function Pagination({
  page,
  pageCount,
  onPageChange,
  layout = "status",
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  totalItems,
  showFirstLast = true,
  formatNumber = (n) => n.toLocaleString(),
  labels: labelsProp,
  className,
  ...props
}: PaginationProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const empty = pageCount === 0
  const current = empty ? 0 : Math.min(Math.max(page, 1), pageCount)
  const atStart = current <= 1
  const atEnd = current >= pageCount
  const go = (target: number) => onPageChange(Math.min(Math.max(target, 1), pageCount))

  const from = totalItems && pageSize && !empty ? (current - 1) * pageSize + 1 : 0
  const to = totalItems && pageSize && !empty ? Math.min(current * pageSize, totalItems) : 0

  const inputId = React.useId()
  // Draft while typing; null shows the current page.
  const [draft, setDraft] = React.useState<string | null>(null)

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn(
        "flex min-h-(--pagination-min-height) flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-(--pagination-border) px-(--pagination-px) py-(--pagination-py) font-mono text-sm leading-normal",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-4">
        {pageSize !== undefined && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-(color:--pagination-muted) uppercase">{labels.itemsPerPage}</span>
            <PageSizeSelect value={pageSize} options={pageSizeOptions} onChange={onPageSizeChange} label={labels.itemsPerPage} />
          </div>
        )}
        {totalItems !== undefined && pageSize !== undefined && (
          <p className="flex items-center gap-2" aria-live="polite">
            <span aria-hidden="true" className="h-4 w-px bg-(--pagination-divider)" />
            <span className="text-(color:--pagination-content)">{formatNumber(from)}</span>
            <span className="text-(color:--pagination-muted)">–</span>
            <span className="text-(color:--pagination-content)">{formatNumber(to)}</span>
            <span className="text-(color:--pagination-muted)">{labels.of}</span>
            <span className="text-(color:--pagination-content)">{formatNumber(totalItems)}</span>
            <span className="text-(color:--pagination-muted)">{labels.items}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-(--pagination-gap-controls)">
        <div className="flex items-center gap-(--pagination-gap-buttons)">
          {showFirstLast && (
            <Button variant="secondary" size="icon-sm" aria-label={labels.first} disabled={empty || atStart} onClick={() => go(1)}>
              <Icon d={icons.first} />
            </Button>
          )}
          <Button variant="secondary" size="icon-sm" aria-label={labels.previous} disabled={empty || atStart} onClick={() => go(current - 1)}>
            <Icon d={icons.previous} />
          </Button>
        </div>

        {layout === "status" && (
          <p className="flex items-center gap-(--pagination-gap-status) leading-normal" aria-live="polite">
            <span className="text-(color:--pagination-content)">{labels.page}</span>
            <span className="text-(color:--pagination-content)">{formatNumber(current)}</span>
            <span className="text-(color:--pagination-muted)">{labels.of}</span>
            <span className="text-(color:--pagination-muted)">{formatNumber(pageCount)}</span>
          </p>
        )}

        {layout === "input" && (
          <div className="flex items-center gap-(--pagination-gap-status) leading-normal">
            <label htmlFor={inputId} className="text-(color:--pagination-content)">
              {labels.page}
            </label>
            <input
              id={inputId}
              inputMode="numeric"
              disabled={empty}
              value={empty ? "0" : (draft ?? String(current))}
              onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
              onBlur={() => {
                const value = Number(draft)
                if (draft !== null && value >= 1 && value <= pageCount) go(value)
                setDraft(null)
              }}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              className="h-8 w-14 rounded-[2px] bg-(--pagination-input-bg) px-3 font-sans text-sm leading-[21px] text-(color:--content-muted) outline-none focus:text-white/90 focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] disabled:text-(color:--content-disabled)"
            />
            <span className="text-(color:--pagination-muted)">{labels.of}</span>
            <span className="text-(color:--pagination-muted)">{formatNumber(pageCount)}</span>
          </div>
        )}

        {layout === "pages" && (
          <ul className="flex items-center gap-1">
            {(empty ? [] : getPageItems(current, pageCount)).map((item) =>
              typeof item === "number" ? (
                <li key={item}>
                  <button
                    type="button"
                    aria-label={`${labels.page} ${item}`}
                    aria-current={item === current ? "page" : undefined}
                    onClick={() => go(item)}
                    className={cn(
                      itemClasses,
                      item === current &&
                        "bg-(--pagination-item-bg-current) text-(color:--pagination-item-content-current) hover:bg-(--pagination-item-bg-current)"
                    )}
                  >
                    {formatNumber(item)}
                  </button>
                </li>
              ) : (
                <li key={item}>
                  <PaginationEllipsis pageCount={pageCount} onPageChange={go} label={labels.goTo} />
                </li>
              )
            )}
          </ul>
        )}

        <div className="flex items-center gap-(--pagination-gap-buttons)">
          <Button variant="secondary" size="icon-sm" aria-label={labels.next} disabled={empty || atEnd} onClick={() => go(current + 1)}>
            <Icon d={icons.next} />
          </Button>
          {showFirstLast && (
            <Button variant="secondary" size="icon-sm" aria-label={labels.last} disabled={empty || atEnd} onClick={() => go(pageCount)}>
              <Icon d={icons.last} />
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export { Pagination, getPageItems }
export type { PaginationProps, PaginationLayout }
