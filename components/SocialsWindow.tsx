"use client"
import { GripVertical, PencilIcon, Plus, XIcon } from 'lucide-react'
import { socialIcons } from './EditLinkPage'
import React, { Dispatch } from 'react'
import { SetStateAction } from 'react'
import {toggleLinkActive} from '@/app/actions/links'
import SocialsList from './SocialsList'
import AddSocialLink from './AddSocialLink'
const SocialsWindow = ({socials, setShowSocials}: {socials: any[], setShowSocials: Dispatch<SetStateAction<boolean>>}) => {
const toggleActive = (socialId: string) => {
    toggleLinkActive(socialId)
  }
  const [step, setStep] = React.useState<string>('mysocials')
  const [chosenSocial, setChosenSocial] = React.useState<string | null>(null)
  return (
      <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        {step === 'mysocials' ? (
          <div className='bg-white rounded-xl p-8 w-106 relative flex flex-col gap-4'>
            <h2 className='text-lg font-semibold mb-4 self-center'>Social icons</h2>
            <h3 className='font-semibold'>Show visitors where to find you</h3>
            <p className='text-sm text-gray-500'>Add your social profiles, email and more as linked icons on your Linktree.</p>
            <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-700' onClick={() => setShowSocials(false)}><XIcon className='w-5 h-5' /></button>
            <div className='flex flex-col gap-4 min-h-60 p-2 max-h-80 rounded-lg overflow-y-scroll'>
                        {socials?.map((social) => (
                            <div key={social.id} className='flex items-center gap-4 p-2 bg-white rounded-lg shadow-md justify-between'>
                                <div className='flex items-center gap-4'>
                                    <GripVertical className='w-5 h-5 text-gray-500 cursor-move' />
                                    <p>{socialIcons[social.platform]}</p>
                                    <p className='text-sm'>{social.platform}</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <PencilIcon className='w-3 h-3 text-gray-500 cursor-pointer' />
                                    <div onClick={() => toggleActive(social.id)} className={`w-7 h-4 ${social.isActive ? 'bg-teal-500' : 'bg-gray-300'} relative rounded-full cursor-pointer`}><div className={`w-3.5 h-3.5 bg-white absolute top-1/2 ${social.isActive ? 'right-0.25' : 'left-0.25'} -translate-y-1/2 rounded-full`}></div>
                                </div></div>
                            </div>
                        ))}
            </div>
            <button onClick={() => setStep('addsocials')} className='p-2 px-4 bg-fuchsia-700 self-end text-white rounded-full hover:bg-fuchsia-600 flex gap-2 items-center'><Plus className='w-5 h-5' />Add Social Icon</button>
        </div> )
        : step === 'addsocials' ? ( <SocialsList setStep={setStep} socials={socials} setChosenSocial={setChosenSocial}/> )
        : step === 'addLink' && ( <AddSocialLink chosenSocial={chosenSocial} /> )
        }
    </div>
  
  )
}

export default SocialsWindow