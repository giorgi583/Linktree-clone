import {auth} from '@/auth'
import { UsernameForm } from '@/components/UsernameForm'
import { prisma } from '@/lib/db'
import { redirect } from "next/navigation"

const page = async () => {
    const session = await auth()
    if (!session) redirect('/login')
    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id }
    })
    if (!user) redirect('/login')
    if (user?.username) redirect('/dashboard')
    const users = await prisma.user.findMany({
      where: { username: { not: null } },
      select: { username: true },
    })
    const takenUsernames = users.map((user) => user.username as string)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <UsernameForm takenUsernames={takenUsernames}/>
    </div>
  )
}

export default page