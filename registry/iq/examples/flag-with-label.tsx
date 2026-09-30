import { Flag } from "@/registry/iq/ui/flag"

const offices = [
  { code: "br", city: "São Paulo", country: "Brazil" },
  { code: "us", city: "New York", country: "United States" },
  { code: "gb", city: "London", country: "United Kingdom" },
]

export default function FlagWithLabel() {
  return (
    <ul className="flex w-full max-w-xs flex-col gap-3">
      {offices.map((office) => (
        <li key={office.code} className="flex items-center gap-3 text-white/80">
          {/* The country name is already in the text, so the flag is decorative. */}
          <Flag code={office.code} size="md" aria-hidden />
          <span>
            {office.city}, <span className="text-white/50">{office.country}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
