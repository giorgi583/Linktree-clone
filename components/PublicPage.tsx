import { socialIcons } from './SocialIcons'
import {PRESET_THEMES} from "@/lib/themes"
import Link from 'next/link';
import { Upload } from 'lucide-react';
import Image from 'next/image';
const PublicPage = ({user, links, socials}: any) => {

{socials?.map((social: any) => {
  console.log("platform:", JSON.stringify(social.platform));
console.log("type:", typeof social.platform);
console.log("keys:", Object.keys(socialIcons));
console.log("has key:", Object.hasOwn(socialIcons, social.platform));
})}
const theme = user?.theme && PRESET_THEMES[user.theme] ? PRESET_THEMES[user.theme] : PRESET_THEMES.default;
  return (
    <div className="flex flex-col justify-between items-center gap-5 w-full rounded-tl-3xl rounded-tr-3xl p-8 shadow-2xl h-full" style={{background: theme.background, color: theme.textColor}}>
    <div className="flex justify-between items-center w-full">
    <Link href={'/'} className='rounded-2xl px-2 py-1 bg-brand/20 text-white'><svg viewBox="0 0 25 35" width="28" height="28" aria-hidden="true">
            <defs>
              <linearGradient id="navRibbon" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#115e59" />
                <stop offset="100%" stopColor="#701a75" />
              </linearGradient>
            </defs>
            <path
              d="M8,24 C4,16 12,8 16,8 C20,8 28,16 24,24 C20,32 12,24 16,20 C18,18 22,14 20,10"
              fill="none"
              stroke="url(#navRibbon)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg></Link>
          <button className='rounded-2xl px-2 py-1 bg-brand/30 text-white'><Upload /></button>
    </div>
    <div className="flex flex-col justify-center items-center gap-5">
    <div className="h-20 w-20 rounded-full"><Image width={100} height={100} src={user?.avatarUrl || "/user-icon.webp"} alt="User" className="w-full rounded-full h-full" /></div>
    <h2 className="text-2xl font-semibold">@{user?.username}</h2>
    <div className="flex items-center gap-3 flex-wrap mb-5">{socials?.filter((social: any) => social.isActive).map((social: any) => <a className='hover:scale-105 transition-all duration-300' key={social.id} href={social.url} target="_blank" rel="noopener noreferrer">{socialIcons[social.platform]}</a>)}</div>
    </div>
    <div className="flex flex-col gap-4 w-full">
      {links?.filter((link: any) => link.isActive).map((link: any) => <a style={{color: theme.buttonText, background: theme.buttonColor, borderColor: theme.buttonText, borderWidth: "1px", borderStyle: "solid"}} className={`hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 p-4 shadow-[6px_6px_0px]`} key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>)}
    </div>
    <Link href={'/dashboard'} className='rounded-full px-3 py-2 bg-brand/20 text-white shadow-xl'>Join @{user?.username} on Linktree</Link>
    <ul className='flex flex-wrap justify-center gap-3 text-xs font-semibold'>
      <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href="">Cookie Preferences •</a></li>
      <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>Privacy •</li>
      <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>Reports •</li>
      <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>About this account •</li>
      <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>More about Linktree</li>
    </ul>
    </div>
  )
}

export default PublicPage