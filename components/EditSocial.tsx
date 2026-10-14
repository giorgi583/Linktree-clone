import { XIcon } from 'lucide-react'
import {useActionState, useEffect} from 'react'
import {updateLink} from '@/app/actions/links'
import { socialIcons } from './EditLinkPage';
import Loader from './ui/Loader';
import toast from 'react-hot-toast';
const EditSocial = ({ editLink, setEditLink, socials, links }: { editLink: string; setEditLink: (link: string | null) => void; socials: any[]; links: any[] }) => {
const username = socials?.find((social) => social.platform === editLink)?.url?.split('/').pop() || ''
const [actionState, formAction, ispending] = useActionState(updateLink, null)
const linkTitle = links?.find((link) => link.title === editLink)?.title
const linkUrl = links?.find((link) => link.title === editLink)?.url
useEffect(() => {
    if (actionState?.error) {setEditLink(null); toast.error(actionState.error)}
    if (actionState?.success) {setEditLink(null); toast.success('Link updated successfully')}
}, [actionState])
if (Object.keys(socialIcons).includes(editLink) && editLink !== linkTitle)  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-60'>
        <div className='bg-white rounded-xl p-8 w-106 relative flex flex-col gap-4'>
            <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-700' onClick={() => setEditLink(null)}><XIcon className='w-5 h-5' /></button>
            <h2 className='text-lg font-semibold mb-4 self-center'>Edit {editLink} link</h2>
            <form action={formAction} className='flex flex-col gap-4'>
                <input type='hidden' id='type' name='type' value='SOCIAL' />
                <input type='hidden' id='platform' name='platform' value={editLink || ''} />
                <div className='flex flex-col gap-2'>
                    <label htmlFor='username' className='text-sm font-semibold'>username</label>
                    <input required type='text' id='username' name='username' defaultValue={username} placeholder={`Edit your ${editLink} username`} className='w-full p-2 border border-gray-300 rounded-lg'/>
                </div>
                <p className='text-sm text-gray-500'>example: <span className='font-semibold'>@username</span></p>
                <button type='submit' className='p-2 px-4 bg-fuchsia-700 self-end text-white rounded-full hover:bg-fuchsia-600 flex gap-2 items-center'>Update Link</button>
            </form>
            {actionState?.error && <p className="text-sm text-red-500">{actionState.error}</p>}
        </div>
        {ispending && <Loader />}
        </div>
  )
  else return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-60'>
        <div className='bg-white rounded-xl p-8 w-106 relative flex flex-col gap-4'>
            <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-700' onClick={() => setEditLink(null)}><XIcon className='w-5 h-5' /></button>
            <h2 className='text-lg font-semibold mb-4 self-center'>Edit {linkTitle}</h2>
            <form action={formAction} className='flex flex-col gap-4'>
                <input type='hidden' id='type' name='type' value='LINK' />
                <div className='flex flex-col gap-2'>
                    <label htmlFor='title' className='text-sm font-semibold'>title</label>
                    <input required type='text' id='title' name='title' defaultValue={linkTitle} placeholder={`Edit title`} className='w-full p-2 border border-gray-300 rounded-lg'/>
                </div>
                <input type="text" name='url' id='url' hidden defaultValue={linkUrl} />
                <input type="text" name='id' id='id' hidden defaultValue={links?.find((link) => link.title === editLink)?.id} />
                <button type='submit' className='p-2 px-4 bg-fuchsia-700 self-end text-white rounded-full hover:bg-fuchsia-600 flex gap-2 items-center'>Update Link</button>
            </form>
            {actionState?.error && <p className="text-sm text-red-500">{actionState.error}</p>}
        </div>
        {ispending && <Loader />}
        </div>
  )
}

export default EditSocial