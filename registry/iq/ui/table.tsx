"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Data Table (2536:33254) building blocks:
// _Table / Header Row (573:50081), _Table / Header Items (557:15485), _Table / Row (189:9039),
// _Table / Cell Renderer (178:8499), Table / Status Body.

type TableVariant = "grid" | "compact"
type TableSize = "sm" | "md" | "lg"

const TableContext = React.createContext<{ variant: TableVariant; size: TableSize }>({
  variant: "grid",
  size: "lg",
})

type TableProps = React.ComponentProps<"table"> & {
  /** Grid draws every cell border; Compact only horizontal lines. Figma Type / Variant. */
  variant?: TableVariant
  /** Header density. Figma Size on _Table / Header Items. */
  size?: TableSize
  /** Classes for the scroll container. */
  containerClassName?: string
}

function Table({ variant = "grid", size = "lg", className, containerClassName, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ variant, size }}>
      <div
        data-slot="table-container"
        className={cn(
          "relative w-full overflow-x-auto [scrollbar-color:var(--border-grid)_transparent] [scrollbar-width:thin]",
          containerClassName
        )}
      >
        <table
          data-slot="table"
          data-variant={variant}
          className={cn("w-full table-fixed border-collapse text-left text-sm", className)}
          {...props}
        />
      </div>
    </TableContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn(className)} {...props} />
}

/** Row. Hover tints it; `data-state="selected"` keeps the tint for selected rows. */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors duration-100 [tbody>&]:hover:bg-(--table-row-hover) data-[state=selected]:bg-(--table-row-hover)",
        "outline-none focus-visible:bg-(--table-row-hover) focus-visible:shadow-[inset_0_0_0_1.5px_var(--focus-ring)]",
        className
      )}
      {...props}
    />
  )
}

type SortDirection = "asc" | "desc" | false

// Figma "Sort Icon" (ascending / descending) and "Filter Icon", white at 30%.
const sortIcons = {
  asc: ["M9 11L9.707 10.293L11.5 12.086V2H12.5V12.086L14.293 10.293L15 11L12 14L9 11Z", "M8 9H1V10H8V9Z", "M8 6H3V7H8V6Z", "M8 3H5V4H8V3Z"],
  desc: ["M9 11L9.707 10.293L11.5 12.086V2H12.5V12.086L14.293 10.293L15 11L12 14L9 11Z", "M8 3H1V4H8V3Z", "M8 6H3V7H8V6Z", "M8 9H5V10H8V9Z"],
}

function SortIcon({ direction }: { direction: "asc" | "desc" }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 shrink-0 text-(color:--table-icon)">
      {sortIcons[direction].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

const headPadding: Record<TableSize, string> = {
  sm: "px-(--table-header-px-sm) py-(--table-header-py-sm)",
  md: "px-(--table-header-px-md) py-(--table-header-py-md)",
  lg: "px-(--table-header-px-lg) py-(--table-header-py-lg)",
}

type TableHeadProps = React.ComponentProps<"th"> & {
  /** Current sort of this column. `false` = sortable but unsorted. Omit for a static header. */
  sort?: SortDirection
  /** Called when the header is clicked. Makes the header a button. */
  onSort?: () => void
  /** Leading icon (Figma Leading Icon). */
  icon?: React.ReactNode
  /** Trailing element, e.g. a filter trigger (Figma Filter Icon). */
  action?: React.ReactNode
}

function TableHead({ sort, onSort, icon, action, className, children, ...props }: TableHeadProps) {
  const { variant, size } = React.useContext(TableContext)

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0 opacity-50 [&_svg]:size-4">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {sort === "asc" && <SortIcon direction="asc" />}
      {sort === "desc" && <SortIcon direction="desc" />}
      {sort === false && onSort && (
        <span className="opacity-0 transition-opacity group-hover/head:opacity-100">
          <SortIcon direction="asc" />
        </span>
      )}
    </>
  )

  return (
    <th
      data-slot="table-head"
      scope="col"
      aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : undefined}
      className={cn(
        "group/head bg-(--table-header-bg) text-left align-middle font-normal text-(color:--table-text)",
        variant === "grid" ? "border border-(--border-grid)" : "border-y border-(--border-grid)",
        headPadding[size],
        onSort && "p-0",
        className
      )}
      {...props}
    >
      <div className={cn("flex items-center gap-(--table-header-gap) leading-[1.3]", onSort && headPadding[size])}>
        {onSort ? (
          <button
            type="button"
            onClick={onSort}
            className="-m-1 flex min-w-0 flex-1 cursor-pointer items-center gap-(--table-header-gap) rounded-[2px] p-1 text-left outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
          >
            {content}
          </button>
        ) : (
          content
        )}
        {action && <span className="inline-flex shrink-0 text-(color:--table-icon) [&_svg]:size-4">{action}</span>}
      </div>
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  const { variant } = React.useContext(TableContext)
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-(--table-cell-height) truncate px-(--table-cell-px) py-(--table-cell-py) align-middle text-sm leading-normal text-(color:--table-text) focus-within:text-(color:--content-default)",
        variant === "grid" ? "border border-(--border-grid)" : "border-y border-(--border-grid)",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Status body (Empty / Loading / Error)
 * -----------------------------------------------------------------------------------------------*/

type TableStatusProps = Omit<React.ComponentProps<"td">, "title"> & {
  status: "empty" | "loading" | "error"
  /** Number of columns to span. */
  colSpan: number
  title?: React.ReactNode
  description?: React.ReactNode
  /** Action under the text, e.g. <Button variant="danger" size="sm">Try again</Button>. */
  action?: React.ReactNode
}

const statusDefaults = {
  empty: { title: "No data", description: "Nothing to show yet. Create one to get started." },
  loading: { title: "Loading", description: "This may take a moment." },
  error: { title: "Couldn’t load", description: "Something went wrong. Try again." },
}

// Figma "Icon" (IBM Carbon Information) at 50% white.
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M8.5 11V7H6.5V8H7.5V11H6V12H10V11H8.5Z" />
      <path d="M8 4C7.85166 4 7.70666 4.04398 7.58332 4.12639C7.45998 4.20881 7.36385 4.32594 7.30709 4.46298C7.25032 4.60003 7.23547 4.75083 7.26441 4.89631C7.29335 5.0418 7.36478 5.17544 7.46967 5.28033C7.57456 5.38522 7.70819 5.45665 7.85368 5.48559C7.99916 5.51452 8.14996 5.49967 8.28701 5.44291C8.42405 5.38614 8.54119 5.29001 8.6236 5.16667C8.70601 5.04334 8.75 4.89833 8.75 4.75C8.75 4.55108 8.67098 4.36032 8.53033 4.21967C8.38967 4.07901 8.19891 4 8 4Z" />
      <path d="M8 15C6.61553 15 5.26215 14.5895 4.111 13.8203C2.95986 13.0511 2.06265 11.9579 1.53284 10.6788C1.00303 9.3997 0.864403 7.99223 1.1345 6.63436C1.4046 5.2765 2.07128 4.02922 3.05025 3.05025C4.02922 2.07128 5.2765 1.4046 6.63436 1.1345C7.99223 0.864403 9.3997 1.00303 10.6788 1.53284C11.9579 2.06265 13.0511 2.95986 13.8203 4.111C14.5895 5.26215 15 6.61553 15 8C15 9.85651 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85651 15 8 15ZM8 2C6.81331 2 5.65327 2.35189 4.66658 3.01118C3.67988 3.67047 2.91085 4.60754 2.45672 5.7039C2.00259 6.80025 1.88377 8.00665 2.11529 9.17054C2.3468 10.3344 2.91824 11.4035 3.75736 12.2426C4.59647 13.0818 5.66557 13.6532 6.82946 13.8847C7.99334 14.1162 9.19974 13.9974 10.2961 13.5433C11.3925 13.0891 12.3295 12.3201 12.9888 11.3334C13.6481 10.3467 14 9.18668 14 8C14 6.4087 13.3679 4.88257 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z" />
    </svg>
  )
}

// Same loading indicator as Button (Figma "Loading indicator"), turning anticlockwise.
function LoadingIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 animate-spin [animation-direction:reverse] motion-reduce:animate-none">
      <path d="M12.975 3.82497L12.9774 3.82302C12.9315 3.76832 12.8789 3.71997 12.8311 3.66677C12.7391 3.56422 12.6475 3.46177 12.5494 3.36527C12.4803 3.29737 12.4066 3.23462 12.3344 3.16992C12.2428 3.08767 12.1515 3.00562 12.0553 2.92872C11.9757 2.86477 11.8931 2.80542 11.8106 2.74537C11.7145 2.67537 11.6178 2.60697 11.5179 2.54227C11.4307 2.48587 11.3417 2.43287 11.2518 2.38037C11.1491 2.32084 11.0448 2.26404 10.9391 2.20997C10.8468 2.16287 10.7541 2.11767 10.6591 2.07497C10.5479 2.02497 10.4346 1.97927 10.3201 1.93532C10.2254 1.89917 10.1313 1.86257 10.0345 1.83082C9.9113 1.79007 9.78545 1.75612 9.6591 1.72267C9.5667 1.69802 9.4754 1.67142 9.3814 1.65112C9.2364 1.61942 9.08815 1.59742 8.93975 1.57572C8.86025 1.56422 8.7825 1.54812 8.70205 1.53932C7.63435 1.42077 6.55393 1.57008 5.5584 1.97377C4.56286 2.37746 3.68359 3.02281 3 3.85152V1.99997H2V5.99997H6V4.99997H3.40575C3.90253 4.2334 4.58303 3.60316 5.3854 3.16654C6.18776 2.72993 7.08654 2.50079 8 2.49997C8.19862 2.50049 8.39708 2.51165 8.5945 2.53342C8.6626 2.54072 8.7285 2.55442 8.7958 2.56417C8.92125 2.58247 9.0465 2.60127 9.1692 2.62792C9.2488 2.64522 9.3264 2.66792 9.4048 2.68867C9.51135 2.71677 9.6177 2.74557 9.72155 2.77977C9.8037 2.80712 9.88405 2.83812 9.9645 2.86887C10.0608 2.90597 10.1563 2.94432 10.2498 2.98632C10.3303 3.02267 10.4094 3.06132 10.4879 3.10132C10.5771 3.14676 10.6648 3.19454 10.751 3.24467C10.8275 3.28932 10.9033 3.33467 10.9776 3.38257C11.0615 3.43702 11.143 3.49467 11.2237 3.55322C11.294 3.60452 11.3645 3.65507 11.4322 3.70947C11.513 3.77417 11.59 3.84327 11.6672 3.91262C11.7284 3.96762 11.7911 4.02102 11.8498 4.07862C11.9332 4.16042 12.0109 4.24757 12.089 4.33447C12.684 4.99817 13.1086 5.79662 13.3263 6.66099C13.544 7.52535 13.5483 8.42969 13.3386 9.29605C13.129 10.1624 12.7118 10.9648 12.123 11.634C11.5343 12.3032 10.7916 12.8192 9.95896 13.1375C9.12636 13.4557 8.22885 13.5668 7.3438 13.4609C6.45874 13.3551 5.61271 13.0356 4.87863 12.53C4.14455 12.0244 3.54445 11.3478 3.13007 10.5586C2.71568 9.76945 2.49945 8.89133 2.5 7.99997H1.5C1.49868 9.04555 1.74961 10.076 2.23149 11.0039C2.71338 11.9318 3.412 12.7298 4.26807 13.3301C5.12413 13.9304 6.11239 14.3153 7.14896 14.4522C8.18553 14.5891 9.23983 14.4739 10.2224 14.1165C11.205 13.759 12.0868 13.1697 12.793 12.3987C13.4993 11.6277 14.0091 10.6977 14.2793 9.68767C14.5494 8.67761 14.5719 7.61727 14.3449 6.59665C14.1178 5.57603 13.6479 4.62524 12.975 3.82497V3.82497Z" />
    </svg>
  )
}

/** A full-width body cell for the Empty, Loading and Error states. Put it inside a <TableRow>. */
function TableStatus({ status, colSpan, title, description, action, className, ...props }: TableStatusProps) {
  const defaults = statusDefaults[status]
  return (
    <td
      data-slot="table-status"
      colSpan={colSpan}
      className={cn("h-(--table-status-min-height) p-6 align-middle", className)}
      {...props}
    >
      <div
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className="mx-auto flex min-h-[264px] w-full max-w-[441px] flex-col items-center justify-center gap-6 rounded-(--table-status-radius) border border-dashed border-(--table-status-border) p-6 text-center"
      >
        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-(--table-status-radius) border border-(--table-status-border) bg-(--table-status-media-bg) text-(color:--content-muted)">
            {status === "loading" ? <LoadingIcon /> : <InfoIcon />}
          </div>
          <div className="flex w-full flex-col items-center gap-2 pt-2">
            <p
              className={cn(
                "w-full text-base leading-[normal] font-medium",
                status === "error" ? "text-(color:--table-status-title-error)" : "text-(color:--table-status-title)"
              )}
            >
              {title ?? defaults.title}
            </p>
            <p className="w-full text-sm leading-normal text-(color:--content-muted)">{description ?? defaults.description}</p>
          </div>
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
    </td>
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableStatus }
export type { TableProps, TableHeadProps, TableStatusProps, TableVariant, TableSize, SortDirection }
