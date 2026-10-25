import {auth} from '@/auth'
import DashboardHeader from '@/components/DashboardHeader'
import LinkProfile from '@/components/LinkProfile'
import { ThemeToggle } from '@/components/theme-toggle'
import { prisma } from '@/lib/db'
import { redirect } from "next/navigation"
const page = async () => {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        },
        select: { username: true, name: true, avatarUrl: true, image: true, theme: true, customColors: true },
    })
    const links = await prisma.link.findMany({
        where: {
            userId: session?.user?.id
        },
        orderBy: {
            order: "asc"
        }
    })
    if (!session) redirect('/login')
  return (
    <div >
      <DashboardHeader username={user?.username} name={user?.name}/>
      <LinkProfile user={user} links={links}/>
      <ThemeToggle />
      </div>
  )
}

export default page