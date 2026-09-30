import type { Metadata } from "next"

import tokens from "@/registry/iq/tokens/tokens.json"
import { CopyButton } from "@/components/docs/copy-button"
import { Code, H2, P, PageHeader } from "@/components/docs/typography"

export const metadata: Metadata = { title: "Tokens" }

const isColor = (value: string) => value.startsWith("#")

export default function TokensPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Tokens"
        description="Design decisions stored as CSS variables. They come from the Figma variables, and components only ever reference these."
      />

      <P>
        Use a token as <Code>var(--token-name)</Code>, or in Tailwind v4 as{" "}
        <Code>bg-(--button-primary-bg-default)</Code>. The system is dark-only, so every token has a
        single value.
      </P>

      {tokens.groups.map((group) => (
        <section key={group.id}>
          <H2 id={group.id}>{group.name}</H2>
          <P className="-mt-2 text-sm">{group.description}</P>
          <div className="overflow-hidden rounded-[2px] border border-grid">
            <ul className="divide-y divide-grid">
              {group.tokens.map((token) => (
                <li key={token.name} className="flex items-center gap-4 px-4 py-2.5">
                  {isColor(token.value) ? (
                    <span
                      aria-hidden
                      className="size-8 shrink-0 rounded-[2px] border border-white/10 bg-[linear-gradient(45deg,#1a1d1c_25%,transparent_25%,transparent_75%,#1a1d1c_75%),linear-gradient(45deg,#1a1d1c_25%,transparent_25%,transparent_75%,#1a1d1c_75%)] bg-size-[8px_8px] bg-position-[0_0,4px_4px]"
                    >
                      <span className="block size-full" style={{ background: token.value }} />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-[2px] border border-grid font-mono text-[10px] text-white/50"
                    >
                      {token.value.replace("px", "")}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[13px] text-white">--{token.name}</p>
                    <p className="truncate text-xs text-white/40">Figma: {token.figma}</p>
                  </div>
                  <span className="hidden font-mono text-xs text-white/60 sm:block">{token.value}</span>
                  <CopyButton value={`var(--${token.name})`} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}
