import React from 'react'
import { createLink } from '@/app/actions/links'
import {useActionState, useEffect} from 'react'
import Loader from './ui/Loader'
import toast from 'react-hot-toast'
import { XIcon } from 'lucide-react'
const AddSocialLink = ({chosenSocial}: {chosenSocial: string | null}) => {
    const [username, setUsername] = React.useState<string>('')
    const [actionState, formAction, ispending] = useActionState(createLink, null)
    console.log('chosenSocial', chosenSocial)
    useEffect(() => {
        if (actionState?.success) {
            setUsername('')
            window.location.reload()
            toast.success('Link added successfully')
            console.log('actionState', actionState)
        }
        if (actionState?.error) {
            console.log('error', actionState.error)
            toast.error(actionState.error)
            console.log('actionState', actionState)
        }
    }, [actionState])
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-xl p-8 w-106 relative flex flex-col gap-4'>
            <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-700' onClick={() => window.location.reload()}><XIcon className='w-5 h-5' /></button>
            <h2 className='text-lg font-semibold mb-4 self-center'>Add {chosenSocial} link</h2>
            <form action={formAction} className='flex flex-col gap-4'>
                <input type='hidden' id='type' name='type' value='SOCIAL' />
                <input type='hidden' id='platform' name='platform' value={chosenSocial || ''} />
                <input type='hidden' id='url' name='url' value={chosenSocial === 'twitch' ? `https://twitch.tv/${username}` : chosenSocial === 'telegram' ? `https://t.me/${username}` : `https://www.${chosenSocial}.com/${username}`} />
                <div className='flex flex-col gap-2'>
                    <label htmlFor='url' className='text-sm font-semibold'>username</label>
                    <input required type='text' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder={`Enter your ${chosenSocial} username`} className='w-full p-2 border border-gray-300 rounded-lg'/>
                </div>
                <p className='text-sm text-gray-500'>example: <span className='font-semibold'>@username</span></p>
                <button type='submit' className='p-2 px-4 bg-fuchsia-700 self-end text-white rounded-full hover:bg-fuchsia-600 flex gap-2 items-center'>Add Link</button>
            {actionState?.error && <p className='text-sm text-red-500'>{actionState.error}</p>}
            </form>
        </div>
        {ispending && <Loader />}
    </div>
  )
}

export default AddSocialLink