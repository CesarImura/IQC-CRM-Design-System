import type { Metadata } from "next"

import { groups, type TokenGroup } from "@/lib/tokens"
import { CopyButton } from "@/components/docs/copy-button"
import { Swatch, TokenValue } from "@/components/docs/token-value"
import { H2, H3, P, PageHeader } from "@/components/docs/typography"

export const metadata: Metadata = { title: "Tokens" }

const tiers: { id: string; title: string; description: string; groups: TokenGroup[] }[] = [
  {
    id: "semantic",
    title: "Semantic",
    description: "Tokens named by role (surface, content, border…). Components point at these, so a change here updates every component that uses the role.",
    groups: groups.filter((g) => g.tier === "semantic"),
  },
  {
    id: "primitive",
    title: "Primitive",
    description: "The raw palette and scales. Semantic and component tokens point here; components should not use primitives directly.",
    groups: groups.filter((g) => g.tier === "primitive"),
  },
  {
    id: "component",
    title: "Component",
    description: "One set per component, mirroring the Figma “Component /” collections. Most are aliases of a semantic token.",
    groups: groups.filter((g) => !g.tier),
  },
]

function Group({ group }: { group: TokenGroup }) {
  return (
    <section>
      <H3 id={group.id}>{group.name}</H3>
      <P className="-mt-2 text-sm">{group.description}</P>
      <div className="overflow-hidden rounded-[2px] border border-grid">
        <ul className="divide-y divide-grid">
          {group.tokens.map((token) => (
            <li key={token.name} className="flex items-center gap-4 px-4 py-2.5">
              <Swatch value={token.value} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13px] text-white">--{token.name}</p>
                <p className="truncate text-xs text-white/40">Figma: {token.figma}</p>
              </div>
              <span className="hidden sm:block">
                <TokenValue value={token.value} />
              </span>
              <CopyButton value={`var(--${token.name})`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function TokensPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Tokens"
        description="Design decisions stored as CSS variables. They come from the Figma variables, and components only ever reference these."
      />

      <P>
        Tokens come in three tiers, like the Figma collections: primitives hold raw values, semantic tokens name a role and point at a
        primitive, and component tokens point at a semantic token (or, where Figma does, straight at a primitive). An arrow shows what a
        token points to. The system is dark-only, so every token has a single value. Click a token to copy it.
      </P>

      <nav aria-label="Token groups" className="my-6 grid gap-4 text-sm sm:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.id}>
            <a href={`#${tier.id}`} className="font-medium text-white hover:underline">
              {tier.title}
            </a>
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-white/50">
              {tier.groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="hover:text-white">
                    {g.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {tiers.map((tier) => (
        <section key={tier.id}>
          <H2 id={tier.id}>{tier.title}</H2>
          <P className="-mt-2">{tier.description}</P>
          {tier.groups.map((group) => (
            <Group key={group.id} group={group} />
          ))}
        </section>
      ))}
    </>
  )
}
