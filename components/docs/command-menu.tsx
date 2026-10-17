"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cube, DocumentBlank, Search } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { nav } from "@/lib/docs"
import { Modal, ModalContent } from "@/registry/iq/ui/modal"
import { SearchBar } from "@/registry/iq/ui/search-bar"
import { OptionGroup, OptionItem, OptionPanel, OptionPanelList, OptionPanelStatus } from "@/registry/iq/ui/option-panel"

// Search documentation (Ctrl+K / ⌘K): a command palette over the same `nav` that feeds the side menu (lib/docs.ts),
// so a new page shows up in both places at once. Built from the DS parts: Modal, Search Bar and the Option Panel (cmdk).
// Filtering is done here (shouldFilter off) because the Search Bar is a plain input, not a cmdk input.

type Entry = { title: string; href: string; section: string; kind: "Pages" | "Components" }

// "Components" is its own group; every other nav section (Getting started, Foundations) goes under "Pages".
const entries: Entry[] = nav.flatMap((section) =>
  section.items.map((item) => ({
    title: item.title,
    href: item.href,
    section: section.title,
    kind: section.title === "Components" ? ("Components" as const) : ("Pages" as const),
  }))
)

function rank(entry: Entry, tokens: string[]) {
  const title = entry.title.toLowerCase()
  // Match the title only (section and path words like "components" would match almost every letter typed).
  if (!tokens.every((t) => title.includes(t))) return -1
  return title.startsWith(tokens[0]) ? 0 : 1
}

function search(query: string) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!tokens.length) return entries
  return entries
    .map((entry, index) => ({ entry, index, score: rank(entry, tokens) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((r) => r.entry)
}

function usePlatformKey() {
  const [mac, setMac] = React.useState(false)
  React.useEffect(() => {
    setMac(/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent))
  }, [])
  return mac ? "⌘" : "Ctrl"
}

const kbdClass =
  "inline-flex h-5 min-w-5 items-center justify-center rounded-[2px] border border-grid px-1 font-mono text-[11px] leading-none text-white/60"

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState("")
  const mod = usePlatformKey()

  const results = React.useMemo(() => search(query), [query])
  const groups = (["Pages", "Components"] as const).map((kind) => ({ kind, items: results.filter((r) => r.kind === kind) }))

  // Ctrl+K / ⌘K opens it from any page (and toggles it while it's open).
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const change = (v: boolean) => {
    setOpen(v)
    if (!v) setQuery("")
  }
  const go = (href: string) => {
    change(false)
    router.push(href)
  }
  const onQuery = (v: string) => {
    setQuery(v)
    // cmdk only re-selects the first row on its own when it filters; here we filter, so we do it.
    setActive(search(v)[0]?.href ?? "")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => change(true)}
        aria-label="Search documentation"
        aria-keyshortcuts="Control+K Meta+K"
        className={cn(
          "ml-auto flex h-8 cursor-pointer items-center gap-2 rounded-[2px] border border-grid bg-white/[0.02] text-sm text-white/50 outline-none transition-colors hover:border-white/20 hover:text-white/80 focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]",
          "w-8 justify-center sm:w-64 sm:justify-start sm:px-2 md:w-72"
        )}
      >
        <Search size={16} aria-hidden className="shrink-0" />
        <span className="hidden flex-1 truncate text-left sm:inline">Search documentation…</span>
        <span className="hidden items-center gap-1 sm:flex" aria-hidden>
          <kbd className={kbdClass}>{mod}</kbd>
          <kbd className={kbdClass}>K</kbd>
        </span>
      </button>

      <Modal open={open} onOpenChange={change}>
        <ModalContent
          size="md"
          aria-describedby={undefined}
          className="top-[20%] -translate-y-0 gap-0 p-0 pt-0"
          onOpenAutoFocus={() => setActive(search("")[0]?.href ?? "")}
        >
          <DialogPrimitive.Title className="sr-only">Search documentation</DialogPrimitive.Title>
          <OptionPanel
            shouldFilter={false}
            value={active}
            onValueChange={setActive}
            label="Search documentation"
            className="min-h-0 gap-0 rounded-none border-0 bg-transparent p-0 backdrop-blur-none"
          >
            <div
              className="p-2"
              // Esc always closes (the Search Bar would otherwise only clear its text first).
              onKeyDownCapture={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation()
                  change(false)
                }
              }}
            >
              <SearchBar
                size="md"
                value={query}
                onValueChange={onQuery}
                placeholder="Search documentation…"
                aria-label="Search documentation"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                frameClassName="border-0! bg-transparent! shadow-none!"
              />
            </div>
            <div className="border-t border-(--modal-border)" />
            <OptionPanelList data-lenis-prevent className="max-h-[min(360px,50dvh)] p-2">
              {results.length === 0 && <OptionPanelStatus status="empty" query={query} />}
              {groups.map(
                ({ kind, items }) =>
                  items.length > 0 && (
                    <OptionGroup key={kind} heading={kind}>
                      {items.map((item) => (
                        <OptionItem
                          key={item.href}
                          value={item.href}
                          label={item.title}
                          query={query}
                          icon={kind === "Pages" ? <DocumentBlank /> : <Cube />}
                          secondary={kind === "Pages" ? item.section : undefined}
                          onSelect={() => go(item.href)}
                        />
                      ))}
                    </OptionGroup>
                  )
              )}
            </OptionPanelList>
          </OptionPanel>
          <div className="flex items-center gap-2 border-t border-(--modal-border) px-4 py-2 text-xs text-white/50">
            <kbd className={kbdClass}>↵</kbd>
            Go to page
            <span className="ml-auto hidden items-center gap-3 sm:flex">
              <span className="flex items-center gap-1">
                <kbd className={kbdClass}>↑</kbd>
                <kbd className={kbdClass}>↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className={kbdClass}>Esc</kbd>
                Close
              </span>
            </span>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
