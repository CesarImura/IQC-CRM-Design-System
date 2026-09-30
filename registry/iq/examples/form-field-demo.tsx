"use client"

import { useState } from "react"

import { Button } from "@/registry/iq/ui/button"
import { CurrencyField, PasswordField, TextareaField, TextField } from "@/registry/iq/ui/form-field"

export default function FormFieldDemo() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const emailInvalid = submitted && !/^\S+@\S+\.\S+$/.test(email)

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <TextField label="Full name" placeholder="Cesar Imura" required autoComplete="name" />
      <TextField
        label="Email"
        type="email"
        placeholder="name@company.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        status={emailInvalid ? "error" : undefined}
        helper={emailInvalid ? "Enter a valid email address." : "We’ll send the deal room invite here."}
      />
      <PasswordField label="Password" required helper="At least 12 characters." />
      <CurrencyField label="Ticket size" currency="$" defaultValue={1250} step={100} min={0} />
      <TextareaField label="Notes" placeholder="Anything the team should know" />
      <Button type="submit" className="self-start">
        Save contact
      </Button>
    </form>
  )
}
