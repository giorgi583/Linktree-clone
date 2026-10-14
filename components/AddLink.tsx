import { Plus, XIcon } from 'lucide-react'
import {useActionState, useEffect} from 'react'
import { createLink } from '@/app/actions/links'
import Loader from './ui/Loader'
import toast from 'react-hot-toast'
const AddLink = ({setAddLink}: any) => {
    const [actionState, formAction, ispending] = useActionState(createLink, null)
    useEffect(() => {
        if (actionState?.success) {
            setAddLink(false)
            toast.success('Link added successfully')
            console.log('actionState', actionState)
        }
        if (actionState?.error) {
            toast.error(actionState.error)
            console.log('actionState', actionState)
        }
    }, [actionState])
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-xl p-8 w-106 relative flex flex-col gap-4'>
            <h2 className='text-lg font-semibold mb-4 self-center'>Add Link</h2>
            <button onClick={() => setAddLink(false)} className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'><XIcon className='w-5 h-5' /></button>
            <form action={formAction}> 
                <input type="text" hidden name="type" value="LINK" />
                <div className='mb-4'>
                    <label htmlFor="linkTitle" className='block text-sm font-medium text-gray-700'>Link Title</label>
                    <input type="text" id="linkTitle" name="title" className='mt-1 p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="linkUrl" className='block text-sm font-medium text-gray-700'>Link URL</label>
                    <input required type="url" id="linkUrl" name="url" className='mt-1 p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
                </div>
                <button type="submit" disabled={ispending} className='p-2 px-4 mt-5 bg-fuchsia-700 self-end text-white rounded-full hover:bg-fuchsia-600 flex gap-2 items-center'><Plus className='w-5 h-5' />Add Link</button>
            </form>
        </div>
        {ispending && <Loader />}
    </div>
  )
}

export default AddLink