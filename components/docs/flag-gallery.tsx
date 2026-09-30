"use client"

import { useDeferredValue, useState } from "react"

import { countries, Flag } from "@/registry/iq/ui/flag"
import { CopyButton } from "./copy-button"

export function FlagGallery() {
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query.trim().toLowerCase())
  const results = deferred
    ? countries.filter((c) => c.name.toLowerCase().includes(deferred) || c.code.includes(deferred))
    : countries

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="sr-only" htmlFor="flag-search">
          Search flags
        </label>
        <input
          id="flag-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by country or code…"
          className="h-10 w-full max-w-xs rounded-[2px] border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-white/30 focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
        />
        <p className="text-sm text-white/40" aria-live="polite">
          {results.length} of {countries.length}
        </p>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] overflow-hidden rounded-[2px] border-t border-l border-grid">
        {results.map((c) => (
          <li key={c.code} className="group flex items-center gap-3 border-r border-b border-grid px-3 py-2.5">
            <Flag code={c.code} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white/80" title={c.name}>{c.name}</p>
              <p className="font-mono text-xs text-white/40">{c.code}</p>
            </div>
            <CopyButton
              value={`<Flag code="${c.code}" />`}
              className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            />
          </li>
        ))}
      </ul>
      {results.length === 0 && <p className="py-8 text-center text-sm text-white/40">No flags match “{query}”.</p>}
    </div>
  )
}
