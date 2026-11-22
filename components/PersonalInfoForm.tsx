"use client"
import React, {useActionState, useEffect} from 'react'
import { UploadButton } from "@/lib/uploadthing"
import Image from "next/image"
import toast from 'react-hot-toast'
import {updateProfile} from "@/app/actions/auth"
const PersonalInfoForm = ({ user }: { user: any }) => {
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(user?.avatarUrl || null)
    const [state, formAction, isPending] = useActionState(updateProfile, null)
    useEffect(() => {
        if (state?.success) {
            toast.success("Profile updated successfully!")
        }
        else if (state?.error) {
            toast.error(`Error updating profile: ${state.error}`)
        }
    }, [state])

  return (
    <div className='bg-sidebar-accent p-10 rounded-2xl relative'>
        <h2 className='text-2xl font-bold mb-5'>Personal Information</h2>
        <form className='flex flex-col gap-5' action={formAction}>
          <input type="hidden" id='avatarUrl' name='avatarUrl' value={avatarUrl || ''} />
          <div className='flex gap-4 max-w-200 items-center bg-background/30 p-3 rounded-lg'>
            <div className='flex items-end relative'>
                <div className='w-35 h-35 rounded-full overflow-hidden relative'>
                    <Image src={ avatarUrl || '/default-avatar.png'} alt="avatar preview" width={84} height={84} className="rounded-full mb-2 w-35 h-35" />
                </div>
                    <UploadButton className="bg-black/30 rounded max-w-30 px-2 text-sm max-h-12 absolute -bottom-5 left-10"
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
                <input type="text" id='name' name='name' className='bg-sidebar-accent p-3 rounded-lg' defaultValue={user?.name || ''} />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' className='bg-sidebar-accent p-3 rounded-lg' defaultValue={user?.email || ''} />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="bio">Bio</label>
                <textarea id='bio' name='bio' className='p-3 rounded-lg' rows={4} defaultValue={user?.bio || '' }></textarea>
            </div>
            <button type='submit' className='bg-brand text-primary p-3 rounded-lg absolute top-5 right-5 px-4' disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
            </button>
        </form>
    </div>
  )
}

export default PersonalInfoForm