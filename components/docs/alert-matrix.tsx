import { Alert, type AlertTone } from "@/registry/iq/ui/alert"
import { Button } from "@/registry/iq/ui/button"

const tones: { tone: AlertTone; title: string }[] = [
  { tone: "default", title: "Payment scheduled" },
  { tone: "success", title: "Payment successful" },
  { tone: "destructive", title: "Payment failed" },
]

/** Alert: Tone, with and without the action. */
export function AlertMatrix() {
  return (
    <div className="my-6 grid gap-4 overflow-x-auto rounded-[2px] border border-grid p-6 lg:grid-cols-2">
      {[false, true].map((withAction) => (
        <div key={String(withAction)} className="flex flex-col gap-3">
          <p className="text-xs font-medium text-white/50">{withAction ? "With action" : "Icon + text"}</p>
          {tones.map(({ tone, title }) => (
            <Alert
              key={tone}
              tone={tone}
              title={title}
              description="Your payment of $29.99 has been processed. A receipt was sent to your email."
              action={
                withAction ? (
                  <Button size="sm" variant={tone === "destructive" ? "danger" : "secondary"} tabIndex={-1}>
                    {tone === "destructive" ? "Retry" : "View"}
                  </Button>
                ) : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}
