"use client"
import React, {useActionState, useEffect} from 'react'
import { UploadButton } from "@/lib/uploadthing"
import Image from "next/image"
import {updateProfile} from "@/app/actions/auth"
const PersonalInfoForm = ({ user }: { user: any }) => {
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(user?.avatarUrl || null)
    const [state, formAction, isPending] = useActionState(updateProfile, null)
    useEffect(() => {
        if (state?.success) {
            alert("Profile updated successfully!")
        }
        else if (state?.error) {
            alert(`Error updating profile: ${state.error}`)
        }
    }, [state])

  return (
    <div className='bg-sidebar-accent p-10 rounded-2xl'>
        <h2 className='text-2xl font-bold mb-5'>Personal Information</h2>
        <form className='flex flex-col gap-5' action={formAction}>
          <input type="hidden" id='avatarUrl' value={avatarUrl || ''} />
          <div className='flex gap-4 max-w-200 items-center bg-background/30 p-3 rounded-lg'>
            <div className='flex items-end'>
                <Image src={ avatarUrl || '/default-avatar.png'} alt="avatar preview" width={84} height={84} className="rounded-full mb-2 w-35 h-35" />
                    <UploadButton className="bg-black/30 rounded max-w-30 px-2 text-sm max-h-12 -ml-8"
                      endpoint="avatarUploader"
                      onClientUploadComplete={(res) => {
                      setAvatarUrl(res[0].ufsUrl)
                    }}
                    onUploadError={(error) => {
                      console.error(error)
                    }}
                    />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold'>{user?.name}</p>
                <p className='text-muted-foreground'>{user?.email}</p>
                <p className='text-muted-foreground'>Bio: {user?.bio}</p>
            </div>
          </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' className='bg-sidebar-accent p-3 rounded-lg' defaultValue={user?.name || ''} />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' className='bg-sidebar-accent p-3 rounded-lg' defaultValue={user?.email || ''} />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="bio">Bio</label>
                <textarea id='bio' className='p-3 rounded-lg' rows={4} defaultValue={user?.bio || '' }></textarea>
            </div>
            <button type='submit' className='bg-brand text-primary p-3 rounded-lg' disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
            </button>
        </form>
    </div>
  )
}

export default PersonalInfoForm