import { TextField } from "@/registry/iq/ui/form-field"

export default function FormFieldSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField size="sm" label="Small" placeholder="60px tall" />
      <TextField size="md" label="Medium" placeholder="66px tall" />
    </div>
  )
}
