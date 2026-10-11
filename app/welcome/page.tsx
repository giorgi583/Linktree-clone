import {auth} from '@/auth'
import { prisma } from '@/lib/db'
import { redirect } from "next/navigation"
import { WelcomeRedirect } from "@/components/WellcomeRedirect"
import {ConfettiBurst} from "@/components/Conffetti"
import {AnimatedBackground} from "@/components/AnimatedBackgrount"
const page = async () => {
    const session = await auth()
    if (!session) redirect('/login')
    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id }
    })

       if (!user?.username)  redirect('/onboarding/username') 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" >
        <h1 className="text-4xl font-bold">Hi {user?.name}!</h1>
        <h2 className="text-2xl font-semibold">Welcome to your personal Linktree</h2>
        <WelcomeRedirect />
        <ConfettiBurst />
        <AnimatedBackground />
    </div>
  )
}

export default page