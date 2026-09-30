"use client"

import { useState } from "react"

import { PhoneField, type PhoneValue } from "@/registry/iq/ui/phone-field"

export default function PhoneFieldDemo() {
  const [phone, setPhone] = useState<PhoneValue | null>(null)
  const invalid = phone !== null && phone.national !== "" && !phone.isValid

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <PhoneField
        label="Phone number"
        required
        defaultCountry="BR"
        defaultNational="11 91234-5678"
        onValueChange={setPhone}
        status={invalid ? "error" : undefined}
        helper={invalid ? "This number doesn’t look valid for the selected country." : "Used for deal room 2FA."}
      />
      <p className="font-mono text-xs text-white/40">E.164: {phone ? (phone.e164 ?? "—") : "+5511912345678"}</p>
    </div>
  )
}
