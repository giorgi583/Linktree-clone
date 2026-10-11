// components/details-step.tsx
"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadButton } from "@/lib/uploadthing"
import Image from "next/image"
import { useState } from "react"
export function DetailsStep({ onBack, isPending }: { onBack: () => void; isPending: boolean }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Tell people about yourself</h2>
        <p className="text-sm text-muted-foreground">Optional — you can skip and add this later.</p>
      </div>
      <input type="hidden" name="avatarUrl" value={avatarUrl ?? ""} />
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar</Label>
        <div className="flex items-center gap-4">
          {avatarUrl && (
            <Image src={avatarUrl} alt="avatar preview" width={64} height={64} className="rounded-full" />
          )}
          <UploadButton className="bg-black/50 rounded p-2"
            endpoint="avatarUploader"
            onClientUploadComplete={(res) => {
              setAvatarUrl(res[0].ufsUrl)
            }}
            onUploadError={(error) => {
              console.error(error)
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" placeholder="A short bio" maxLength={160} />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Finish"}
        </Button>
      </div>
    </div>
  )
}