import {auth } from '@/auth'
import DashboardHeader from '@/components/DashboardHeader'
import EditLinkPage from '@/components/EditLinkPage'
import PublicPagePreview from '@/components/PublicPagePreview'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from "next/navigation"

const page = async () => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    },
    select: { username: true, avatarUrl: true, image: true, theme: true },
  })
  if (!user?.username) {
    redirect("/dashboard")
  }
  const links = await prisma.link.findMany({
    where: {
      userId: session?.user?.id,
      type: "LINK"
    },
    orderBy: {
      order: "asc"
    }
  })
  const socials = await prisma.link.findMany({
    where: {
      userId: session?.user?.id,
      type: "SOCIAL"
    },
    orderBy: {
      order: "asc"
    }
  })
  return (
    <div>
     <Link href="/dashboard" className="text-sm text-brand-secondary transition-colors duration-200 my-10 rounded-full p-2 hover:bg-brand-secondary/10">
        &larr; Back to Dashboard
      </Link>
      <div className="grid grid-cols-2 mt-20">
        <EditLinkPage user={user} links={links} socials={socials}/>
       <PublicPagePreview user={user} links={links} socials={socials}/>  
      </div>
    </div>
  )
}

export default page