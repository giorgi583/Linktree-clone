"use client"
import { useActionState, useMemo, useState } from "react"
import { setUsername } from "@/app/actions/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { usernameSchema } from "@/lib/schemas"

export function UsernameForm({ takenUsernames }: { takenUsernames: string[] }) {
  const [state, formAction, isPending] = useActionState(setUsername, null)
  const [value, setValue] = useState("")

   const taken = useMemo(() => new Set(takenUsernames), [takenUsernames])
  let status : "idle" | "available" | "taken" | "invalid" = 'idle'
  let message = "";
   if (value) {
    const parsed = usernameSchema.safeParse({ username: value })
    if (!parsed.success) {
      status = "invalid"
      message = parsed.error.issues[0].message
    } else if (taken.has(value)) {
      status = "taken"
      message = "Username is already taken"
    } else {
      status = "available"
      message = "Username is available"
    }
  }
  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="username">Choose a username</Label>
        <div className="relative">
          <Input
            id="username"
            name="username"
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase().trim())}
            autoComplete="off"
            className="pr-10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {status === "available" && <Check size={16} className="text-green-600" />}
            {(status === "taken" || status === "invalid") && <X size={16} className="text-red-500" />}
          </div>
        </div>
        <p className={`text-xs ${status === "available" ? "text-green-600" : status === "idle" ? "text-muted-foreground" : "text-red-500"}`}>
          {message || `Your public link: yoursite.com/${value || "username"}`}
        </p>
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : "Continue"}
      </Button>
    </form>
  )
}