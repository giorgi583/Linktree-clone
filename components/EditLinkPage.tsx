"use client"
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { deleteAllLinks } from '@/app/actions/links'
import React from 'react';
import SocialsWindow from './SocialsWindow';
import EditSocial from './EditSocial';
import AddLink from './AddLink';
import { LinkList } from './Link-list';
import { socialIcons } from './SocialIcons';
import DesignForm from './DesignForm';

const EditLinkPage = ({user, links, socials}: any) => {
  const [showSocials, setShowSocials] = React.useState<boolean>(false)
  const [editLink, setEditLink] = React.useState<any>(null)
  const [addLink, setAddLink] = React.useState<boolean>(false)
  const [editingObject, setEditingObject] = React.useState<'content' | 'design'>('content')
  const handleDelete = async () => {
    window.confirm("Are you sure you want to delete all links?") && await deleteAllLinks()
  }
  console.log(user, links, socials)
  return (
    <div className='overflow-hidden relative'>
    <div className="flex items-center gap-5 mb-2 relative w-fit">
    <p className={`${editingObject === 'content' ? 'font-semibold' : ''} cursor-pointer`} onClick={()=> setEditingObject('content')}>content</p>
    <p className={`${editingObject !== 'content' ? 'font-semibold' : ''} cursor-pointer`} onClick={()=> setEditingObject('design')}>design</p>
   <div className="absolute -bottom-1 left-0 h-[3px] w-1/2 bg-brand transition-all duration-300 ease-in-out" style={{transform: editingObject === 'content' ? 'translateX(0)' : 'translateX(110%)',}}></div>
    </div>
    <div className="absolute flex flex-col gap-5 px-10 py-7 rounded-2xl shadow-md w-full bg-card transition-all duration-300 ease-in-out" style={{transform: editingObject !== 'content' ? 'translateY(100%)' : 'translateY(0)', opacity: editingObject !== 'content' ? 0 : 1}}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Content</h1>
          <button onClick={handleDelete} className='bg-brand text-white px-2 py-1 rounded'>Clear All Links</button>
        </div>
        <div className="flex items-center gap-5">
            <div className="w-17 h-17 rounded-full overflow-hidden">
              <Image width={50} height={50} src={ user?.avatarUrl || "/user-icon.webp"} alt="User" className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-2xl font-semibold">{user?.username}</h1>
                <p className="flex items-center gap-3">{socials.filter((social: any) => social.isActive).map((social: any, index: number) =>
                { 
                  if (index < 5) return (<span key={social.id} onClick={()=> setEditLink(social.platform)} className='cursor-pointer'>{socialIcons[social.platform] || null}</span>)
                  else if (index === 5) return (<span key={social.id} className="rounded-full cursor-pointer text-teal-800 bg-teal-50 w-7 h-7 flex items-center justify-center">+{socials.length - 5}</span>)
                  })} <span arial-label="add social" className="text-sm cursor-pointer text-teal-800 rounded-full bg-teal-50 p-1" onClick={() => setShowSocials(true)}><Plus className="w-4 h-4"></Plus></span></p>
            </div>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <button className='p-2 bg-slate-50 rounded text-sm border-b-2 border-slate-300'>Links</button>
       <button onClick={() => setAddLink(true)} className='p-2 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-600 flex gap-2 items-center'><Plus className='w-4 h-4'/> Add Link</button>
        </div>
        <div className='min-h-60 max-h-70 overflow-y-scroll custom-scrollbar'>
         {links.length > 0 ? <LinkList initialLinks={links} setEditLink={setEditLink} type="LINK" /> : <p className="text-sm text-gray-500">No links added yet</p>}

        </div>
    </div>
    <div className="bg-white absolute gap-5 px-10 py-7 rounded-2xl shadow-md w-full transition-all duration-300 ease-in-out" style={{transform: editingObject !== 'content' ? 'translateY(0)' : 'translateY(-200%)', opacity: editingObject !== 'content' ? 1 : 0}}>
    <DesignForm user={user}/>
    </div>
        {editLink && <EditSocial editLink={editLink} setEditLink={setEditLink} socials={socials} links={links}/>}
        {showSocials && <SocialsWindow socials={socials} setShowSocials={setShowSocials} setEditLink={setEditLink}/>}
        {addLink && <AddLink setAddLink={setAddLink}/>}
    </div>
  )
}

export default EditLinkPage