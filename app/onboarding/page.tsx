import {auth} from '@/auth'
import { ProfileSetupWizard } from '@/components/ProfileSetUpWizard'
import { prisma } from '@/lib/db'
import { redirect } from "next/navigation"
import Link from 'next/link'
const page = async () => {
    const session = await auth()
    if (!session) redirect('/login')
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id }
        })
    if (user?.bio && user?.avatarUrl) redirect('/onboarding/username')
  return (
<>
    <div className="flex flex-col items-center justify-evenly min-h-screen ">
      <h2 className="text-2xl font-semibold">Set up your profile</h2>
      <Link className="fixed top-5 right-5" href="/onboarding/username">Skip</Link>
      <ProfileSetupWizard />
    </div>
    </>
  )
}

export default page