import Link from "next/link"
import { ArrowRight } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"

export default function ButtonAsLink() {
  return (
    <Button asChild variant="secondary">
      <Link href="/docs/tokens">
        View tokens
        <ArrowRight />
      </Link>
    </Button>
  )
}
