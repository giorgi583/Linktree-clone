
import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/DashboardNav"
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()  
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true, name: true, avatarUrl: true, image: true, bio: true },
  })
  
  if (!user?.username) redirect("/onboarding/username")

  return ( <div className="flex h-screen bg-[#fafaf9]">
      <DashboardNav
        username={user.username}
        name={user.name}
        avatarUrl={user.avatarUrl ?? user.image}
        bio={user.bio}
      />
      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>)
}