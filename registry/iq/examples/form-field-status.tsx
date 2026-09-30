import { TextField } from "@/registry/iq/ui/form-field"

export default function FormFieldStatus() {
  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
      <TextField label="Company" defaultValue="CI Trades" helper="Helpful information" required />
      <TextField label="Company" defaultValue="CI Trade" status="warning" helper="Similar to an existing company: CI Trades." required />
      <TextField label="Tax ID" defaultValue="123" status="error" helper="Tax ID must have 14 digits." required />
      <TextField label="Owner" defaultValue="Ana Souza" readOnly helper="Assigned by the deal lead." required />
      <TextField label="Region" placeholder="LatAm" disabled helper="Not editable on this plan." required />
    </div>
  )
}
