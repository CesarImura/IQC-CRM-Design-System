# IQ Capital CRM Design System

Docs site and [shadcn registry](https://ui.shadcn.com/docs/registry) for the IQ Capital CRM, built from the
[Figma library](https://www.figma.com/design/6gc2fkxSUQG7VaiOSUz30L/IQ-Capital-CRM-Design-System).

Stack: Next.js 16 · React 19 · Tailwind CSS v4 · Radix UI · cva. Dark-only.

## Develop

```bash
cp .env.example .env.local   # set DOCS_PASSWORD
npm install
npm run dev                  # http://localhost:3000
```

## Structure

```
registry/iq/
  tokens/tokens.json   ← source of truth for tokens (from Figma variables)
  styles/tokens.css    ← generated, do not edit
  ui/                  ← components shipped to consumers
  examples/            ← doc examples (rendered live + shown as code)
registry.json          ← registry manifest (tokens item's cssVars are generated)
app/(docs)/            ← docs pages
components/docs/       ← docs-only UI (preview, code block, props table…)
proxy.ts               ← password gate for pages and /r/* registry JSON
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run tokens` | Regenerates `tokens.css` and the registry `tokens` item from `tokens.json` |
| `npm run registry:build` | Builds `public/r/*.json` with `shadcn build` |
| `npm run build` | tokens → registry → `next build` |

## Adding a component

1. Read the Figma component set, including its variables and states.
2. Add any new tokens to `registry/iq/tokens/tokens.json`, then run `npm run tokens`.
3. Create `registry/iq/ui/<name>.tsx`, using only token variables and never hard-coded values.
4. Add an item to `registry.json`.
5. Add examples in `registry/iq/examples/` and register them in `examples/index.tsx`.
6. Add the page in `app/(docs)/docs/components/<name>/page.tsx` and the nav entry in `lib/docs.ts`.
7. QA it against the Figma matrix.

## Deploy (Vercel)

1. Import the repo in Vercel (framework: Next.js; defaults are fine).
2. Set the environment variable `DOCS_PASSWORD`. Without it, production returns 500 (fails closed).
3. Update `homepage` in `registry.json` and the URL in the Installation page to the deployed domain.

## Consuming (for app developers)

See **/docs/installation** on the site. In short:

```jsonc
// components.json
"registries": {
  "@iq": {
    "url": "https://<docs-domain>/r/{name}.json",
    "headers": { "Authorization": "Bearer ${IQ_REGISTRY_TOKEN}" }
  }
}
```

```bash
npx shadcn@latest add @iq/button
```
