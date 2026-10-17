import React from 'react'
import PublicPage from './PublicPage'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const PublicPagePreview = ({user, links, socials}: any) => {
  return (
    <div className="flex justify-center items-center gap-5">
      <div id='scroll-container' className='rounded-2xl shadow-2xl max-w-80 max-h-140 overflow-y-scroll custom-scrollbar'>
        <PublicPage user={user} links={links} socials={socials}/>
      </div>
      <div className='bg-gray-300/50 p-3 rounded-full flex justify-center items-center'>
        <a href={`/${user?.username}`} target='_blank' rel="noreferrer" className='max-h-fit'><ExternalLink size={20} /></a>
      </div>
    </div>
  )
}

export default PublicPagePreview