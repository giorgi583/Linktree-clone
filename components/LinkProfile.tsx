import Image from "next/image"
import userPic from '../public/user-icon.webp'
import {PRESET_THEMES} from "@/lib/themes"
import Link from "next/link";
const LinkProfile = ({ user, links }: { user: any, links: any }) => {
    const theme = user?.theme && PRESET_THEMES[user.theme] ? PRESET_THEMES[user.theme] : PRESET_THEMES.default;
    console.log("User theme:", theme);
  return (
    <div className="flex flex-col justify-centerm items-center max-w-80 ">
        <h1 className="text-2xl font-semibold my-5">Your linktree</h1>
        <div className="flex items-center gap-20 flex-col px-10 py-7 rounded-2xl shadow-md w-full" style={{ background: theme.background, color: theme.textColor }}>
            <div className="h-40 w-40 rounded-full ring-2 ring-gray-300">
                <Image width={100} height={100} src={user?.avatarUrl || userPic} alt="User" className="w-full rounded-full h-full" />
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex flex-col items-center justify-center gap-1 min-w-0">
                    <span className="text-lg font-semibold truncate inline-block max-w-40">{user?.name}</span>
                    <p className="text-sm" style={{ color: theme.textColor }}>
                       Total of {links.length} links
                    </p>
                </div>
                <Link href='/dashboard/links' className="text-sm py-2 px-3 rounded-full font-medium transition-all hover:shadow-lg" style={{ background: theme.buttonColor, color: theme.buttonText }}>
                    Edit
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LinkProfile