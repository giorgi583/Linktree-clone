import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import {socialIcons} from './SocialIcons'
import React from 'react'

const SocialsList = ({setStep, socials, setChosenSocial}: {setStep: (step: string) => void, socials: any[], setChosenSocial: (social: string | null) => void}) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('')

  return (
    <div className='relative flex flex-col gap-4 p-4 bg-white rounded-xl w-106'>
        <button onClick={() => setStep('mysocials')} className='absolute top-3 left-3 text-gray-500 hover:bg-gray-200 p-1 rounded-lg'><ChevronLeft className='w-5 h-5' /></button>
        <h3 className='text-lg font-semibold self-center'>Add social icons</h3>
        <div className='relative flex items-center gap-2 border border-gray-300 rounded-lg'>
            <Search className='absolute top-3 left-3 w-5 h-5 text-gray-500' />
   <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg pl-10"/>
        </div>
        <div className='flex flex-col gap-4 max-h-60 p-2 rounded-lg overflow-y-scroll'>
            {Object.keys(socialIcons).filter((platform) => platform.toLowerCase().includes(searchTerm.toLowerCase()) && socials.findIndex((social) => social.platform === platform) === -1).map((platform) => (
                <div onClick={() => {setStep('addLink'); setChosenSocial(platform)}} key={platform} className='flex items-center gap-4 p-2 bg-white rounded-lg shadow-md justify-between cursor-pointer hover:bg-gray-100'>
                    <div className='flex items-center gap-4 p-2 rounded hover:bg-gray-100 cursor-pointer'>
                        <p>{socialIcons[platform]}</p>
                        <p className='text-sm'>{platform}</p>
                    </div>
                    <div><ChevronRight className='w-5 h-5 text-gray-500' /></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SocialsList