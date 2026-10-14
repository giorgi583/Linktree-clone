"use client"
import { ExternalLink, Plus } from 'lucide-react'
import Image from 'next/image'
import { deleteAllLinks } from '@/app/actions/links'
import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaTiktok, FaTwitch, FaSnapchat, FaReddit, FaPinterest, FaDiscord} from 'react-icons/fa'
import SocialsWindow from './SocialsWindow';
import EditSocial from './EditSocial';
import AddLink from './AddLink';
import { LinkList } from './Link-list';

export const socialIcons: { [key: string]: React.JSX.Element } = {
  instagram: <FaInstagram className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  twitch: <FaTwitch className="w-5 h-5" />, 
  snapchat: <FaSnapchat className="w-5 h-5" />,
  reddit: <FaReddit className="w-5 h-5" />,
  pinterest: <FaPinterest className="w-5 h-5" />,
  discord: <FaDiscord className="w-5 h-5" />,
};

const EditLinkPage = ({user, links, socials}: any) => {
  const [showSocials, setShowSocials] = React.useState<boolean>(false)
  const [editLink, setEditLink] = React.useState<any>(null)
  const [addLink, setAddLink] = React.useState<boolean>(false)

  const handleDelete = async () => {
    window.confirm("Are you sure you want to delete all links?") && await deleteAllLinks()
  }
  console.log(user, links, socials)
  return (
    <div className="flex flex-col gap-5 px-10 py-7 rounded-2xl shadow-md w-full bg-card">
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
        <div className='min-h-60 max-h-60 overflow-y-scroll'>
         {links.length > 0 ? <LinkList initialLinks={links} setEditLink={setEditLink} type="LINK" /> : <p className="text-sm text-gray-500">No links added yet</p>}

        </div>
        {editLink && <EditSocial editLink={editLink} setEditLink={setEditLink} socials={socials} links={links}/>}
        {showSocials && <SocialsWindow socials={socials} setShowSocials={setShowSocials} setEditLink={setEditLink}/>}
        {addLink && <AddLink setAddLink={setAddLink}/>}
    </div>
  )
}

export default EditLinkPage