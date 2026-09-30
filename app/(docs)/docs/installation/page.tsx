import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { Callout, Code, H2, P, PageHeader } from "@/components/docs/typography"

export const metadata: Metadata = { title: "Installation" }

export default function InstallationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting started"
        title="Installation"
        description="Set up an existing Next.js + Tailwind CSS v4 project to pull components from the IQ registry."
      />

      <H2>1. Initialize shadcn</H2>
      <P>
        Skip this step if your project already has a <Code>components.json</Code>.
      </P>
      <CodeBlock lang="bash" code="npx shadcn@latest init" />

      <H2>2. Add the IQ registry</H2>
      <P>
        Register the <Code>@iq</Code> namespace in <Code>components.json</Code>. The registry is
        behind the docs password, which the CLI sends as a Bearer token read from an environment
        variable.
      </P>
      <CodeBlock
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@iq": {
      "url": "https://iqc-crm-design-system.vercel.app/r/{name}.json",
      "headers": {
        "Authorization": "Bearer \${IQ_REGISTRY_TOKEN}"
      }
    }
  }
}`}
      />
      <CodeBlock lang="bash" title=".env.local" code="IQ_REGISTRY_TOKEN=<docs password>" className="mt-3" />
      <Callout>
        Keep <Code>.env.local</Code> out of git. Ask the design team for the password.
      </Callout>

      <H2>3. Add components</H2>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/button" />
      <P>This installs:</P>
      <ul className="my-4 ml-5 list-disc space-y-2 leading-7 text-white/70 marker:text-white/30">
        <li>
          <Code>components/ui/button.tsx</Code>: the component
        </li>
        <li>
          The IQ tokens, added as CSS variables to your <Code>globals.css</Code> <Code>:root</Code>
        </li>
        <li>
          <Code>lib/utils.ts</Code> (<Code>cn</Code>), plus <Code>@radix-ui/react-slot</Code> and{" "}
          <Code>class-variance-authority</Code>
        </li>
      </ul>

      <H2>4. Font and icons</H2>
      <P>
        The system uses <strong className="text-white">Geist</strong> and{" "}
        <strong className="text-white">IBM Carbon</strong> icons.
      </P>
      <CodeBlock lang="bash" code="npm i @carbon/icons-react" />
      <CodeBlock
        className="mt-3"
        title="app/layout.tsx"
        code={`import { Geist } from "next/font/google"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-[var(--canvas)] text-white font-sans">{children}</body>
    </html>
  )
}`}
      />

      <H2>Tokens only</H2>
      <P>If you only need the CSS variables (for example, for a custom component):</P>
      <CodeBlock lang="bash" code="npx shadcn@latest add @iq/tokens" />
    </>
  )
}
