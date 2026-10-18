"use client"
import { socialIcons } from './SocialIcons'
import {PRESET_THEMES} from "@/lib/themes"
import Link from 'next/link';
import { EllipsisVertical, Upload } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const PublicPage = ({user, links, socials}: any) => {
const [isVisible, setIsVisible] = useState(true);
const pathname = usePathname();
const isPreview = pathname === '/dashboard/links';

useEffect(() => {
  const container = document.getElementById('scroll-container');
  const handleScroll = () => {
    const scrollY = isPreview ? container?.scrollTop || 0 : window.scrollY;
    setIsVisible(scrollY < (isPreview ? 200 : 300));
    console.log("scrollY:", scrollY); 
  };
  isPreview ? container?.addEventListener('scroll', handleScroll) : window.addEventListener('scroll', handleScroll);
  return () => {
    isPreview ? container?.removeEventListener('scroll', handleScroll) : window.removeEventListener('scroll', handleScroll);
  };
}, []);
{socials?.map((social: any) => {
  console.log("platform:", JSON.stringify(social.platform));
console.log("type:", typeof social.platform);
console.log("keys:", Object.keys(socialIcons));
console.log("has key:", Object.hasOwn(socialIcons, social.platform));
})}
const theme = user?.theme && PRESET_THEMES[user.theme] ? PRESET_THEMES[user.theme] : PRESET_THEMES.default;
const customColors = user?.customColors ?? null;  
console.log("customColors:", user, customColors, theme);
const handleShare = (url: string) => {
  navigator.share({
    title: "Check out my page!",
    text: "Check out my page!",
    url: url
  })
}
  return (
    <>
<style>
 {`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oxanium:wght@200..800&family=Roboto+Slab:wght@100..900&display=swap');
 h2, a {
 font-family: 'oxanium', sans-serif;
 }
 `
 }
</style>
    <div className={`flex flex-col justify-between items-center gap-5 w-full shadow-2xl h-full ${isPreview ? 'rounded-none p-2' : 'rounded-tl-3xl rounded-tr-3xl p-8'}`} style={{background: customColors?.background || theme.background, color: customColors?.textColor || theme.textColor}}>
    <div className={`flex justify-between items-center z-50 w-full sticky transition-all duration-200 ${isPreview ? 'top-2' : 'top-5'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
    <Link href={'/'} className='rounded-2xl px-2 py-1 text-white backdrop-blur-[5px]'  style={{backgroundColor: `color-mix(in srgb, ${theme.background}, ${theme.textColor})`}}><svg viewBox="0 0 35 35" width={isPreview ? "20" : "35"} height={ isPreview ? "20" : "35"} aria-hidden="true">
            <defs>
              <linearGradient id="navRibbon" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
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
          <button onClick={() => handleShare(window.location.href)} className='rounded-2xl px-2 py-2 text-white backdrop-blur-lg' style={{backgroundColor: `color-mix(in srgb, ${theme.background}, ${theme.textColor})`}}><Upload size={isPreview ? 13 : 20}/></button>
    </div>
    <div className="flex flex-col justify-center items-center gap-5">
    <div className={`${isPreview ? 'h-20 w-20' : 'h-25 w-25 '} rounded-full ring-2 ring-offset-2`} style={{
    "--tw-ring-color": customColors?.textColor || theme.textColor,
    "--tw-ring-offset-color": customColors?.background || theme.background
  } as React.CSSProperties}><Image width={100} height={100} src={user?.avatarUrl || "/user-icon.webp"} alt="User" className="w-full rounded-full h-full" /></div>
    <h2 className={`${isPreview ? 'text-xl' : 'text-2xl'} font-semibold`}>@{user?.username}</h2>
    <div className={`flex items-center ${isPreview ? 'gap-2' : 'gap-4'} flex-wrap mb-5`}>{socials?.filter((social: any) => social.isActive).map((social: any) => <a className='hover:scale-105 transition-all duration-300' key={social.id} href={social.url} target="_blank" rel="noopener noreferrer">{socialIcons[social.platform]}</a>)}</div>
    </div>
    <div className="flex flex-col gap-4 w-full">
      {links?.filter((link: any) => link.isActive).map((link: any) => <a style={{color: customColors?.buttonText || theme.buttonText, background: customColors?.buttonColor || theme.buttonColor, borderColor: customColors?.buttonText || theme.buttonText, borderWidth: "1px", borderStyle: "solid"}} className={`hover:-translate-y-1 hover:-translate-x-1 rounded transition-all duration-300 ${isPreview ? 'p-2 shadow-[3px_3px_0px]' : 'p-4 shadow-[4px_4px_0px]'}  text-center relative font-semibold`} key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">{link.title} <button onClick={() => handleShare(link.url)} className={`absolute ${isPreview ? 'top-2 right-2' : ' top-4 right-2'} p-1 rounded-full hover:bg-gray-200/20`}><EllipsisVertical  size={isPreview ? 15 : 20}/></button></a>)}
    </div>

    <div className="flex flex-col justify-center items-center gap-5">
      <Link href={'/dashboard'} style={{backgroundColor: `color-mix(in srgb, ${customColors?.background || theme.background}, ${customColors?.textColor || theme.textColor})`}} className={`rounded-full px-3 py-2 text-white shadow-xl font-semibold ${isPreview ? 'text-sm my-2' : 'text-xl my-5'}`}>Get your own linktree</Link>
      <ul className='flex flex-wrap justify-center gap-3 text-xs font-semibold'>
        <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href="">Cookie Preferences</a></li>
        <span>•</span>
        <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>Privacy</li>
        <span>•</span>
        <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>Reports</li>
        <span>•</span>
        <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>About this account</li>
        <span>•</span>
        <li className='hover:underline cursor-pointer'><a className='hover:underline cursor-pointer' href=""></a>More about Linktree</li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default PublicPage