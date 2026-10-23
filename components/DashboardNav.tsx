"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Link2, BarChart3, UserRound, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import userPic from '../public/user-icon.webp'

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/links", label: "Links", icon: Link2 },
  { href: "/dashboard/analytics?days=30", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardNav({
  username,
  name,
  avatarUrl,
  bio,
}: {
  username: string
  name: string | null
  avatarUrl: string | null
  bio: string | null
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
console.log(pathname, searchParams.get("days"));
  return (
    <>
    <aside className="flex w-16 flex-col justify-between border-r border-[#e7e5e4] py-6 md:w-56 max-sm:hidden">
      <div>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 pb-8">
          <svg viewBox="0 0 25 35" width="28" height="28" aria-hidden="true">
            <defs>
              <linearGradient id="navRibbon" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--color-brand)" />
                <stop offset="100%" stopColor="var(--color-brand-secondary)" />
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
          </svg>
          <span className="hidden text-lg font-semibold text-brand-secondary md:inline">
            Link<span className="text-brand">tree</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#115e59]/10 text-brand-secondary font-medium"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="px-2">
        {(!bio || !avatarUrl) && <div className="mb-3 flex flex-col gap-2  rounded-md border border-[#e7e5e4] bg-[#fefefe] px-3 py-2 text-sm text-stone-500">
          <p className="text-sm text-stone-500">Complete your profile to get started.</p>
          <Link  href="/onboarding" className="font-semibold text-brand-secondary rounded-full p-3 bg-brand-tertiary">Complete profile</Link>
          </div>}
        <a
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 hidden rounded-md border border-[#e7e5e4] px-3 py-2 text-xs text-stone-500 hover:border-[#115e59]/40 hover:text-[#115e59] md:block"
        >
          View your page ↗
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-stone-500 hover:bg-stone-100"
        >
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name ?? username} width={24} height={24} className="rounded-full w-6 h-6" />
          ) : (
            <div><Image src={userPic} alt={name ?? username} className="h-6 w-6 rounded-full" /></div>
          )}
          <span className="hidden truncate md:flex md:items-center md:gap-2 text-red-800">Log out <LogOut className="w-4 h-4" /></span>
        </button>
      </div>
    </aside>
    <aside className="fixed bottom-2 left-2 right-2 z-50 flex gap-2 rounded-full border border-[#e7e5e4] bg-[#fefefe] px-5 py-3 text-stone-500 sm:hidden max-[400px]:px-3 max-[400px]:py-2">
     <nav className="flex items-center justify-between w-full gap-1 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {

            const isActive = pathname === (searchParams.get("days") ? href.split('?')[0] : href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-base transition-colors ${
                  isActive
                    ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}