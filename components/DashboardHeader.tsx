"use client"
import { Share } from "lucide-react"


const DashboardHeader = ({ username, name }: { username: string | null | undefined; name: string | null | undefined }) => {
    const handleshare = async () => {
        const shareUrl = `https://linktr.ee/${username}`;
        if(navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out my Linktree!',
                    text: 'Check out my Linktree!',
                    url: shareUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
        else {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        }
      };
  return (
    <div className="flex justify-between items-center mb-4 border-b border-[#e7e5e4] pb-4">
        <h2 className="text-2xl font-semibold">Welcome, {name}!</h2>
        <div onClick={handleshare} className="flex items-center gap-3 rounded-full border border-[#e7e5e4] px-3 py-2 text-xs text-stone-500 hover:border-[#115e59]/40 hover:text-[#115e59]"> 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true">
              <defs>
                <linearGradient id="ribbonGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--color-brand-tertiary)" />
                  <stop offset="100%" stopColor="var(--color-brand-tertiary)" />
                </linearGradient>
              </defs>
              <path d="M8,24 C4,16 12,8 16,8 C20,8 28,16 24,24 C20,32 12,24 16,20 C18,18 22,14 20,10"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
            </svg>
            <button className="flex items-center gap-2 text-base font-semibold">Linktr.ee/{username} <Share size={16} /></button>
            
            </div>
      </div>
  )
}

export default DashboardHeader